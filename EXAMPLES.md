# Exemples de questions

Voici une liste de questions que vous pouvez poser à votre assistant Odoo :

## Clients et Partenaires

- "Affiche-moi les 10 derniers clients"
- "Quels sont les clients de Paris ?"
- "Liste tous les partenaires"
- "Montre-moi les contacts ajoutés cette semaine"

## Commandes de vente

- "Quelles sont les commandes de cette semaine ?"
- "Affiche les 5 dernières commandes"
- "Montre-moi les commandes en brouillon"
- "Liste les commandes confirmées"
- "Quelles sont les ventes du mois ?"

## Produits

- "Liste les produits disponibles"
- "Affiche-moi les 20 derniers produits"
- "Quels produits sont en stock ?"
- "Montre-moi tous les articles"

## Factures

- "Affiche les factures en brouillon"
- "Quelles sont les factures de cette semaine ?"
- "Liste les 10 dernières factures"
- "Montre-moi les factures confirmées"

## Livraisons

- "Affiche les livraisons d'aujourd'hui"
- "Quelles sont les expéditions en cours ?"
- "Liste les dernières livraisons"
- "Montre-moi les livraisons faites"

## Employés

- "Liste tous les employés"
- "Affiche les 10 derniers collaborateurs"
- "Quels sont les employés du service commercial ?"

## Projets

- "Affiche tous les projets"
- "Quels sont les projets en cours ?"
- "Liste les 5 derniers projets"

## Opportunités CRM

- "Affiche les opportunités"
- "Quelles sont les dernières opportunités ?"
- "Montre-moi les leads de cette semaine"
- "Liste les prospects"

## Conseils pour de meilleures recherches

1. **Soyez spécifique** : Plus votre question est précise, meilleurs seront les résultats
2. **Utilisez des filtres temporels** : "aujourd'hui", "cette semaine", "ce mois"
3. **Précisez l'état** : "en brouillon", "confirmé", "fait"
4. **Limitez les résultats** : "les 5 derniers", "les 10 premiers"
5. **Combinez les filtres** : "les 5 dernières commandes confirmées de cette semaine"

## Extension du système

Si vous souhaitez ajouter de nouveaux types de questions, vous pouvez modifier le fichier `services/OdooClient.js` pour ajouter :

- De nouveaux mots-clés pour les modèles existants
- De nouveaux modèles Odoo
- De nouveaux filtres et conditions de recherche
- De nouveaux champs à afficher dans les résultats
