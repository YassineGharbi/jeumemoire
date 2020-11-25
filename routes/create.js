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

//TABLE STADE
app.post('/newtime', function (req, res) {
    let ajoutStade = `INSERT INTO STADE (nom_stade, adresse_stade, cp_stade, ville_stade, pays_stade) VALUES ('${req.body.nom_stade}','${req.body.adresse_stade}','${req.body.cp_stade}','${req.body.ville_stade}', '${req.body.pays_stade}')`
    db.query(ajoutStade, (err, rows, fieldsTwo) => {
        if (err) {
            console.log(err.message);
            res.send(err.message);
        } else {
            console.log(`Le stade "${req.body.nom_stade}" a bien été créée`);
            res.send(`Le stade "${req.body.nom_stade}" a bien été créée`);
        }
    })
})