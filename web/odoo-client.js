/**
 * Client Odoo pour version Web
 */
class OdooClient {
  constructor(url, database, username, password) {
    this.url = url.trim().replace(/\/$/, '');
    this.database = database;
    this.username = username;
    this.password = password;
    this.uid = null;
    this.sessionId = null;
  }

  async call(endpoint, params) {
    try {
      const response = await fetch(`${this.url}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: params,
          id: Math.floor(Math.random() * 1000000),
        }),
      });

      const data = await response.json();

      if (data.error) {
        const errorMsg = data.error.data?.message || data.error.message || 'Erreur inconnue';
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        throw new Error('Erreur réseau. Vérifiez votre connexion Internet et l\'URL Odoo.');
      }
      throw error;
    }
  }

  async authenticate() {
    try {
      const response = await this.call('/web/session/authenticate', {
        db: this.database,
        login: this.username,
        password: this.password,
      });

      if (response.result && response.result.uid) {
        this.uid = response.result.uid;
        this.sessionId = response.result.session_id;
        console.log('✓ Authentification réussie');
        return true;
      }

      throw new Error('Identifiants incorrects ou base de données introuvable');
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      throw error;
    }
  }

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
        results: results,
        count: results.length,
      };
    } catch (error) {
      console.error('Erreur lors de l\'exécution de la requête:', error);
      throw error;
    }
  }

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
