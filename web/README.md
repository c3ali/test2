# Version Web - Odoo Mobile Assistant

## 🌐 Accès direct via navigateur

Cette version web vous permet d'utiliser Odoo Assistant **directement dans votre navigateur** sans installer quoi que ce soit !

## Comment l'utiliser

### Option 1 : Ouvrir le fichier HTML localement

1. **Téléchargez les fichiers** du dossier `/web` :
   - `index.html`
   - `odoo-client.js`
   - `app.js`

2. **Ouvrez `index.html`** dans votre navigateur (double-clic)

3. **Configurez votre connexion Odoo** et commencez à poser des questions !

### Option 2 : Servir avec un serveur HTTP local

```bash
# Dans le dossier /web
python -m http.server 8000

# Ou avec Node.js
npx serve

# Puis ouvrez http://localhost:8000 dans votre navigateur
```

### Option 3 : Déployer sur un hébergement web

Vous pouvez héberger ces fichiers sur :

- **GitHub Pages** (gratuit)
- **Netlify** (gratuit)
- **Vercel** (gratuit)
- **Firebase Hosting** (gratuit)
- N'importe quel serveur web

## ⚠️ Note importante sur CORS

Si vous rencontrez des erreurs CORS lors de la connexion à Odoo, c'est normal. Odoo Online peut bloquer les requêtes depuis certains domaines.

### Solutions :

1. **Utiliser l'extension CORS** dans votre navigateur (pour les tests) :
   - Chrome : [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
   - Firefox : CORS Everywhere

2. **Déployer sur HTTPS** : Les instances Odoo acceptent mieux les connexions HTTPS

3. **Utiliser l'application mobile** : L'application React Native Expo n'a pas ce problème

## 🎯 Fonctionnalités

✅ Configuration Odoo SaaS
✅ Test de connexion
✅ Interface de chat
✅ Questions en langage naturel
✅ Stockage local sécurisé (localStorage)
✅ Support de 8 modèles Odoo
✅ Responsive design

## 📱 Comparaison Web vs Mobile

| Fonctionnalité | Version Web | App Mobile |
|----------------|-------------|------------|
| Installation requise | ❌ Non | ✅ Expo Go |
| Fonctionne hors ligne | ❌ Non | ✅ Oui (cache) |
| Problèmes CORS | ⚠️ Possible | ✅ Aucun |
| Notifications | ❌ Non | ✅ Oui |
| Expérience | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## 🔒 Sécurité

Vos identifiants Odoo sont stockés dans le **localStorage** de votre navigateur :
- ✅ Stockés localement uniquement
- ✅ Jamais partagés avec des tiers
- ✅ Communication HTTPS avec Odoo
- ⚠️ Effacés si vous videz le cache du navigateur

## 🚀 Pour commencer

1. Ouvrez `index.html`
2. Remplissez vos informations Odoo
3. Cliquez sur "Tester la connexion"
4. Si succès, cliquez sur "Enregistrer et continuer"
5. Posez vos questions !

## 💡 Conseils

- Utilisez un navigateur moderne (Chrome, Firefox, Edge, Safari)
- Activez JavaScript
- Pour la meilleure expérience, utilisez l'application mobile
- Si CORS bloque, utilisez une extension ou déployez sur HTTPS

## 🆘 Dépannage

### ❌ Erreur CORS
Utilisez une extension CORS ou déployez sur un serveur HTTPS

### ❌ localStorage bloqué
Vérifiez que les cookies/stockage local sont autorisés dans votre navigateur

### ❌ Connexion impossible
Vérifiez vos paramètres Odoo et votre connexion Internet

## 📖 Documentation

- [Guide Odoo SaaS](../ODOO_SAAS_SETUP.md)
- [Exemples de questions](../EXAMPLES.md)
- [README principal](../README.md)
