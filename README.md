# Odoo Mobile Assistant

Application mobile iOS et Android qui permet de communiquer avec votre base de données Odoo en ligne et de lui poser des questions en langage naturel.

## Fonctionnalités

- **Communication avec Odoo** : Connexion sécurisée à votre instance Odoo via API JSON-RPC
- **Interface de chat intuitive** : Posez vos questions en langage naturel
- **Interprétation intelligente** : Le système analyse vos questions et interroge les bons modèles Odoo
- **Multiplateforme** : Fonctionne sur iOS et Android
- **Recherches avancées** : Support de différents modèles Odoo (clients, commandes, produits, factures, etc.)

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un compte Odoo avec accès API

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

### Premier lancement

1. Lancez l'application sur votre appareil ou émulateur
2. Configurez votre connexion Odoo :
   - **URL Odoo** : L'URL de votre instance (ex: https://votre-instance.odoo.com)
   - **Base de données** : Le nom de votre base de données Odoo
   - **Nom d'utilisateur** : Votre email de connexion Odoo
   - **Mot de passe** : Votre mot de passe Odoo

3. Cliquez sur "Enregistrer"

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

### Erreur d'authentification

- Vérifiez que votre URL Odoo est correcte (avec https://)
- Assurez-vous que votre utilisateur a les droits API
- Vérifiez que le nom de la base de données est correct

### Erreur de connexion

- Vérifiez votre connexion internet
- Assurez-vous que votre instance Odoo est accessible
- Vérifiez que l'API JSON-RPC est activée sur votre instance

### Aucun résultat

- Essayez de reformuler votre question
- Vérifiez que le modèle interrogé contient des données
- Assurez-vous d'avoir les droits de lecture sur le modèle

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le repository GitHub.

## License

MIT

## Auteur

Créé avec Claude Code
