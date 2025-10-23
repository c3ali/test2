# Options d'accès à l'application Odoo Assistant

Vous avez **plusieurs façons** d'utiliser l'application Odoo Assistant, **avec ou sans installation** sur votre machine locale.

## 🌟 Option 1 : Version Web (SANS INSTALLATION) - Recommandé pour tester

### ✅ Avantages
- Aucune installation requise
- Fonctionne sur n'importe quel appareil avec un navigateur
- Accès immédiat
- Pas besoin de Node.js ou npm

### ⚠️ Limitations
- Peut rencontrer des problèmes CORS avec certaines instances Odoo
- Pas de fonctionnement hors ligne
- Expérience utilisateur basique

### 📝 Comment faire

#### Méthode A : Ouvrir directement le fichier HTML

1. Téléchargez les fichiers du dossier `/web`
2. Double-cliquez sur `index.html`
3. Configurez votre Odoo et utilisez !

#### Méthode B : Serveur HTTP local

```bash
cd test2/web
python -m http.server 8000
# Ouvrez http://localhost:8000
```

#### Méthode C : Déployer en ligne (GitHub Pages, Netlify, Vercel)

Gratuit et accessible depuis n'importe où !

**📖 Guide détaillé : [web/README.md](./web/README.md)**

---

## 📱 Option 2 : Application Mobile avec Expo (SANS INSTALLATION sur PC)

### ✅ Avantages
- Meilleure expérience utilisateur
- Pas de problèmes CORS
- Application native iOS/Android
- Fonctionne hors ligne
- Peut recevoir des notifications

### ⚠️ Limitations
- Nécessite un ordinateur pour lancer le serveur Expo (peut être celui d'un collègue)
- Nécessite l'app Expo Go sur le téléphone

### 📝 Comment faire

#### Sur l'ordinateur (le vôtre ou celui d'un collègue) :

```bash
cd test2
npm install
npm start
```

Un QR code s'affiche.

#### Sur votre téléphone :

1. Installez **Expo Go** :
   - iOS : [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android : [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scannez le QR code avec Expo Go

3. L'application s'ouvre sur votre téléphone !

**📖 Guide détaillé : [GETTING_STARTED.md](./GETTING_STARTED.md)**

---

## 💻 Option 3 : Installation complète sur votre machine

### ✅ Avantages
- Contrôle total
- Développement et personnalisation
- Toutes les fonctionnalités
- Peut créer des builds APK/IPA

### ⚠️ Limitations
- Nécessite Node.js et npm installés
- Nécessite de cloner le projet

### 📝 Comment faire

```bash
# Cloner le projet
git clone <URL_DU_REPO>
cd test2

# Installer les dépendances
npm install

# Lancer l'application
npm start

# Puis scannez le QR code avec Expo Go
```

**📖 Guide détaillé : [README.md](./README.md)**

---

## 🚀 Option 4 : Builds natifs (APK/IPA)

### ✅ Avantages
- Application installable sur le téléphone
- Pas besoin d'Expo Go
- Distribution à d'autres utilisateurs
- Application autonome

### ⚠️ Limitations
- Nécessite un compte Expo
- Peut nécessiter des comptes Apple/Google pour publication
- Temps de build plus long

### 📝 Comment faire

```bash
# Installer EAS CLI
npm install -g eas-cli

# Se connecter à Expo
eas login

# Créer un build Android
eas build --platform android

# Créer un build iOS
eas build --platform ios
```

Vous recevrez un fichier APK (Android) ou IPA (iOS) à installer.

---

## 📊 Tableau comparatif

| Option | Installation requise | Meilleure expérience | CORS | Hors ligne | Difficulté |
|--------|---------------------|---------------------|------|------------|-----------|
| **Version Web** | ❌ Non | ⭐⭐⭐ | ⚠️ Possible | ❌ | 🟢 Facile |
| **Expo Go** | ⚠️ Sur un PC | ⭐⭐⭐⭐⭐ | ✅ Aucun | ✅ | 🟡 Moyen |
| **Installation locale** | ✅ Sur votre PC | ⭐⭐⭐⭐⭐ | ✅ Aucun | ✅ | 🟡 Moyen |
| **Build natif** | ✅ Setup complet | ⭐⭐⭐⭐⭐ | ✅ Aucun | ✅ | 🔴 Avancé |

---

## 🎯 Quelle option choisir ?

### Pour tester rapidement (5 minutes)
→ **Option 1 : Version Web**
- Téléchargez le dossier `/web`
- Ouvrez `index.html`

### Pour une utilisation quotidienne sur téléphone
→ **Option 2 : Expo Go**
- Demandez à un collègue de lancer `npm start`
- Scannez le QR code
- Utilisez l'app sur votre téléphone

### Pour développer et personnaliser
→ **Option 3 : Installation locale**
- Installez Node.js
- Clonez et lancez le projet

### Pour distribuer à d'autres utilisateurs
→ **Option 4 : Build natif**
- Créez un APK/IPA
- Partagez le fichier

---

## 🆘 Besoin d'aide ?

### Pour la version web
📖 Voir [web/README.md](./web/README.md)

### Pour l'app mobile
📖 Voir [GETTING_STARTED.md](./GETTING_STARTED.md)

### Pour la configuration Odoo
📖 Voir [ODOO_SAAS_SETUP.md](./ODOO_SAAS_SETUP.md)

### Pour des exemples de questions
📖 Voir [EXAMPLES.md](./EXAMPLES.md)

---

## 💡 Recommandation

**Pour commencer :**
1. Testez la **version web** pour voir si ça vous convient
2. Si problème CORS, passez à **Expo Go** sur téléphone
3. Si vous voulez personnaliser, faites une **installation locale**

---

## 🔒 Sécurité

Quelle que soit l'option choisie :
- ✅ Vos identifiants restent sur votre appareil
- ✅ Communication HTTPS avec Odoo uniquement
- ✅ Aucun serveur tiers impliqué
- ✅ Code source open source et vérifiable

---

## ⚡ Démarrage rapide par profil

### Vous êtes utilisateur final
```bash
# Téléchargez /web et ouvrez index.html
```

### Vous êtes développeur
```bash
npm install && npm start
```

### Vous voulez distribuer l'app
```bash
eas build --platform android
```

Bon développement ! 🚀
