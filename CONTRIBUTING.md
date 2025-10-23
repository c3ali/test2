# Guide de contribution

Merci de votre intérêt pour contribuer à Odoo Mobile Assistant !

## Comment contribuer

### Rapporter un bug

1. Vérifiez que le bug n'a pas déjà été rapporté dans les Issues
2. Ouvrez une nouvelle Issue avec :
   - Un titre descriptif
   - Les étapes pour reproduire le problème
   - Le comportement attendu vs le comportement observé
   - Votre environnement (OS, version d'Expo, etc.)

### Proposer une nouvelle fonctionnalité

1. Ouvrez une Issue pour discuter de la fonctionnalité
2. Attendez les retours avant de commencer le développement
3. Créez une Pull Request avec votre implémentation

### Soumettre une Pull Request

1. Forkez le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## Standards de code

### JavaScript/React Native

- Utilisez ES6+ syntax
- Suivez les conventions React/React Native
- Utilisez des noms de variables et fonctions descriptifs
- Commentez le code complexe

### Structure des commits

```
type: description courte

Description détaillée si nécessaire

Fixes #123
```

Types de commits :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage, point-virgules manquants, etc.
- `refactor`: Refactorisation du code
- `test`: Ajout de tests
- `chore`: Maintenance

## Développement local

### Prérequis

```bash
node --version  # v14+
npm --version   # v6+
```

### Installation

```bash
npm install
npm start
```

### Tests

Pour tester vos changements :

1. Testez sur iOS et Android si possible
2. Vérifiez que l'authentification Odoo fonctionne
3. Testez plusieurs types de requêtes
4. Vérifiez l'affichage sur différentes tailles d'écran

## Domaines d'amélioration

Voici quelques idées de contributions :

### Fonctionnalités

- [ ] Support de plus de modèles Odoo personnalisés
- [ ] Amélioration de l'analyse de langage naturel
- [ ] Support multilingue (anglais, espagnol, etc.)
- [ ] Sauvegarde de l'historique des conversations
- [ ] Export des résultats (CSV, PDF)
- [ ] Mode hors ligne avec cache
- [ ] Notifications push pour les alertes Odoo
- [ ] Support des graphiques et visualisations

### Interface

- [ ] Mode sombre
- [ ] Personnalisation des couleurs
- [ ] Animations améliorées
- [ ] Support tablette optimisé

### Technique

- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] CI/CD
- [ ] Amélioration des performances
- [ ] Gestion d'erreurs plus robuste
- [ ] Documentation technique

### Documentation

- [ ] Tutoriels vidéo
- [ ] Guide d'installation détaillé
- [ ] Documentation API
- [ ] Traductions

## Questions

Si vous avez des questions, n'hésitez pas à :

- Ouvrir une Issue
- Commenter sur une PR existante
- Contacter les mainteneurs

Merci pour votre contribution !
