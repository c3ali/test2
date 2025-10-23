import axios from 'axios';

/**
 * Client pour communiquer avec l'API Odoo via JSON-RPC
 */
class OdooClient {
  constructor(url, database, username, password) {
    this.url = url;
    this.database = database;
    this.username = username;
    this.password = password;
    this.uid = null;
  }

  /**
   * Authentification auprès d'Odoo
   */
  async authenticate() {
    try {
      const response = await this.call('/web/session/authenticate', {
        db: this.database,
        login: this.username,
        password: this.password,
      });

      if (response.result && response.result.uid) {
        this.uid = response.result.uid;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      throw new Error('Échec de l\'authentification Odoo');
    }
  }

  /**
   * Effectue un appel JSON-RPC vers Odoo
   */
  async call(endpoint, params) {
    try {
      const response = await axios.post(
        `${this.url}${endpoint}`,
        {
          jsonrpc: '2.0',
          method: 'call',
          params: params,
          id: Math.floor(Math.random() * 1000000),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error.data.message);
      }

      return response.data;
    } catch (error) {
      console.error('Erreur d\'appel API:', error);
      throw error;
    }
  }

  /**
   * Recherche des enregistrements dans un modèle Odoo
   */
  async searchRead(model, domain = [], fields = [], limit = 10) {
    if (!this.uid) {
      await this.authenticate();
    }

    try {
      const response = await this.call('/web/dataset/search_read', {
        model: model,
        domain: domain,
        fields: fields,
        limit: limit,
        context: {},
      });

      return response.result.records;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  }

  /**
   * Récupère les informations d'un enregistrement spécifique
   */
  async read(model, ids, fields = []) {
    if (!this.uid) {
      await this.authenticate();
    }

    try {
      const response = await this.call('/web/dataset/call_kw', {
        model: model,
        method: 'read',
        args: [ids, fields],
        kwargs: {},
      });

      return response.result;
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
      throw error;
    }
  }

  /**
   * Récupère tous les modèles disponibles
   */
  async getModels() {
    if (!this.uid) {
      await this.authenticate();
    }

    try {
      const models = await this.searchRead(
        'ir.model',
        [],
        ['name', 'model'],
        100
      );
      return models;
    } catch (error) {
      console.error('Erreur lors de la récupération des modèles:', error);
      throw error;
    }
  }

  /**
   * Exécute une recherche générique basée sur une requête en langage naturel
   */
  async executeQuery(query) {
    if (!this.uid) {
      await this.authenticate();
    }

    // Analyse de la requête pour déterminer le modèle et les filtres
    const analysis = this.analyzeQuery(query);

    try {
      const results = await this.searchRead(
        analysis.model,
        analysis.domain,
        analysis.fields,
        analysis.limit
      );

      return {
        model: analysis.model,
        query: query,
        results: results,
        count: results.length,
      };
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête:', error);
      throw error;
    }
  }

  /**
   * Analyse une requête en langage naturel pour déterminer le modèle Odoo correspondant
   */
  analyzeQuery(query) {
    const lowerQuery = query.toLowerCase();

    // Mapping des mots-clés vers les modèles Odoo
    const modelKeywords = {
      'res.partner': ['client', 'clients', 'partenaire', 'partenaires', 'contact', 'contacts', 'customer', 'customers'],
      'sale.order': ['commande', 'commandes', 'vente', 'ventes', 'devis', 'order', 'orders', 'sale'],
      'product.product': ['produit', 'produits', 'article', 'articles', 'product', 'products'],
      'account.move': ['facture', 'factures', 'invoice', 'invoices', 'comptabilité', 'accounting'],
      'stock.picking': ['livraison', 'livraisons', 'expédition', 'expéditions', 'delivery', 'deliveries'],
      'hr.employee': ['employé', 'employés', 'collaborateur', 'collaborateurs', 'employee', 'employees'],
      'project.project': ['projet', 'projets', 'project', 'projects'],
      'crm.lead': ['opportunité', 'opportunités', 'lead', 'leads', 'prospect', 'prospects'],
    };

    // Déterminer le modèle
    let model = 'res.partner'; // Modèle par défaut
    for (const [modelName, keywords] of Object.entries(modelKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        model = modelName;
        break;
      }
    }

    // Construire le domaine de recherche
    let domain = [];
    let limit = 10;

    // Recherche de filtres de date
    if (lowerQuery.includes('aujourd\'hui') || lowerQuery.includes('today')) {
      const today = new Date().toISOString().split('T')[0];
      domain.push(['create_date', '>=', today]);
    } else if (lowerQuery.includes('cette semaine') || lowerQuery.includes('this week')) {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      domain.push(['create_date', '>=', weekAgo.toISOString().split('T')[0]]);
    } else if (lowerQuery.includes('ce mois') || lowerQuery.includes('this month')) {
      const monthStart = new Date();
      monthStart.setDate(1);
      domain.push(['create_date', '>=', monthStart.toISOString().split('T')[0]]);
    }

    // Recherche de filtres d'état
    if (lowerQuery.includes('brouillon') || lowerQuery.includes('draft')) {
      domain.push(['state', '=', 'draft']);
    } else if (lowerQuery.includes('confirmé') || lowerQuery.includes('confirmed')) {
      domain.push(['state', '=', 'confirmed']);
    } else if (lowerQuery.includes('fait') || lowerQuery.includes('done')) {
      domain.push(['state', '=', 'done']);
    }

    // Recherche de limite
    const numberMatch = query.match(/\d+/);
    if (numberMatch && (lowerQuery.includes('derniers') || lowerQuery.includes('last'))) {
      limit = parseInt(numberMatch[0]);
    }

    // Champs à récupérer selon le modèle
    const fieldsByModel = {
      'res.partner': ['name', 'email', 'phone', 'city', 'country_id'],
      'sale.order': ['name', 'partner_id', 'date_order', 'amount_total', 'state'],
      'product.product': ['name', 'list_price', 'qty_available', 'categ_id'],
      'account.move': ['name', 'partner_id', 'invoice_date', 'amount_total', 'state'],
      'stock.picking': ['name', 'partner_id', 'scheduled_date', 'state', 'location_dest_id'],
      'hr.employee': ['name', 'job_id', 'department_id', 'work_email'],
      'project.project': ['name', 'user_id', 'date_start', 'date', 'partner_id'],
      'crm.lead': ['name', 'partner_id', 'expected_revenue', 'probability', 'stage_id'],
    };

    const fields = fieldsByModel[model] || ['name', 'id'];

    return {
      model,
      domain,
      fields,
      limit,
    };
  }

  /**
   * Formate les résultats pour un affichage lisible
   */
  formatResults(results, model) {
    if (!results || results.length === 0) {
      return 'Aucun résultat trouvé.';
    }

    let formatted = `J'ai trouvé ${results.length} résultat(s) :\n\n`;

    results.forEach((record, index) => {
      formatted += `${index + 1}. `;

      // Afficher le nom principal
      if (record.name) {
        formatted += `${record.name}\n`;
      }

      // Afficher les champs importants selon le modèle
      Object.keys(record).forEach(key => {
        if (key !== 'id' && key !== 'name' && record[key]) {
          const value = Array.isArray(record[key]) ? record[key][1] : record[key];
          formatted += `   - ${key}: ${value}\n`;
        }
      });

      formatted += '\n';
    });

    return formatted;
  }
}

export default OdooClient;
