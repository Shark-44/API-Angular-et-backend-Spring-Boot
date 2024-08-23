# FrontAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# API-Angular-et-backend-Spring-Boot
-------------------------------------
# Rappel pour tester ce frontend
1- Dans un premier temps "npm install" pour les dépendances
2- Ensuite lancer avec "ng serve"
3- le backend https://github.com/Shark-44/1erbackendJava et n'oubliez pas le dump.sql fait via MySQL

-------------------------------------
Ce projet suit ce travail que j'ai commencé avec Spring Boot.  Une BDD avec en relation 3 entités. Par défaut j'avais construit un front sous React-ts.
Mais Angular est une stack que je voulais découvrir. assisté de Chatgpt 3.5 je développe cette API. Sauf que chatgpt n'est pas a jour sur Angular et j'apprends des erreurs, de mes recherches, de stack overflow. Il y a encore beaucoup de questions mais je commence a comprendre le fonctionnement d'Angular.

1) comprendre l'architecture

2) afficher la page home

3) realiser en header ma toggle-bar pour une connexion

4) rediriger sur student-list et faire mon 1er get

5) Réalisé une connexion admin avec retour backend. La toggle-bar de connexion garde l'état au changement de page.
Compris utilisation de Angular/material.

6) Dans la page student list modification pour avoir popover et l'utilisation de ng-bootstrap

7) J'ai enfin fait toutes les opérations CRUD pour la class student et pris en compte les liaisons entre entités qui sont parfois manytomany ou onetomany. Pour le fun je vais completer cette api pour les tables ecole et langage.
j'ai ajouté un dump de ma bdd dans ce projet
a) la premiere etape etait de donner la moyenne generale
b) la seconde fut d'afficher sous forme de tableau toutes les notes

8) Mise sous docker avec ma bdd sous mysql, mon backend sous sping boot. L'ensemble fonction mais une correction est necessaire. Une étape de plus ...