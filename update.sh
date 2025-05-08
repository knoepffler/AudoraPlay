#!/bin/zsh

# AudoraPlay Update Script

# In ein bestimmtes Git-Repository wechseln
# cd "/path/to/AudoraPlay" || exit 1
cd "/Users/stephan/Library/Mobile Documents/com~apple~CloudDocs/Documents/Projekte/_develop/AudoraPlay" || exit 1

# Aktuellen Branch anzeigen
echo "Aktueller Branch:"
git branch --show-current

# Änderungen hinzufügen
git add .

# Commit mit Nachricht
git commit -m "Automatischer Commit am $(date)"

# Änderungen pushen
git push origin HEAD
