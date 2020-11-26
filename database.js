//1- CREATION DES DEPENDANCES DE MODULES
var mysql = require('mysql');

// VERSION EN LIGNE HEROKU UNIQUEMENT AVEC createPool QUI STOCK DES CONNEXIONS
const dbConnexion = mysql.createPool({
    host: "eu-cdbr-west-03.cleardb.net",
    database: "heroku_63ee4254d14e96b",
    user: "b5d1857fc55a44",
    // port: 5432,
    password: "cc113c6c",
});

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