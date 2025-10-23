# Guide de démarrage - Odoo Mobile Assistant

## 🚀 Lancer l'application

### Prérequis vérifiés ✅
- Node.js installé
- Dépendances installées (`npm install` a été exécuté)

### Démarrer le serveur Expo

Dans le terminal, exécutez :

```bash
npm start
```

Cela va :
1. Démarrer le serveur de développement Expo
2. Ouvrir Expo DevTools dans votre navigateur
3. Afficher un QR code dans le terminal

## 📱 Accéder à l'application

Vous avez **4 options** pour accéder à l'application :

---

## Option 1 : Sur votre téléphone (iOS ou Android) - RECOMMANDÉ

### Étape 1 : Installer Expo Go
Téléchargez l'application **Expo Go** depuis :
- **iOS** : [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android** : [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Étape 2 : Scanner le QR code
1. Lancez `npm start` dans votre terminal
2. Un QR code s'affichera dans le terminal et dans le navigateur
3. **Sur iOS** : Ouvrez l'app Appareil Photo et scannez le QR code
4. **Sur Android** : Ouvrez l'app Expo Go et cliquez sur "Scan QR Code"

### Étape 3 : L'application se charge
- L'application se télécharge et s'ouvre sur votre téléphone
- Vous êtes maintenant sur l'écran de configuration Odoo !

**Avantages :**
- ✅ Meilleure expérience utilisateur
- ✅ Test sur un vrai appareil
- ✅ Pas besoin d'émulateur

---

## Option 2 : Émulateur Android

### Prérequis
- Android Studio installé
- Un émulateur Android configuré

### Étapes
1. Lancez votre émulateur Android depuis Android Studio
2. Dans le terminal, exécutez :
```bash
npm run android
```
3. L'application se compile et s'ouvre dans l'émulateur

**Alternative :**
1. Lancez `npm start`
2. Appuyez sur `a` dans le terminal pour ouvrir sur Android

---

## Option 3 : Simulateur iOS (Mac uniquement)

### Prérequis
- macOS
- Xcode installé
- Simulateur iOS configuré

### Étapes
1. Dans le terminal, exécutez :
```bash
npm run ios
```
2. L'application se compile et s'ouvre dans le simulateur

**Alternative :**
1. Lancez `npm start`
2. Appuyez sur `i` dans le terminal pour ouvrir sur iOS

---

## Option 4 : Navigateur Web (pour tester rapidement)

### Étapes
1. Lancez `npm start`
2. Appuyez sur `w` dans le terminal OU
3. Dans Expo DevTools (navigateur), cliquez sur "Run in web browser"

**Note :** L'expérience web est limitée. Certaines fonctionnalités mobiles peuvent ne pas fonctionner parfaitement.

---

## 🎯 Raccourcis clavier pendant le développement

Quand `npm start` est lancé, vous pouvez utiliser :

| Touche | Action |
|--------|--------|
| `a` | Ouvrir sur émulateur Android |
| `i` | Ouvrir sur simulateur iOS |
| `w` | Ouvrir dans le navigateur web |
| `r` | Recharger l'application |
| `m` | Basculer le menu développeur |
| `c` | Effacer le cache et redémarrer |
| `q` | Quitter |

---

## 🔧 Dépannage

### ❌ Le QR code ne fonctionne pas

**Solution 1 - Même réseau WiFi :**
- Assurez-vous que votre ordinateur et votre téléphone sont sur le **même réseau WiFi**

**Solution 2 - Mode Tunnel :**
```bash
npm start -- --tunnel
```
Cela crée un tunnel et fonctionne même si vous êtes sur des réseaux différents.

**Solution 3 - Expo Go + URL manuelle :**
1. Dans Expo Go, choisissez "Enter URL manually"
2. Entrez l'URL affichée dans le terminal (ex: `exp://192.168.1.100:8081`)

### ❌ Erreur de port déjà utilisé

```bash
# Arrêter tous les processus sur le port 8081
lsof -ti:8081 | xargs kill -9

# Redémarrer
npm start
```

### ❌ Cache corrompu

```bash
# Nettoyer le cache
rm -rf node_modules
rm -rf .expo
npm install
npm start --clear
```

### ❌ L'application ne se met pas à jour

Dans Expo Go, secouez votre téléphone et choisissez "Reload".

---

## 📊 Que faire une fois l'application lancée ?

1. **Écran de configuration** : Vous verrez l'écran de configuration Odoo
2. **Entrez vos informations** :
   - URL Odoo : `https://votre-instance.odoo.com`
   - Base de données : nom de votre base
   - Email : votre email Odoo
   - Mot de passe : votre mot de passe Odoo

3. **Testez la connexion** : Cliquez sur "🔌 Tester la connexion"

4. **Enregistrez** : Si le test réussit, cliquez sur "✓ Enregistrer et continuer"

5. **Posez vos questions** : Vous êtes maintenant dans l'interface de chat !

---

## 🌐 URLs et Ports

Quand vous lancez `npm start`, Expo utilise :

- **Port principal** : 8081 (Metro Bundler)
- **Port DevTools** : 19000, 19001, 19002
- **URL locale** : `http://localhost:19000`

---

## 💡 Conseils

### Pour le développement
- Utilisez votre téléphone physique pour la meilleure expérience
- Gardez Expo Go installé sur votre téléphone
- Le rechargement automatique (Hot Reload) fonctionne pendant le développement

### Pour tester
- Testez d'abord sur le web pour vérifier rapidement
- Testez ensuite sur un vrai appareil pour l'expérience finale

### Pour le déploiement
- Consultez le README.md section "Déploiement"
- Utilisez `eas build` pour créer des builds de production

---

## 📞 Besoin d'aide ?

- **Documentation Expo** : https://docs.expo.dev/
- **Guide Odoo SaaS** : Voir `ODOO_SAAS_SETUP.md`
- **Exemples de questions** : Voir `EXAMPLES.md`

---

## ✅ Checklist de démarrage rapide

- [ ] `npm install` exécuté
- [ ] `npm start` lancé
- [ ] Expo Go installé sur le téléphone
- [ ] Téléphone et ordinateur sur le même WiFi
- [ ] QR code scanné
- [ ] Application ouverte sur le téléphone
- [ ] Configuration Odoo remplie
- [ ] Connexion testée et réussie
- [ ] Première question posée !

Bon développement ! 🚀
