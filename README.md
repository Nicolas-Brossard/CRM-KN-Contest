# CRM - Customer Relationship Management NK

Projet Open Source de gestion de relation client pour les entreprises.

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

## Table des matières

- [CRM - Customer Relationship Management NK](#crm---customer-relationship-management-nk)
  - [Table des matières](#table-des-matières)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Fonctionnalités](#fonctionnalités)
  - [Contribution](#contribution)
  - [Licence](#licence)
  - [Crédits](#crédits)

## Installation

Décrivez les étapes pour installer et configurer votre projet sur l'ordinateur d'un utilisateur.

1. Clonez le dépôt git : `git clone https://github.com/Nicolas-Brossard/CRM-KN-Contest.git`

2. Installez les dépendances : `npm install`

3. Créez deux fichier `.env` à la racine du dossier backend et frontend, pour tester le projet en local, vous pouvez simplement décommenter les lignes de code dans les fichiers `.env.example` et renommer les fichiers en `.env`

4. Utiliser Docker pour lancer le projet : `docker-compose up --build`

## Utilisation

1. Pour accéder à l'application, rendez-vous sur `http://localhost:8000/` avec votre navigateur.

2. Pour accéder à l'API, rendez-vous sur `http://localhost:3000/` avec votre navigateur.

3. Pour créer le premier compte administrateur, effectuer la commande curl suivante : `curl --request POST \
  --url http://localhost:3000/api/users/create \
  --header 'Content-Type: application/json' \
  --data '{
  "username": "admin",
  "password": "admin",
  "email": "admin@admin.fr",
  "is_admin": true
}
'`

4. Vous pouvez maintenant vous connecter avec le compte administrateur.

## Fonctionnalités

- [x] Création d'un compte
- [x] Page de connexion (sans enregistrement) avec un compte administrateur par défaut.
- [x] Liste des actions à mener (avec dates)
- [x] Statistiques de votre choix
- [x] Actions rapides pour accéder aux informations importantes
- [x] Listing et gestion des leads
- [x] Listing et gestion des prospects
- [x] Listing et gestion des clients
- [x] Gestion automatique des statuts (lead, lead mort, prospect, prospect mort, client)
- [x] Différenciation des contacts B2B et B2C
      Gestion des actions :
- [x] Ajout manuel d'actions pour les contacts (appels téléphoniques, mails, etc.)
- [x] Administration et ajout de types d'actions par l'administrateur
- [x] Commentaires longs pour chaque action
- [x] Gestion des rappels planifiés
- [x] Gestion des comptes utilisateurs (accessible uniquement par le compte administrateur).
- [x] Export et import des contacts au format .csv

Principales technologies, bibliothèques et frameworks utilisés dans votre projet :

- [Docker](https://www.docker.com/)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [Node.js](https://nodejs.org/en/)
- [React Router](https://reactrouter.com/)
- [Node-fetch](https://www.npmjs.com/package/node-fetch)
- [Express](https://expressjs.com/fr/)

## Contribution

Si vous souhaitez contribuer au projet, veuillez suivre les étapes ci-dessous :

1. Forkez le dépôt
2. Créez votre branche de fonctionnalités (`git checkout -b feature/my-feature`)
3. Committez vos modifications (`git commit -am 'Add my feature'`)
4. Poussez votre branche (`git push origin feature/my-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence [MIT](LICENSE).

## Crédits

Merci à tous les contributeurs de ce projet. N'hésitez pas à ajouter vos noms et liens vers vos profils GitHub ou autres réseaux sociaux.
