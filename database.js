//1- CREATION DES DEPENDANCES DE MODULES
var mysql = require('mysql');

//2- CONNECTION A LA BASE DE DONNEES EN LOCAL
const dbConnexion = mysql.createConnection({
    host: "localhost",
    database: "jeu_memoire",
    user: "root",
    password: "root",
    port: 8889,
    // socketPath est disponible sur la page d'acceuil du MAMP Local
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    strict: false //Permets d'entrer des valeurs NULL pour les champs date
});

// VERSION EN LIGNE HEROKU UNIQUEMENT AVEC createPool QUI STOCK DES CONNEXIONS
// const dbConnexion = mysql.createPool({
//     host: "eu-cdbr-west-03.cleardb.net",
//     database: "heroku_71544a75e5b01d8",
//     user: "b2332a087876af",
//     // port: 5432,
//     password: "b7e2b2b3",
// });

// Test de la connexion à la base
dbConnexion.query('select 1 + 1', (err, rows) => {
    if (err) {
        console.log(err.message);

    } else {
        console.log("Connexion à la base réussie ")
        
    }
});

//LISTE DES VARIABLES QUI VONT ETRE EXPORTEES
module.exports = dbConnexion