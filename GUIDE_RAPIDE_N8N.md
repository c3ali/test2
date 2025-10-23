# 🚀 Guide Rapide : Résoudre le problème CORS avec n8n

## ❌ Problème

Vous avez déployé votre application sur Netlify mais vous obtenez "**Erreur réseau**" ?

C'est normal ! **Odoo SaaS bloque les connexions externes** pour des raisons de sécurité.

## ✅ Solution : n8n comme proxy

**n8n** est un outil d'automatisation qui va servir d'intermédiaire entre votre application et Odoo.

```
Votre App (Netlify) → n8n → Odoo SaaS ✅
```

## 🎯 En 3 étapes

### Étape 1 : Configurer n8n (20 minutes)

Suivez le guide complet : **[N8N_SETUP_GUIDE.md](./N8N_SETUP_GUIDE.md)**

En résumé :
1. Créer un compte gratuit sur https://n8n.io
2. Créer 2 workflows (authentification + requêtes)
3. Récupérer les URLs des webhooks

### Étape 2 : Activer n8n dans l'application (1 minute)

1. Ouvrez votre application sur Netlify
2. Dans la configuration Odoo, **cochez** : `🔄 Utiliser n8n comme proxy`
3. Entrez l'URL de votre n8n : `https://votre-instance.n8n.cloud`
4. Remplissez vos identifiants Odoo normalement
5. Testez la connexion → **Ça marche !** ✅

### Étape 3 : C'est tout ! 🎉

Votre application fonctionne maintenant sans erreur CORS.

## 📊 Avantages

✅ **Résout définitivement le problème CORS**
✅ **Gratuit** (5000 exécutions/mois avec n8n Cloud)
✅ **Sécurisé** (communication HTTPS)
✅ **Professionnel** (infrastructure robuste)
✅ **Logs disponibles** (pour le débogage)

## ❓ Questions fréquentes

**Q : C'est vraiment gratuit ?**
R : Oui ! n8n Cloud offre 5000 exécutions gratuites par mois.

**Q : Mes données sont sécurisées ?**
R : Oui ! n8n ne fait que transmettre les requêtes. Vous pouvez aussi self-host n8n.

**Q : C'est lent ?**
R : Non ! n8n ajoute environ 50-200ms de latence, c'est imperceptible.

**Q : Je peux utiliser autre chose que n8n ?**
R : Oui, mais n8n a un connecteur Odoo intégré, c'est le plus simple.

## 🔗 Ressources

- **Guide complet n8n** : [N8N_SETUP_GUIDE.md](./N8N_SETUP_GUIDE.md)
- **Site n8n** : https://n8n.io
- **Documentation Odoo API** : https://www.odoo.com/documentation

---

**Une fois configuré, ça marche pour toujours !** Plus jamais d'erreur CORS. 🚀
