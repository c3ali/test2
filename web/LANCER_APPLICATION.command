#!/bin/bash

# Script pour Mac - Double-cliquez sur ce fichier pour lancer l'application

echo "============================================================"
echo "   🚀 Lancement d'Odoo Assistant"
echo "============================================================"
echo ""

# Se déplacer vers le dossier du script
cd "$(dirname "$0")"

# Vérifier si Python est installé
if command -v python3 &> /dev/null; then
    echo "✓ Python trouvé, lancement du serveur..."
    echo ""
    python3 LANCER_APPLICATION.py
elif command -v python &> /dev/null; then
    echo "✓ Python trouvé, lancement du serveur..."
    echo ""
    python LANCER_APPLICATION.py
else
    echo "❌ ERREUR: Python n'est pas installé"
    echo ""
    echo "Python est requis pour lancer cette application."
    echo ""
    echo "Solutions:"
    echo "1. Installez l'extension Chrome 'Allow CORS' (plus simple)"
    echo "2. OU installez Python depuis: https://www.python.org/downloads/"
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
fi
