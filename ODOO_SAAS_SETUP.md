# Configuration Odoo SaaS (Odoo Online)

Ce guide vous aide à configurer votre application mobile avec **Odoo SaaS** (version en ligne).

## Important : Odoo SaaS vs Odoo On-Premise

Cette application est conçue pour fonctionner avec **Odoo SaaS (Odoo Online)**, la version hébergée en ligne d'Odoo. Vous N'AVEZ PAS BESOIN d'accès direct à la base de données PostgreSQL. L'application communique via l'API Odoo en utilisant JSON-RPC.

## Prérequis

1. Un compte Odoo Online actif (https://www.odoo.com)
2. Accès utilisateur avec les droits de lecture sur les modèles que vous souhaitez interroger
3. Vos identifiants de connexion Odoo (email et mot de passe)

## Comment trouver vos informations de connexion

### 1. URL Odoo

Votre URL Odoo est l'adresse que vous utilisez pour accéder à votre instance Odoo dans le navigateur.

**Format typique :**
- `https://votre-entreprise.odoo.com`
- `https://votre-domaine.odoo.com`

**Exemple :**
Si vous accédez à Odoo via `https://monentreprise.odoo.com`, alors votre URL est :
```
https://monentreprise.odoo.com
```

⚠️ **Important :**
- N'oubliez pas le `https://`
- Ne mettez pas de `/` à la fin
- Utilisez l'URL exacte que vous voyez dans votre navigateur

### 2. Base de données

Pour Odoo Online, le nom de la base de données est généralement le même que votre sous-domaine.

**Exemples :**
- Si votre URL est `https://monentreprise.odoo.com`, la base de données est souvent `monentreprise`
- Si votre URL est `https://demo.odoo.com`, la base de données est souvent `demo`

**Comment trouver le nom exact :**
1. Connectez-vous à votre Odoo dans un navigateur
2. Ouvrez la console développeur (F12)
3. Dans l'onglet Console, tapez : `odoo.session_info.db`
4. Le nom affiché est votre nom de base de données

OU

1. Allez sur la page de gestion de base de données : `https://votre-instance.odoo.com/web/database/manager`
2. Vous verrez le nom de votre base de données

### 3. Nom d'utilisateur (Email)

C'est l'adresse email que vous utilisez pour vous connecter à Odoo.

**Exemple :**
```
admin@monentreprise.com
utilisateur@example.com
```

### 4. Mot de passe

C'est le même mot de passe que vous utilisez pour vous connecter à Odoo via le navigateur.

## Configuration dans l'application

### Étape 1 : Ouvrir l'écran de configuration

Lancez l'application. Si c'est votre première utilisation, vous serez automatiquement sur l'écran de configuration.

### Étape 2 : Remplir les champs

```
URL Odoo : https://monentreprise.odoo.com
Base de données : monentreprise
Nom d'utilisateur : admin@monentreprise.com
Mot de passe : VotreMotDePasse123
```

### Étape 3 : Tester la connexion

Avant d'enregistrer, cliquez sur **"🔌 Tester la connexion"** pour vérifier que tout fonctionne.

Si le test réussit, vous verrez un message de confirmation. Sinon, vérifiez vos paramètres.

### Étape 4 : Enregistrer

Une fois le test réussi, cliquez sur **"✓ Enregistrer et continuer"**.

## Résolution des problèmes courants

### ❌ "Impossible de se connecter à l'instance Odoo"

**Causes possibles :**
1. L'URL est incorrecte
   - Vérifiez qu'elle commence par `https://`
   - Vérifiez qu'il n'y a pas de `/` à la fin
   - Testez l'URL dans votre navigateur

2. Pas de connexion Internet
   - Vérifiez votre connexion WiFi/données mobiles

### ❌ "Identifiants incorrects ou base de données introuvable"

**Causes possibles :**
1. Email ou mot de passe incorrect
   - Vérifiez vos identifiants
   - Essayez de vous connecter via le navigateur avec ces mêmes identifiants

2. Nom de base de données incorrect
   - Vérifiez le nom de la base de données (voir section ci-dessus)

### ❌ "Erreur CORS"

**Cause :**
Votre instance Odoo bloque les connexions depuis l'application mobile.

**Solution :**
Pour Odoo Online, cela ne devrait normalement pas arriver. Si c'est le cas :
1. Contactez le support Odoo
2. Vérifiez que votre abonnement Odoo est actif

### ❌ "Erreur réseau"

**Causes possibles :**
1. Connexion Internet instable
   - Vérifiez votre connexion
   - Essayez de passer du WiFi aux données mobiles (ou vice versa)

2. L'instance Odoo est temporairement indisponible
   - Vérifiez si vous pouvez accéder à Odoo via votre navigateur
   - Réessayez dans quelques minutes

## Droits d'accès requis

Pour utiliser l'application, votre utilisateur Odoo doit avoir au minimum :

- **Droits de lecture** sur les modèles que vous souhaitez interroger
- **Accès API** activé (par défaut sur Odoo Online)

Si vous ne pouvez pas voir certaines données dans l'application alors qu'elles existent dans Odoo, c'est probablement un problème de droits d'accès. Contactez votre administrateur Odoo.

## Sécurité

### Où sont stockées mes informations ?

Vos informations de connexion (URL, base de données, email, mot de passe) sont stockées **localement sur votre appareil** dans un espace sécurisé via AsyncStorage.

- ✅ Elles ne sont JAMAIS envoyées à des serveurs tiers
- ✅ Elles sont utilisées uniquement pour communiquer avec VOTRE instance Odoo
- ✅ La communication avec Odoo se fait via HTTPS (chiffré)

### Puis-je me déconnecter ?

Oui ! Dans l'écran de chat, cliquez sur l'icône ⚙️ en haut à droite, puis "Réinitialiser" pour effacer vos informations et revenir à l'écran de configuration.

## Modèles Odoo supportés

L'application peut interroger les modèles suivants (si vous avez les droits d'accès) :

- **Clients/Partenaires** (res.partner)
- **Commandes de vente** (sale.order)
- **Produits** (product.product)
- **Factures** (account.move)
- **Livraisons** (stock.picking)
- **Employés** (hr.employee)
- **Projets** (project.project)
- **Opportunités CRM** (crm.lead)

## Support

Si vous rencontrez des problèmes :

1. Vérifiez que vous pouvez vous connecter à Odoo via votre navigateur web
2. Testez la connexion dans l'application
3. Vérifiez les messages d'erreur dans la console (si vous êtes développeur)
4. Consultez la documentation Odoo : https://www.odoo.com/documentation

## Exemple de configuration complète

Voici un exemple complet de configuration :

```
┌─────────────────────────────────────────────────┐
│ Configuration Odoo SaaS                          │
├─────────────────────────────────────────────────┤
│ URL Odoo:                                        │
│ https://demo.odoo.com                           │
├─────────────────────────────────────────────────┤
│ Base de données:                                 │
│ demo                                             │
├─────────────────────────────────────────────────┤
│ Nom d'utilisateur:                               │
│ admin                                            │
├─────────────────────────────────────────────────┤
│ Mot de passe:                                    │
│ admin                                            │
└─────────────────────────────────────────────────┘
```

⚠️ **Note :** Ceci est un exemple avec la démo publique Odoo. Remplacez par vos propres informations.
