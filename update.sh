#!/bin/zsh

# AudoraPlay Update Script

# In ein bestimmtes Git-Repository wechseln
# Pfad anpassen und Kommentar (#) entfernen:
# cd "/path/to/AudoraPlay" || exit 1

# Aktuellen Branch anzeigen
echo "Aktueller Branch:"
git branch --show-current

# Aktuelle Änderungen von Remote holen
git fetch
git pull

# Änderungen hinzufügen
git add .

# Commit mit Nachricht
git commit -m "Automatischer Commit am $(date)"

# Änderungen pushen
git push origin HEAD
