# Application de Réservation de Vols

Bienvenue dans l'application de réservation de vols, une application qui permet aux utilisateurs de rechercher des vols, de réserver des billets et de planifier leur itinéraire de voyage. Ce dépôt contient à la fois les composants frontend et backend de l'application.

## Table des matières

- [Pour Commencer](#pour-commencer)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
- [Frontend](#frontend)
- [Backend](#backend)
- [Docker](#docker)
- [Utilisation](#utilisation)
- [Licence](#licence)

## Pour Commencer

Ces instructions vous aideront à mettre en place et à exécuter le projet sur votre machine locale à des fins de développement et de test.

### Prérequis

Avant de commencer, assurez-vous de répondre aux exigences suivantes :

- Node.js et npm installés (pour le frontend)
- SDK .NET Core 3.1 installé (pour le backend)
- Git installé
- Docker

### Installation

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Imadmass0110/BookingFlightApp.git
   ```
   
2. Configuration du Frontend :

    ```bash
    cd bookingFlight
    npm install
    npm start
    ```

3. Configuration du Backend :
   
    ```bash
    cd bookingFlightAPI
    dotnet restore
    dotnet run
    ```

Vous avez maintenant le frontend et le backend en cours d'exécution en local.

## Frontend
Le frontend de l'application de réservation de vols est développé avec React/Next.js et Material-UI. Il permet aux utilisateurs de rechercher des vols, de voir les résultats de la recherche et de réserver des billets d'avion.

1. Fonctionnalités :
    * Formulaire de recherche de vols avec sélection de la ville de départ, de la ville d'arrivée, des dates et du nombre de passagers.
    * Résultats de recherche paginés triés par prix.
    * Formulaire de réservation avec les détails des passagers.

## Backend
Le backend de l'application de réservation de vols est développé avec .NET Core 3.1 et fournit des API REST pour la recherche de vols et la réservation.

1. Fonctionnalités :
    * API de recherche de vols.
    * API de réservation avec stockage des données dans une base de données SQLite.

## Docker
Vous pouvez également exécuter les composants de l'application de réservation de vols individuellement dans des conteneurs Docker. Nous fournissons des fichiers Dockerfile pour le frontend et le backend. Assurez-vous d'avoir Docker installé sur votre machine avant de continuer.

1. Configuration du Frontend dans Docker
     
    1.1. Construisez l'image Docker pour le frontend en exécutant les commandes suivantes :
   
         # Accédez au répertoire frontend
          cd bookingFlight
        
         # Construisez l'image Docker pour le frontend
          docker build -t flight-booking-frontend .
   
    1.2. Exécutez le conteneur Docker pour le frontend :
   
         docker run -d -p 3000:3000 --name flight-booking-frontend flight-booking-frontend
      
    Cette commande démarre le conteneur frontend en mode détaché, et vous pouvez y accéder à l'adresse http://localhost:3000 dans votre navigateur web.

2. Configuration du backend dans Docker
       
     2.1. Construisez l'image Docker pour le backend en exécutant les commandes suivantes :
     
            # Accédez au répertoire backend
            cd bookingFlightAPI
            
            # Construisez l'image Docker pour le backend
            docker build -t flight-booking-backend .
    
      2.2. Exécutez le conteneur Docker pour le backend :
         
           docker run -d -p 5000:5000 --name flight-booking-backend flight-booking-backend
        
      Cette commande démarre le conteneur backend en mode détaché, et vous pouvez accéder à l'API backend à l'adresse http://localhost:5000.

3. Arrêt et Nettoyage
  
     Pour arrêter et supprimer les conteneurs Docker et les ressources associées, utilisez les commandes suivantes :
         
            # Arrêtez et supprimez le conteneur frontend
            docker stop flight-booking-frontend
            docker rm flight-booking-frontend
            
            # Arrêtez et supprimez le conteneur backend
            docker stop flight-booking-backend
            docker rm flight-booking-backend

## Utilisation

1. Accédez à l'application frontend en ouvrant un navigateur web et en vous rendant sur http://localhost:3000.

2. Utilisez le formulaire de recherche de vols pour rechercher des vols disponibles.

3. Consultez les résultats de la recherche, sélectionnez un vol et passez à la réservation.

4. Remplissez le formulaire de réservation avec les détails des passagers.

5. Soumettez la réservation pour réserver le vol.

## Licence
Ce projet est sous licence MIT.
