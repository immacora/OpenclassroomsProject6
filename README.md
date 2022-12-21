# OpenclassroomsProject6
Développez une interface utilisateur pour une application web Python

Site web utilisant l'API REST OCMovies-API pour permettre aux abonnés de l’association JustStreamIt de visualiser, en temps réel, les films les mieux notés.
Le site fonctionne de façon similaire sur les navigateurs Google Chrome, Safari, Microsoft Edge et Firefox. Il est développé en HTML5, CSS3 et Vanilla JavaScript.

## Prérequis :
    - python 3.10.7
    - pip

## Installation
    - Cloner le projet
    - Installer pipenv : pip install pipenv (Windows) / brew install pipenv (MacOs)
    - Cloner la version de l'API privée OCMovies-API :
    git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
    - Installer les dépendances du projet dans le dossier de l'API: cd OCMovies-API-EN-FR / pipenv install
    - Créer la base de données : pipenv run python manage.py create_db

## Contenu
    - Un répertoire js
    - Un répertoire public
    - Un fichier index.html

## Utilisation
    - Démarrer le serveur depuis le répertoire OCMovies-API-EN-FR  : pipenv run python manage.py runserver
    - Ouvrir le fichier HTML : start index.html
