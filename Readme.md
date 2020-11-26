# Jeu de mémoire
Création d'un jeu de mémoire dont les règles sont les suivantes :
- Au commencement du jeu, des cartes sont disposées face cachée à l'écran.
- Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner une nouvelle paire de cartes.
- Une compteur de temps, avec une barre de progression, s’affiche en dessous du plateau.
- Le joueur dispose de 5 essais.
- Chaque temps de partie effectuée doit être sauvegardée en base de données. Avant le début du jeu, les meilleurs temps s’affichent à l’écran.

## Auteur
Code développé par ([@Yass](https://github.com/YassineGharbi))

## Langages utilisés
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

## Framework
- Node.js Express

## Base de données
- MySQL

## Déploiement
- Héroku : https://jeu-memoire-ygharbi.herokuapp.com/

##  Mode d'emploi pour déploiement sur Heroku

- Clonez le dossier projet sur votre ordinateur
- Se positionner via votre terminal sur le dossier projet en local
- "Pushez" le dossier projet sur votre github
- Créez un compte Heroku et installer le client sur votre ordinateur
- Créez une nouvelle application sur votre espace Heroku en la liant au projet "pushé" sur github (n'oubliez pas de cocher auto-déploiement)
- Ajoutez l'Add-on "ClearDB MySQL" à votre application Heroku
- Dans votre terminal, entrez la commande "Heroku Login" et suivez les instructions.
- Entrez la commande suivante : "heroku config --app=nomDeVotreApp | grep CLEARDB_DATABASE_URL "
- Notez les informations de connexion qui vous seront données
- Entrez ces informations dans le fichier "database.js" du dossier projet
- "Pushez" à nouveau le projet
- Téléchargez et installez "MySQL Workbench" (https://www.mysql.com/fr/products/workbench/)
- Entrez les informations de connexion à la base de données ClearDB MySQL récupérées précédemment
- Créer la table SCORE en entrant ces lignes de code SQL :
        CREATE TABLE `SCORE` (
        `id_score` int(11) NOT NULL,
        `temps` int(11) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

        --
        -- Dumping data for table `SCORE`
        --

        INSERT INTO `SCORE` (`id_score`, `temps`) VALUES
        (7, 330);

        --
        -- Indexes for dumped tables
        --

        --
        -- Indexes for table `SCORE`
        --
        ALTER TABLE `SCORE`
        ADD PRIMARY KEY (`id_score`);

        --
        -- AUTO_INCREMENT for dumped tables
        --

        --
        -- AUTO_INCREMENT for table `SCORE`
        --
        ALTER TABLE `SCORE`
        MODIFY `id_score` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
