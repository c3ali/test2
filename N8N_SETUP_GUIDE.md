# 🚀 Guide Complet : Utiliser n8n comme Proxy Odoo

## 🎯 Vue d'ensemble

n8n va servir d'intermédiaire entre votre application web et Odoo, résolvant ainsi le problème CORS.

```
Votre App (Netlify)
    ↓ HTTPS
n8n (serveur)
    ↓ API Odoo
Odoo SaaS ✅
```

**Temps total : 20-30 minutes**

---

## 📋 Prérequis

- Un compte n8n (gratuit) OU une instance n8n self-hosted
- Vos credentials Odoo (URL, database, email, password)

---

## ÉTAPE 1 : Créer un compte n8n (5 minutes)

### Option A : n8n Cloud (Recommandé - Plus simple)

1. **Allez sur** : https://n8n.io
2. **Cliquez sur** : "Start free"
3. **Créez un compte** avec votre email
4. **Vérifiez votre email**
5. **Connectez-vous** : Vous êtes dans n8n !

### Option B : n8n Self-Hosted (Pour les techn

iques)

```bash
# Via Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Ou via npm
npx n8n
```

Ouvrez : http://localhost:5678

---

## ÉTAPE 2 : Configurer les Credentials Odoo dans n8n (3 minutes)

1. **Dans n8n**, cliquez sur votre profil (en haut à droite)
2. **Cliquez sur** : "Credentials"
3. **Cliquez sur** : "Add Credential"
4. **Cherchez** : "Odoo"
5. **Remplissez** :
   - **Credential Name** : "Mon Odoo"
   - **URL** : `https://votre-instance.odoo.com`
   - **Database** : `votre_base`
   - **User** : `votre@email.com`
   - **Password** : `votre_mot_de_passe`
6. **Testez la connexion**
7. **Sauvegardez**

✅ **C'est bon !** n8n peut maintenant parler à Odoo.

---

## ÉTAPE 3 : Créer le Workflow d'Authentification (10 minutes)

### 3.1 Créer le workflow

1. **Page d'accueil n8n**, cliquez sur **"New Workflow"**
2. **Nommez-le** : "Odoo Auth Proxy"

### 3.2 Ajouter les nodes

#### Node 1 : Webhook (Déclencheur)

1. **Cliquez sur le "+"** au centre
2. **Cherchez** : "Webhook"
3. **Configuration** :
   - **HTTP Method** : POST
   - **Path** : `odoo-auth`
   - **Respond** : Using 'Respond to Webhook' Node
   - **Response Mode** : When Last Node Finishes

#### Node 2 : HTTP Request (Appel Odoo)

1. **Ajoutez un node** après le Webhook
2. **Cherchez** : "HTTP Request"
3. **Configuration** :
   - **Method** : POST
   - **URL** : `{{ $json.body.odooUrl }}/web/session/authenticate`
   - **Authentication** : None
   - **Send Headers** : ON
     - Name: `Content-Type`, Value: `application/json`
   - **Send Body** : ON
   - **Body Content Type** : JSON
   - **Specify Body** : Using JSON
   - **JSON** :
```json
{
  "jsonrpc": "2.0",
  "method": "call",
  "params": {
    "db": "={{ $json.body.db }}",
    "login": "={{ $json.body.login }}",
    "password": "={{ $json.body.password }}"
  },
  "id": 1
}
```

#### Node 3 : Respond to Webhook

1. **Ajoutez un node** après HTTP Request
2. **Cherchez** : "Respond to Webhook"
3. **Configuration** :
   - **Respond With** : JSON
   - **Response Body** : `{{ $json }}`

### 3.3 Tester

1. **Cliquez sur "Execute Workflow"** (en haut)
2. **Copiez l'URL du webhook** (affichée dans le node Webhook)
3. **Testez avec curl ou Postman** :

```bash
curl -X POST https://votre-n8n.app.n8n.cloud/webhook/odoo-auth \
  -H "Content-Type: application/json" \
  -d '{
    "odooUrl": "https://votre-instance.odoo.com",
    "db": "votre_base",
    "login": "votre@email.com",
    "password": "votre_mot_de_passe"
  }'
```

4. **Si ça marche**, vous recevez un JSON avec `uid` et `session_id` !

### 3.4 Activer le workflow

1. **En haut à droite**, activez le toggle **"Active"**
2. ✅ **Le workflow est en prod !**

---

## ÉTAPE 4 : Créer le Workflow de Requête Odoo (10 minutes)

### 4.1 Créer un nouveau workflow

1. **Nouvelle page**, cliquez **"New Workflow"**
2. **Nommez** : "Odoo Query Proxy"

### 4.2 Ajouter les nodes

#### Node 1 : Webhook

1. **Ajoutez** : Webhook
2. **Configuration** :
   - **HTTP Method** : POST
   - **Path** : `odoo-query`
   - **Respond** : Using 'Respond to Webhook' Node

#### Node 2 : Odoo (Node natif)

1. **Ajoutez** : Odoo
2. **Configuration** :
   - **Credentials** : Sélectionnez "Mon Odoo" (créé à l'étape 2)
   - **Resource** : `{{ $json.body.model }}`
   - **Operation** : "Search"
   - **Return All** : OFF
   - **Limit** : `={{ $json.body.limit || 10 }}`
   - **Options** :
     - **Fields** : `={{ $json.body.fields }}`
     - **Domain** : `={{ $json.body.domain }}`

#### Node 3 : Respond to Webhook

1. **Ajoutez** : Respond to Webhook
2. **Configuration** :
   - **Respond With** : JSON
   - **Response Body** :
```json
{
  "records": "={{ $json }}"
}
```

### 4.3 Activer

1. **Toggle "Active"** en haut à droite
2. **Copiez l'URL du webhook**
3. ✅ **C'est actif !**

---

## ÉTAPE 5 : Modifier votre Application Web (5 minutes)

### 5.1 Dans votre application

Remplacez le fichier `odoo-client.js` par `odoo-client-n8n.js` :

1. **Renommez** `odoo-client.js` en `odoo-client-old.js`
2. **Renommez** `odoo-client-n8n.js` en `odoo-client.js`

### 5.2 Modifier index.html

Dans `index.html`, trouvez où OdooClient est instancié et ajoutez l'URL n8n :

```javascript
// Avant
const client = new OdooClient(url, database, username, password);

// Après
const client = new OdooClientN8N(
  'https://votre-n8n.app.n8n.cloud',  // URL de votre n8n
  url,
  database,
  username,
  password
);
```

### 5.3 Redéployer sur Netlify

1. **Drag & drop** le dossier `web` mis à jour sur Netlify
2. ✅ **Ça devrait marcher !**

---

## 🧪 TESTER

1. **Ouvrez votre app** sur Netlify
2. **Configurez Odoo**
3. **Cliquez sur "Tester la connexion"**
4. ✅ **Ça marche !** Plus d'erreur CORS !

---

## 📊 Workflows n8n en JSON (Import rapide)

### Workflow 1 : Authentification

<details>
<summary>Cliquez pour voir le JSON</summary>

```json
{
  "name": "Odoo Auth Proxy",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "odoo-auth",
        "responseMode": "lastNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300],
      "webhookId": "auth-webhook"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $json.body.odooUrl }}/web/session/authenticate",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": []
        },
        "jsonParameters": true,
        "options": {},
        "bodyParametersJson": "={\n  \"jsonrpc\": \"2.0\",\n  \"method\": \"call\",\n  \"params\": {\n    \"db\": \"{{ $json.body.db }}\",\n    \"login\": \"{{ $json.body.login }}\",\n    \"password\": \"{{ $json.body.password }}\"\n  },\n  \"id\": 1\n}"
      },
      "name": "HTTP Request",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 3,
      "position": [450, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ $json }}"
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{ "node": "HTTP Request", "type": "main", "index": 0 }]]
    },
    "HTTP Request": {
      "main": [[{ "node": "Respond to Webhook", "type": "main", "index": 0 }]]
    }
  }
}
```

</details>

**Pour importer :**
1. Dans n8n, cliquez sur **"⋮"** (menu) > **"Import from File"**
2. Collez le JSON ci-dessus
3. Sauvegardez et activez

---

## ❓ FAQ

### Q : C'est gratuit ?
**R :** Oui ! n8n Cloud offre 5000 exécutions/mois gratuitement. Largement suffisant.

### Q : Mes données sont sécurisées ?
**R :** Oui ! n8n ne stocke pas vos données, il fait juste le pont. Et vous pouvez self-host.

### Q : Ça marche avec d'autres services que Odoo ?
**R :** Oui ! n8n peut être un proxy pour plein de services.

### Q : C'est lent ?
**R :** Non ! n8n ajoute environ 50-200ms de latence, c'est imperceptible.

### Q : Je peux voir les logs ?
**R :** Oui ! Dans n8n, allez dans "Executions" pour voir toutes les requêtes.

---

## 🎯 Résumé

```
1. Créer compte n8n (5 min)
   ↓
2. Configurer credentials Odoo (3 min)
   ↓
3. Créer workflow Auth (10 min)
   ↓
4. Créer workflow Query (10 min)
   ↓
5. Modifier l'app web (5 min)
   ↓
6. Déployer et tester ✅
```

**Temps total : 30 minutes**

---

## 🆘 Besoin d'aide ?

Si vous bloquez :
1. Vérifiez que les webhooks sont **actifs** (toggle ON)
2. Testez les webhooks avec curl avant de modifier l'app
3. Regardez les logs d'exécution dans n8n
4. Vérifiez que les URLs n8n sont correctes

---

## 🎉 Félicitations !

Une fois configuré, **ça marchera pour toujours** :
- ✅ Plus de problème CORS
- ✅ Application web fonctionnelle
- ✅ Connexion Odoo stable
- ✅ Déployable partout (Netlify, Vercel, etc.)

**Vous avez maintenant une vraie application web professionnelle !** 🚀
