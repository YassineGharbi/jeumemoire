//1- CREATION DES DEPENDANCES DE MODULES
//MODULE DE JS.NODE
const mysql = require('mysql'); //APPEL DU MODULE MYSQL QUI PERMET D'AGIR SUR UNE BASE DE DONNEES
const express = require("express"); //APPEL DU MODULE PERMETTANT DE FAIRE LA ROUTE

//IMPORT DES MODULES CREES
let db = require('../database'); //RECUPERE LES MODULES DE LA BASE DE DONNEES
// let connection = mysql.createConnection(db); //VARIABLE QOI RECOIT LA CONNECTION A LA BASE DE DONNEES

//2- CREATION DE LA ROUTE QUI SERA EXPORTEES PAR LA SUITE DANS server.js
const app = express.Router();

// //Import de bcrypt pour encrypter ou lire les mots de passe
// const bcrypt = require('bcrypt');

// //Permet de créer des Tokens
// const jwt = require('jsonwebtoken');
// process.env.SECRET_KEY = "secret"; //On peut aussi écrire "secret" directement dans jwt.sign

//3- MISE EN PLACE DES DIFFERENTES LECTURES
//3.1- LECTURES SIMPLES
//3.1.1- TABLES SANS CLE(S) ETRANGERE(S)

//3- MISE EN PLACE DES DIFFERENTS CREATE
//3.1- TABLES SANS CLE(S) ETRANGERE(S)

//TABLE SCORE
app.post('/newtime', function (req, res) {
    let ajoutTemps = `INSERT INTO SCORE (temps) VALUES ('${req.body.temps}')`
    db.query(ajoutTemps, (err, rows, fieldsTwo) => {
        if (err) {
            console.log(err.message);
            res.send(err.message);
        } else {
            console.log(`Le temps "${req.body.temps}" a bien été ajouté`);
            res.send(`Le temps "${req.body.temps}" a bien été ajouté`);
        }
    })
})

//EXPORT DE LA ROUTE
module.exports = app