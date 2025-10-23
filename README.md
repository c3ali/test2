# Odoo Mobile Assistant

Application mobile iOS et Android qui permet de communiquer avec votre **instance Odoo SaaS (Odoo Online)** et de lui poser des questions en langage naturel.

## 🚀 Accès rapide - SANS installation

**Vous pouvez utiliser l'application SANS installer Node.js ou npm sur votre machine !**

### 🌐 Option 1 : Version Web (Accès immédiat)
Téléchargez le dossier `/web` et ouvrez `index.html` dans votre navigateur.
**→ [Guide Version Web](./web/README.md)**

### 📱 Option 2 : App Mobile via Expo Go
Demandez à quelqu'un de lancer `npm start` et scannez le QR code avec Expo Go.
**→ [Guide Démarrage](./GETTING_STARTED.md)**

**📋 [Voir toutes les options d'accès](./OPTIONS_ACCES.md)**

---

## ⚡ Pour Odoo SaaS (Version en ligne)

Cette application est conçue pour **Odoo Online / Odoo SaaS**. Vous N'AVEZ PAS BESOIN d'accès direct à la base de données PostgreSQL. L'application communique uniquement via l'API JSON-RPC d'Odoo.

**📖 [Guide détaillé de configuration Odoo SaaS](./ODOO_SAAS_SETUP.md)**

## Fonctionnalités

- **Communication avec Odoo SaaS** : Connexion sécurisée à votre instance Odoo en ligne via API JSON-RPC
- **Solution CORS intégrée** : Support du proxy n8n pour contourner les restrictions CORS d'Odoo SaaS
- **Interface de chat intuitive** : Posez vos questions en langage naturel
- **Interprétation intelligente** : Le système analyse vos questions et interroge les bons modèles Odoo
- **Test de connexion** : Testez votre configuration avant de l'enregistrer
- **Multiplateforme** : Fonctionne sur iOS, Android et Web
- **Recherches avancées** : Support de différents modèles Odoo (clients, commandes, produits, factures, etc.)
- **100% sécurisé** : Vos identifiants restent sur votre appareil

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- **Un compte Odoo Online** (https://www.odoo.com)

## Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd test2
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer l'application**
```bash
npm start
```

Cela ouvrira Expo DevTools dans votre navigateur.

## Utilisation

### Configuration Odoo SaaS

1. Lancez l'application sur votre appareil ou émulateur
2. Remplissez les informations de connexion :
   - **URL Odoo** : L'URL de votre instance (ex: https://monentreprise.odoo.com)
   - **Base de données** : Le nom de votre base de données (souvent identique à votre sous-domaine)
   - **Nom d'utilisateur** : Votre email de connexion Odoo
   - **Mot de passe** : Votre mot de passe Odoo

3. Cliquez sur **"🔌 Tester la connexion"** pour vérifier que tout fonctionne

4. Si le test réussit, cliquez sur **"✓ Enregistrer et continuer"**

**📖 Guide détaillé : [ODOO_SAAS_SETUP.md](./ODOO_SAAS_SETUP.md)**

### Trouver vos informations Odoo

**URL :** L'adresse que vous utilisez dans votre navigateur pour accéder à Odoo
- Exemple : `https://monentreprise.odoo.com`

**Base de données :** Généralement le même nom que votre sous-domaine
- Pour trouver le nom exact, connectez-vous à Odoo et tapez dans la console : `odoo.session_info.db`

**Identifiants :** Les mêmes que vous utilisez pour vous connecter via le navigateur

### Poser des questions

Une fois configuré, vous accédez à l'interface de chat. Vous pouvez poser des questions comme :

- "Affiche-moi les 5 derniers clients"
- "Quelles sont les commandes de cette semaine ?"
- "Liste les produits disponibles"
- "Montre-moi les factures en brouillon"
- "Quels sont les derniers employés ajoutés ?"
- "Affiche les projets en cours"

### Modèles supportés

L'application peut interroger différents modèles Odoo :

- **Clients/Partenaires** (`res.partner`)
- **Commandes** (`sale.order`)
- **Produits** (`product.product`)
- **Factures** (`account.move`)
- **Livraisons** (`stock.picking`)
- **Employés** (`hr.employee`)
- **Projets** (`project.project`)
- **Opportunités** (`crm.lead`)

### Filtres intelligents

Le système comprend plusieurs types de filtres :

- **Temporels** : "aujourd'hui", "cette semaine", "ce mois"
- **États** : "brouillon", "confirmé", "fait"
- **Limites** : "les 10 derniers", "les 5 premiers"

## Déploiement

### Build Android

```bash
expo build:android
```

### Build iOS

```bash
expo build:ios
```

Ou utilisez EAS Build pour une expérience modernisée :

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Structure du projet

```
test2/
├── App.js                  # Point d'entrée de l'application
├── app.json               # Configuration Expo
├── package.json           # Dépendances du projet
├── screens/
│   ├── ConfigScreen.js    # Écran de configuration Odoo
│   └── ChatScreen.js      # Interface de chat
└── services/
    └── OdooClient.js      # Client API Odoo
```

## Sécurité

- Les informations de connexion sont stockées localement de manière sécurisée avec AsyncStorage
- Aucune donnée n'est envoyée à des serveurs tiers
- La communication avec Odoo se fait directement via API sécurisée

## Personnalisation

### Ajouter de nouveaux modèles

Dans `services/OdooClient.js`, vous pouvez modifier la méthode `analyzeQuery()` pour ajouter de nouveaux modèles :

```javascript
const modelKeywords = {
  'votre.modele': ['mot-clé1', 'mot-clé2'],
  // ...
};

const fieldsByModel = {
  'votre.modele': ['field1', 'field2', 'field3'],
  // ...
};
```

### Modifier l'apparence

Les styles sont définis dans chaque fichier de screen. Vous pouvez modifier les couleurs principales :

- Couleur primaire : `#714B67` (violet Odoo)
- Fond : `#f5f5f5` (gris clair)

## Dépannage

### ❌ Erreur CORS / "Erreur réseau"

**Problème le plus fréquent avec Odoo SaaS !** Odoo Online bloque les connexions depuis des domaines externes pour des raisons de sécurité.

**Solutions :**

**Solution recommandée : Utiliser n8n comme proxy**
1. L'application web intègre maintenant le support n8n
2. Suivez le guide complet : **[N8N_SETUP_GUIDE.md](./N8N_SETUP_GUIDE.md)** (30 minutes)
3. Activez simplement la case "🔄 Utiliser n8n comme proxy" dans la configuration
4. C'est la solution la plus robuste et professionnelle

**Alternative : Version mobile (pas de CORS)**
- L'application mobile React Native ne souffre pas de CORS
- Utilisez Expo Go pour tester rapidement
- **→ [Guide Mobile](./GETTING_STARTED.md)**

### ❌ Impossible de se connecter

**Solutions :**
1. Vérifiez que l'URL commence par `https://` et n'a pas de `/` final
2. Testez l'URL dans votre navigateur - elle doit être accessible
3. Vérifiez votre connexion Internet
4. Si erreur "Failed to fetch" ou "Erreur réseau" → C'est un problème CORS, voir ci-dessus
5. Essayez de passer du WiFi aux données mobiles ou vice versa

### ❌ Identifiants incorrects

**Solutions :**
1. Vérifiez que vous pouvez vous connecter via le navigateur avec ces mêmes identifiants
2. Vérifiez que le nom de la base de données est correct (voir [ODOO_SAAS_SETUP.md](./ODOO_SAAS_SETUP.md))
3. Assurez-vous qu'il n'y a pas d'espaces avant/après vos identifiants

### ❌ Erreur d'authentification

**Solutions :**
- Utilisez le bouton "🔌 Tester la connexion" pour identifier le problème
- Vérifiez que votre abonnement Odoo est actif
- Assurez-vous que votre utilisateur a accès à l'API (activé par défaut sur Odoo Online)

### ❌ Aucun résultat trouvé

**Solutions :**
- Vérifiez que vous avez des données dans votre Odoo
- Reformulez votre question (voir [EXAMPLES.md](./EXAMPLES.md))
- Vérifiez que vous avez les droits de lecture sur le modèle interrogé
- Essayez une question plus simple : "Affiche les clients"

**Pour plus de détails :** Consultez le [Guide de configuration Odoo SaaS](./ODOO_SAAS_SETUP.md)

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository GitHub.

## License

MIT

## Auteur

Créé avec Claude Code
