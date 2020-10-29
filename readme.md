# P7_groupomania

Repository de l'application reseau social groupomania
OpenClassrooms, projet 7

## Choix du sujet

Sujet choisi : 9GAG - Partage d'images et GIFS

## Préparation et configuration :
Commandes à executer depuis la racine

### Dependances

        cd ./backend && npm install
        cd ./frontend && npm install

### Configuration Backend

        mkdir ./backend/config
        cp ./soutenance/example.config.js ./backend/config/config.js

### MySQL

A executer dans MySQL

        CREATE DATABASE groupomania;
        CREATE USER 'groupomania'@'localhost' IDENTIFIED BY 'gr0up0m4n14';
        GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania'@'localhost';

A executer dans le bash, avec les droits adaptés.

        mysql groupomania < ./soutenance/example_db.sql

### Lancement du back-end et frontend

        cd ./backend && nodemon
        cd ./frontend && npm run serve

### Login administrateur

Un compte administrateur est créé pour la demo : email 'admin@groupomania.com', pass 'admin'