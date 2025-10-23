@echo off
echo ============================================================
echo    Lancement d'Odoo Assistant
echo ============================================================
echo.
echo Demarrage du serveur...
echo.

REM Essayer Python 3 d'abord
python --version >nul 2>&1
if %errorlevel% == 0 (
    python LANCER_APPLICATION.py
    goto :end
)

REM Essayer py (Python Launcher pour Windows)
py --version >nul 2>&1
if %errorlevel% == 0 (
    py LANCER_APPLICATION.py
    goto :end
)

REM Si Python n'est pas installé
echo.
echo ============================================================
echo ERREUR: Python n'est pas installe
echo ============================================================
echo.
echo Python est requis pour lancer cette application.
echo.
echo Solutions:
echo 1. Installez l'extension Chrome "Allow CORS" (plus simple)
echo 2. OU installez Python depuis: https://www.python.org/downloads/
echo.
echo Appuyez sur une touche pour ouvrir le guide d'installation...
pause >nul
start https://www.python.org/downloads/
echo.

:end
pause
