# 🔧 Résolution du problème "Erreur réseau"

## Vous avez eu ce message d'erreur ?

```
❌ Erreur réseau. Vérifiez votre connexion Internet et l'URL Odoo.
```

**C'est normal !** Ce n'est PAS un problème avec votre Odoo ou votre Internet.

---

## 🤔 Pourquoi cette erreur ?

Quand vous ouvrez `index.html` directement (en double-cliquant dessus), le navigateur bloque la connexion à Odoo pour des raisons de sécurité. C'est ce qu'on appelle une "erreur CORS".

**En bref :** Votre navigateur dit "Je ne peux pas accéder à Odoo depuis un fichier local".

---

## ✅ SOLUTIONS (choisissez-en une)

### 🌟 Solution 1 : Extension navigateur (LA PLUS SIMPLE - 2 minutes)

C'est la solution la plus rapide si vous n'êtes pas à l'aise avec la technique.

#### Pour Google Chrome :

1. **Ouvrez ce lien** : https://chrome.google.com/webstore
2. **Dans la barre de recherche**, tapez : `Allow CORS`
3. **Cherchez l'extension** : "Allow CORS: Access-Control-Allow-Origin"
4. **Cliquez sur "Ajouter à Chrome"**
5. **Confirmez** l'installation
6. **Cliquez sur l'icône de l'extension** (en haut à droite de Chrome, à côté de la barre d'adresse)
7. **Activez** l'extension (elle devient colorée/activée)
8. **Retournez** à votre onglet avec index.html
9. **Rechargez la page** (F5 ou Ctrl+R)
10. **Cliquez à nouveau sur "Tester la connexion"**

✅ **Ça devrait marcher maintenant !**

#### Pour Firefox :

1. **Ouvrez ce lien** : https://addons.mozilla.org
2. **Dans la barre de recherche**, tapez : `CORS Everywhere`
3. **Trouvez l'extension** "CORS Everywhere"
4. **Cliquez sur "Ajouter à Firefox"**
5. **Confirmez** l'installation
6. **Activez** l'extension
7. **Rechargez** votre page index.html
8. **Retestez** la connexion

✅ **Ça devrait marcher !**

---

### 🚀 Solution 2 : Lancer avec un serveur (3 minutes)

Au lieu d'ouvrir index.html directement, on va lancer un petit serveur.

#### Sur Windows :

1. **Dans le dossier `web`**, trouvez le fichier **`LANCER_APPLICATION.bat`**
2. **Double-cliquez** dessus
3. Une fenêtre noire s'ouvre et votre navigateur s'ouvre automatiquement
4. **Ne fermez pas la fenêtre noire** (c'est le serveur qui tourne)
5. **Utilisez l'application** normalement
6. Quand vous avez fini, fermez la fenêtre noire

⚠️ **Important :** Ne fermez pas la fenêtre noire tant que vous utilisez l'application !

#### Sur Mac :

1. **Dans le dossier `web`**, trouvez le fichier **`LANCER_APPLICATION.command`**
2. **Double-cliquez** dessus
3. Si vous avez un message de sécurité :
   - Allez dans **Préférences Système** > **Sécurité**
   - Cliquez sur **"Ouvrir quand même"**
4. Le Terminal s'ouvre et votre navigateur s'ouvre automatiquement
5. **Ne fermez pas le Terminal** (c'est le serveur qui tourne)
6. **Utilisez l'application** normalement

#### Sur Linux :

1. **Ouvrez un terminal** dans le dossier `web`
2. **Tapez** : `python3 LANCER_APPLICATION.py`
3. **Appuyez sur Entrée**
4. Votre navigateur s'ouvre automatiquement
5. **Utilisez l'application** normalement

---

### 🌐 Solution 3 : Déployer en ligne (10 minutes)

Si vous voulez une solution permanente sans extensions ni serveur local :

#### Option A : GitHub Pages (gratuit)

1. Créez un compte sur https://github.com
2. Créez un nouveau repository
3. Uploadez les fichiers du dossier `web`
4. Allez dans Settings > Pages
5. Activez GitHub Pages
6. Vous obtenez une URL type : `https://votrenom.github.io/odoo-assistant`

#### Option B : Netlify (gratuit, plus simple)

1. Allez sur https://www.netlify.com
2. Créez un compte gratuit
3. Glissez-déposez le dossier `web` sur Netlify
4. Vous obtenez une URL instantanément

**Avantage :** Vous pouvez accéder à l'application depuis n'importe où avec cette URL !

---

## 🆘 Autres causes possibles

Si aucune solution ne fonctionne, vérifiez :

### 1. Votre connexion Internet

```bash
# Testez votre connexion
# Ouvrez un nouvel onglet et allez sur : www.google.com
# Si ça ne marche pas, c'est votre connexion Internet qui a un problème
```

### 2. Votre URL Odoo

```bash
# Vérifiez que votre URL :
✅ Commence par https:// (pas http://)
✅ Se termine par .odoo.com ou votre domaine
✅ N'a pas de / à la fin
❌ Exemple incorrect : http://monentreprise.odoo.com/
✅ Exemple correct   : https://monentreprise.odoo.com
```

### 3. Votre instance Odoo est accessible

```bash
# Test simple :
# Ouvrez un nouvel onglet
# Allez sur votre URL Odoo
# Si vous arrivez sur la page de connexion → Odoo fonctionne
# Si vous avez une erreur → Odoo est peut-être hors ligne
```

### 4. Le nom de votre base de données

```bash
# Pour trouver le nom exact de votre base :
1. Connectez-vous à Odoo dans votre navigateur
2. Appuyez sur F12 (ouvre les outils développeur)
3. Cliquez sur l'onglet "Console"
4. Tapez : odoo.session_info.db
5. Appuyez sur Entrée
6. Le nom qui s'affiche est votre nom de base de données exact
```

---

## 📊 Récapitulatif des solutions

| Solution | Difficulté | Temps | Permanent |
|----------|-----------|-------|-----------|
| Extension navigateur | ⭐ Facile | 2 min | ✅ Oui |
| Serveur local | ⭐⭐ Moyen | 3 min | ❌ Non (à relancer) |
| Déploiement en ligne | ⭐⭐⭐ Avancé | 10 min | ✅ Oui |

---

## 💡 Quelle solution choisir ?

### Vous voulez juste tester rapidement ?
→ **Extension navigateur** (Solution 1)

### Vous allez utiliser l'app régulièrement sur votre PC ?
→ **Extension navigateur** (Solution 1)

### Vous voulez partager l'app avec des collègues ?
→ **Déploiement en ligne** (Solution 3)

### Vous ne voulez pas installer d'extension ?
→ **Serveur local** (Solution 2)

---

## ✅ Après avoir appliqué une solution

1. **Rechargez** votre page index.html (F5)
2. **Remplissez** à nouveau vos informations Odoo
3. **Cliquez** sur "🔌 Tester la connexion"
4. **Ça devrait marcher !** 🎉

---

## 🎓 Pour comprendre (optionnel)

**CORS** = Cross-Origin Resource Sharing

C'est une sécurité du navigateur qui empêche un site web (ou fichier local) d'accéder à un autre site sans permission.

**Pourquoi ce problème ?**
- Vous ouvrez index.html depuis votre disque dur (`file://...`)
- L'application essaie d'accéder à votre Odoo (`https://votreodoo.com`)
- Le navigateur dit : "Non ! C'est interdit pour votre sécurité !"

**Les solutions :**
- Extension : On dit au navigateur "C'est OK, autorise cette connexion"
- Serveur local : On transforme `file://` en `http://localhost` (autorisé)
- En ligne : On met l'app sur `https://` (autorisé)

---

## 📞 Toujours bloqué ?

Si aucune solution ne fonctionne :

1. **Notez** quelle solution vous avez essayée
2. **Faites une capture d'écran** de l'erreur
3. **Notez** votre navigateur et sa version
4. **Contactez** le support avec ces informations

---

## ✨ Bonus : Raccourcis utiles

Une fois que ça marche :

- **Ctrl + R** ou **F5** : Recharger la page
- **Ctrl + Shift + R** : Recharger en vidant le cache
- **F12** : Ouvrir la console développeur (pour voir les erreurs)

---

**Bonne utilisation !** 🚀
