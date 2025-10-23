#!/usr/bin/env python3
"""
Serveur simple pour lancer Odoo Assistant
Double-cliquez sur ce fichier pour lancer l'application
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Ajouter les headers CORS pour éviter les problèmes
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Changer le répertoire vers le dossier web
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)

    print("=" * 60)
    print("🚀 Lancement d'Odoo Assistant...")
    print("=" * 60)
    print(f"\n✓ Serveur démarré sur le port {PORT}")
    print(f"✓ URL: http://localhost:{PORT}")
    print("\n📱 Votre navigateur va s'ouvrir automatiquement...")
    print("\n⚠️  IMPORTANT: Ne fermez pas cette fenêtre !")
    print("   Pour arrêter le serveur, fermez cette fenêtre ou appuyez sur Ctrl+C")
    print("\n" + "=" * 60)

    # Ouvrir le navigateur automatiquement
    webbrowser.open(f'http://localhost:{PORT}/index.html')

    # Démarrer le serveur
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"\n✓ Serveur en cours d'exécution...")
        print(f"✓ Vous pouvez maintenant utiliser l'application !")
        print("\n" + "=" * 60)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Arrêt du serveur...")
            sys.exit(0)

if __name__ == "__main__":
    try:
        main()
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n❌ ERREUR: Le port {PORT} est déjà utilisé.")
            print(f"💡 Solution: Fermez l'autre application qui utilise le port {PORT}")
            print(f"   ou changez PORT = 8001 dans ce fichier.\n")
        else:
            print(f"\n❌ ERREUR: {e}\n")
        input("Appuyez sur Entrée pour fermer...")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ ERREUR: {e}\n")
        input("Appuyez sur Entrée pour fermer...")
        sys.exit(1)
