# Guide Simple pour Utilisateurs Non-Techniques

## 🎯 Objectif
Utiliser l'application Odoo Assistant pour poser des questions à votre Odoo.

## ✅ Ce dont vous avez besoin
- Un ordinateur avec accès Internet
- Un navigateur web (Chrome, Firefox, Edge, Safari)
- Vos identifiants Odoo (email et mot de passe que vous utilisez normalement)

---

## 📝 ÉTAPE PAR ÉTAPE

### ÉTAPE 1 : Télécharger les fichiers (5 minutes)

#### 1.1 Aller sur le site du projet
- Ouvrez votre navigateur web
- Allez sur la page GitHub du projet (l'URL vous sera fournie)

#### 1.2 Télécharger le projet
1. Cherchez un bouton vert qui dit **"Code"** ou **"<> Code"**
2. Cliquez dessus
3. Cliquez sur **"Download ZIP"**
4. Le fichier ZIP se télécharge (comme quand vous téléchargez une photo)

#### 1.3 Décompresser le fichier ZIP
1. Allez dans votre dossier **Téléchargements** (Downloads)
2. Trouvez le fichier **test2-main.zip** (ou similaire)
3. Faites un **clic droit** dessus
4. Choisissez **"Extraire tout..."** ou **"Décompresser"**
5. Un nouveau dossier **test2-main** apparaît

---

### ÉTAPE 2 : Ouvrir l'application (1 minute)

#### 2.1 Naviguer jusqu'au bon dossier
1. Ouvrez le dossier **test2-main** que vous venez de décompresser
2. À l'intérieur, trouvez le dossier **web**
3. Ouvrez-le

#### 2.2 Ouvrir l'application
1. Dans le dossier **web**, vous verrez un fichier nommé **index.html**
2. **Double-cliquez** sur ce fichier
3. L'application s'ouvre dans votre navigateur web ! 🎉

**Alternative si le double-clic ne fonctionne pas :**
- Faites un **clic droit** sur **index.html**
- Choisissez **"Ouvrir avec"**
- Sélectionnez votre navigateur (Chrome, Firefox, etc.)

---

### ÉTAPE 3 : Configurer votre connexion Odoo (3 minutes)

Vous voyez maintenant un écran avec des champs à remplir.

#### 3.1 Trouver vos informations Odoo

**URL Odoo :**
- C'est l'adresse que vous tapez dans votre navigateur pour accéder à Odoo
- Exemple : `https://monentreprise.odoo.com`
- **Comment la trouver ?**
  1. Ouvrez un nouvel onglet
  2. Connectez-vous à votre Odoo comme d'habitude
  3. Regardez la barre d'adresse en haut
  4. Copiez l'adresse (sans les pages après .com)

**Base de données :**
- C'est généralement le même nom que dans votre URL
- Si votre URL est `https://monentreprise.odoo.com`, la base est `monentreprise`
- **Pas sûr ?** Essayez le nom de votre entreprise en minuscules, sans espaces

**Nom d'utilisateur :**
- C'est votre email de connexion Odoo
- Exemple : `marie.dupont@monentreprise.com`

**Mot de passe :**
- Le même mot de passe que vous utilisez pour vous connecter à Odoo

#### 3.2 Remplir les champs
1. Tapez votre **URL Odoo** dans le premier champ
2. Tapez le nom de votre **base de données** dans le deuxième champ
3. Tapez votre **email** dans le troisième champ
4. Tapez votre **mot de passe** dans le quatrième champ

#### 3.3 Tester la connexion
1. Cliquez sur le bouton **"🔌 Tester la connexion"**
2. Attendez quelques secondes
3. Un message apparaît :
   - ✅ **Si c'est réussi** : "Connexion réussie !" → Passez à l'étape suivante
   - ❌ **Si ça échoue** : Vérifiez que vous avez bien copié vos informations

#### 3.4 Enregistrer la configuration
1. Cliquez sur le bouton **"✓ Enregistrer et continuer"**
2. L'écran change et vous voyez maintenant un chat !

---

### ÉTAPE 4 : Poser vos questions (aussi longtemps que vous voulez)

Vous êtes maintenant sur l'écran de chat. C'est très simple :

#### 4.1 Comment poser une question
1. En bas de l'écran, il y a une zone de texte
2. Tapez votre question en français, comme si vous parliez à quelqu'un
3. Appuyez sur **Entrée** ou cliquez sur la **flèche** →

#### 4.2 Exemples de questions à poser

**Pour voir vos clients :**
```
Affiche-moi les 10 derniers clients
```

**Pour voir vos commandes :**
```
Quelles sont les commandes de cette semaine ?
```

**Pour voir vos produits :**
```
Liste les produits disponibles
```

**Pour voir vos factures :**
```
Montre-moi les factures en brouillon
```

**Pour voir des informations spécifiques :**
```
Combien de clients j'ai à Paris ?
```

#### 4.3 Lire les réponses
- L'application cherche dans votre Odoo (quelques secondes)
- La réponse s'affiche dans le chat
- Vous pouvez poser autant de questions que vous voulez !

---

## ❓ Questions Fréquentes

### Q : Mes informations sont-elles en sécurité ?
**R :** Oui ! Vos identifiants sont stockés uniquement sur votre ordinateur, dans votre navigateur. Personne d'autre n'y a accès.

### Q : Dois-je reconfigurer à chaque fois ?
**R :** Non ! Vos informations sont sauvegardées. La prochaine fois que vous ouvrez index.html, vous serez directement sur l'écran de chat.

### Q : Comment me déconnecter ?
**R :** Cliquez sur l'icône ⚙️ (engrenage) en haut à droite de l'écran de chat, puis confirmez la réinitialisation.

### Q : Ça ne fonctionne pas, que faire ?
**R :** Vérifiez que :
1. Vous êtes connecté à Internet
2. Vous pouvez accéder à votre Odoo dans un autre onglet
3. Votre URL commence bien par `https://`
4. Votre mot de passe est correct

### Q : J'ai un message "Erreur CORS"
**R :** C'est un problème technique avec certaines instances Odoo. Solutions :
1. Utilisez Chrome et installez l'extension "Allow CORS"
2. OU contactez-moi pour une solution alternative

---

## 🎬 Résumé Ultra-Rapide

```
1. Télécharger ZIP → Décompresser
   ↓
2. Ouvrir dossier "web" → Double-clic sur "index.html"
   ↓
3. Remplir vos infos Odoo → Tester → Enregistrer
   ↓
4. Poser vos questions !
```

---

## 📞 Aide Supplémentaire

Si vous êtes bloqué à une étape :
1. Notez à quelle étape vous êtes bloqué
2. Notez le message d'erreur si vous en voyez un
3. Contactez le support avec ces informations

---

## 🎉 Félicitations !

Une fois que vous avez terminé l'ÉTAPE 4, vous pouvez :
- Poser toutes les questions que vous voulez à votre Odoo
- Fermer et rouvrir l'application quand vous voulez
- L'utiliser aussi souvent que nécessaire

**Bon usage !** 🚀

---

## 📋 Checklist de vérification

Cochez au fur et à mesure :

- [ ] J'ai téléchargé le fichier ZIP
- [ ] J'ai décompressé le ZIP
- [ ] J'ai trouvé le dossier "web"
- [ ] J'ai ouvert "index.html" dans mon navigateur
- [ ] J'ai rempli mes informations Odoo
- [ ] Le test de connexion a réussi
- [ ] J'ai cliqué sur "Enregistrer et continuer"
- [ ] Je vois l'écran de chat
- [ ] J'ai posé ma première question
- [ ] J'ai reçu une réponse !

**Si vous avez tout coché, bravo ! Vous savez utiliser l'application ! 🎊**
