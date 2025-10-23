/**
 * Client Odoo via n8n
 * Contourne le problème CORS en passant par n8n comme proxy
 */
class OdooClientN8N {
  constructor(n8nUrl, odooUrl, database, username, password) {
    this.n8nUrl = n8nUrl.trim().replace(/\/$/, ''); // URL de votre instance n8n
    this.odooUrl = odooUrl.trim().replace(/\/$/, '');
    this.database = database;
    this.username = username;
    this.password = password;
    this.uid = null;
    this.sessionId = null;
  }

  /**
   * Authentification via n8n
   */
  async authenticate() {
    try {
      const response = await fetch(`${this.n8nUrl}/webhook/odoo-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          odooUrl: this.odooUrl,
          db: this.database,
          login: this.username,
          password: this.password,
        }),
      });

      const data = await response.json();

      if (data.result && data.result.uid) {
        this.uid = data.result.uid;
        this.sessionId = data.result.session_id;
        console.log('✓ Authentification réussie via n8n');
        return true;
      }

      throw new Error('Identifiants incorrects ou base de données introuvable');
    } catch (error) {
      console.error('Erreur d\'authentification via n8n:', error);
      throw new Error(`Échec de l'authentification : ${error.message}`);
    }
  }

  /**
   * Requête Odoo via n8n
   */
  async query(model, method, params) {
    if (!this.uid) {
      await this.authenticate();
    }

    try {
      const response = await fetch(`${this.n8nUrl}/webhook/odoo-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          odooUrl: this.odooUrl,
          db: this.database,
          uid: this.uid,
          model: model,
          method: method,
          params: params,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la requête via n8n:', error);
      throw error;
    }
  }

  /**
   * Recherche dans un modèle Odoo
   */
  async searchRead(model, domain = [], fields = [], limit = 10) {
    try {
      const result = await this.query(model, 'search_read', {
        domain: domain,
        fields: fields,
        limit: limit,
      });

      return result.records || result;
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw error;
    }
  }

  /**
   * Exécute une recherche basée sur une requête en langage naturel
   */
  async executeQuery(query) {
    if (!this.uid) {
      await this.authenticate();
    }

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
        results: Array.isArray(results) ? results : [],
        count: Array.isArray(results) ? results.length : 0,
      };
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête:', error);
      throw error;
    }
  }

  /**
   * Analyse une requête en langage naturel
   */
  analyzeQuery(query) {
    const lowerQuery = query.toLowerCase();

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

    let model = 'res.partner';
    for (const [modelName, keywords] of Object.entries(modelKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        model = modelName;
        break;
      }
    }

    let domain = [];
    let limit = 10;

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

    if (lowerQuery.includes('brouillon') || lowerQuery.includes('draft')) {
      domain.push(['state', '=', 'draft']);
    } else if (lowerQuery.includes('confirmé') || lowerQuery.includes('confirmed')) {
      domain.push(['state', '=', 'confirmed']);
    } else if (lowerQuery.includes('fait') || lowerQuery.includes('done')) {
      domain.push(['state', '=', 'done']);
    }

    const numberMatch = query.match(/\d+/);
    if (numberMatch && (lowerQuery.includes('derniers') || lowerQuery.includes('last'))) {
      limit = parseInt(numberMatch[0]);
    }

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

    return { model, domain, fields, limit };
  }

  /**
   * Formate les résultats
   */
  formatResults(results, model) {
    if (!results || results.length === 0) {
      return 'Aucun résultat trouvé.';
    }

    let formatted = `J'ai trouvé ${results.length} résultat(s) :\n\n`;

    results.forEach((record, index) => {
      formatted += `${index + 1}. `;

      if (record.name) {
        formatted += `${record.name}\n`;
      }

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

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OdooClientN8N;
}
