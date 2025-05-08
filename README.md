# AudoraPlay

_AudoraPlay_ ist eine minimale Distributionslösung für Audiodateien für einen geschlossenen Nutzerkreis. Die Nutzer müssen eine Kennung eingeben, um an die für Sie bestimmte Audiodatei zu gelangen und diese abspielen zu können. Die Kennung muss den Nutzern vorher mitgeteilt werden, z.B. per E-Mail. _AudoraPlay_ ist kein eigenständiger Audio-Player. Die Audiowiedergabe erfolgt ausschließlich durch den Browser selbst. Die verfügbaren Steuerelemente und das Aussehen des Players können deshalb unterschiedlich sein.

Die Nutzerkennung entspricht dem Dateinamen der Audiodatei. Das Durchsuchen des Speicherorts für die Audiodateien ist für die Nutzer nicht möglich. 

_AudoraPlay_ nutzt einen git-basierten Workflow. 

_AudoraPlay_ benötigt keine Cookies, kein Login, keine Registrierung und unterstützt kein Tracking. 

#### Demo

https://audoraplay.knoepffler.net

## Voraussetzungen

- Github-Konto
- Netlify-Konto (o.ä.)
- installiertes Git auf lokalem Computer
- Alternativ: klassiches Webhosting

## Installation & Hosting

_AudoraPlay_ nutzt einen git-basierten Workflow. Die Dateien werden in den Ordner _Files_ abgelegt und anschließend das Shellscript 'update.sh' ausgeführt. Alternativ können natürlich die entsprechenden Git-Befehle manuell ausgeführt werden.

Die Bereitstellung der Dateien sollte über ein privates Repository erfolgen. Die Bereitstellung und den Zugriff auf die Website ermöglicht ein weiterer erforderlicher Dienst, z.B. Netlify, o.ä..

Alternativ kann auch ein klassisches Webhosting verwendet werden, dann müssen die Dateien mit einem FTP-Client verwaltet werden.

### Repository clonen

TODO

    $ git clone https....

### Eigenes privates Repo erstellen

TODO

    $ ...

### Bereitstellung über Netlify einrichten

TODO ...

### HTTPS-Verschlüsselung einrichten

TODO ...

## Nutzung von _AudoraPlay_

Die Bereitstellung der Audiodateien erfolgt über einen git-basierten Workflow. Die Audiodatei/en sind im Verzeichnis _files_ abzulegen. In der 'player.html'-Datei kann unter 'let extension = ".mp3";' das zu verwendene Dateiformat eingestellt werden. Voreingestellt ist das MP3-Format. Alternativ können auch OGG oder M4A eingestelllt werden.

**HINWEIS**
Ein Mischbetrieb mit mehreren verschiedenen Audio-Formaten ist nicht möglich. Es ist auch die Groß- und Kleinschreibung zu beachten.

**Beispiel''
Es soll ausschließlich das M4A-Format verwendet werden, dann ist die Einstellung:

    'let extension = ".m4a";

Die Dateien müssen dann entsprechend benannt werden:

- Beispiel1.m4a
- Beispiel2.m4a
- ...

Die Nutzer geben dann als Kennung lediglich 'Beispiel1' oder 'Beispiel2' ein und erhalten dann auf der 'player.html'-Seite die Audiodatei zum Abspielen.

Nach dem Hinzufügen und Ausführen des 'update.sh'-Scripts wird durch Netlify die Aktualisierung bereitgestellt. Über die URL kann nun auf die Startseite zugegriffen werden. Die Eingabe von 'Beispiel1' oder 'Beispiel2' ermöglicht die Wiedergabe der Audiodatei.

## Weitere Schritte

Es ist zu prüfen, ob eine Impressums und/oder Datenschutzerklärung vorliegt. Bei Bedarf können die enthaltenen Vorlagen angepasst und verwendet werden.

Das Styling der Website kannn durch Hinzufügen oder Anpassungen in der '/assets/styles.css' vorgenommen werden.

## Lizenz-Informationen

Die Bereitstellung von _AudoraPlay_ erfolgt auf der MIT Open Source Lizenz.

## AudoraPlay nutzt Open Source

UNPKG (css reset)
https://unpkg.com

