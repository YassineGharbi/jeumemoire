// Affichage du meilleur score
function getScore() {
    // Prépare mon Fetch qui va récupérer le meilleur temps dans la BDD avec la méthode GET
    fetch(`/read/bestscore`)
        //RESPONSE
        .then((response) => {
            // console.log(responseEtatFetch.text());
            return response.json();
        })
        //DATA
        .then((data) => {
            data.forEach(temps => {
                let transfoString = temps.meilleur_temps.toString()
                // console.log(transfoString);
                // Je cheat pour afficher le meilleur temps
                if (transfoString.length >= 4) {
                    document.getElementById("meilleur-temps").innerHTML = `0${transfoString.substring(0,2)}:${transfoString.substring(2, recupFruit.length)}`
                } else if (transfoString.length == 3) {
                    document.getElementById("meilleur-temps").innerHTML = `0${transfoString.substring(0,1)}:${transfoString.substring(1, recupFruit.length)}`
                } else {
                    document.getElementById("meilleur-temps").innerHTML = `00:${transfoString}`
                }
            })
        })
        //RENVOYER ERREUR SI LE FICHIER DU FETCH N'EST PAS TROUVE
        //
        .catch((error) => {
            console.log(error);
        });
}
getScore()

// Permettre au bouton commencer de lancer la fonction "commencerJeu"
boutonLancement = document.getElementById("commencer-jeu")
boutonArret = document.getElementById("arreter-jeu")
document.getElementById("arreter-jeu").disabled = true

boutonLancement.addEventListener('click', commencerJeu)
boutonArret.addEventListener('click', arreterChrono)
var minuteur

// Récupération de tous les div contenant une image
var divCarte = document.getElementsByClassName("carte");
// Au chargment de la page les cases grises s'afficheront
dispositionFruit()

// ------------------------------------------ //
// Fonction qui va permettre de lancer le jeu //
// ------------------------------------------ //
// Se lancera à chaque chaque fois que l'utilsateur clique sur commencer
function commencerJeu() {
    getScore()
    document.getElementById("commencer-jeu").disabled = true;
    document.getElementById("arreter-jeu").disabled = false
    demarrerChrono()
    // Lancement de la fonction mettant en place les fruits
    dispositionFruit()

    // Appliquer un event listner à toutes les div qui ont la classe carte
    for (var i = 0; i < divCarte.length; i++) {
        divCarte[i].addEventListener('click', apparitionFruit);
        // Permet de réinistialiser les cases en cours de jeu
        divCarte[i].style.backgroundColor = "#aaaaaa"
    }

    // ---------------------------------------------- //
    // Variables permettant de gérer les comparaisons //
    // ---------------------------------------------- //
    // Variables qui récupèrent les target des deux cliques (les div cliquées)
    var caseUne;
    var caseDeux;

    // Variables qui récupèrent les dataset de chacune des cases cliquées
    var valeurCaseUne;
    var valeurCaseDeux;

    // Variables qui récupèrent les valeurs des images
    var imgUne;
    var imgDeux;

    // Variable qui permet de savoir si c'est le premier clic ou non
    var premierClic = true;

    // Variable permettant de compter le nombre de comparaison ratée
    var echec = 0;
    var widthRouge = 0
    document.getElementById("barre-essai-rouge").style.width = `${widthRouge}%`
    // Variable permettant de compter le nombre de comparaison réussie
    var succes = 0

    // Lancement de la fonction qui fait apparaitre les cases avec les fruits
    // --------------------------------------------- //
    // Fonction permettant de faire les comparaisons //
    // --------------------------------------------- //
    // Target va permettre de récupérer des informations de l'élément cliqué
    // Le paramètre "actionEvent" fait référence à l'action qui lance la fonction (clic, etc.)
    // En genéral on nomme ce paramètre "e"
    function apparitionFruit(actionEvent) {
        // ------------------------------ //
        // ETAPE 1 : je fais mon 1er clic //
        // ------------------------------ //
        // console.log(actionEvent.target.style.backgroundColor = "blue");
        if (premierClic == true) {
            // "actionEvent.target" permet de savoir quel élement du DOM nous avons visé avec notre action (clic, etc.)
            premierClic = false
            caseUne = actionEvent.target
            imgUne = caseUne.dataset.image
            caseUne.style.background = `#ffffff`
            document.getElementById(imgUne).style.visibility = "visible"
            // Je retire pour le moment l'event Listener pour éviter de double cliquer sur la même case
            caseUne.removeEventListener('click', apparitionFruit);
            valeurCaseUne = caseUne.dataset.fruit;
        }
        // ------------------------------- //
        // ETAPE 2 : je fais mon 2ème clic //
        // ------------------------------- //
        else {
            // Je repasse "premierClic" à true pour préparer la prochaine comparaison
            premierClic = true
            caseDeux = actionEvent.target
            imgDeux = caseDeux.dataset.image
            caseDeux.style.background = `#ffffff`
            document.getElementById(imgDeux).style.visibility = "visible"
            valeurCaseDeux = caseDeux.dataset.fruit;
            // ----------------------------------------------- //
            // ETAPE 3 : je compare les valeurs des deux cases //
            // ----------------------------------------------- //
            if (valeurCaseUne == valeurCaseDeux) {
                setTimeout(function () {
                    alert("Se sont les mêmes fruits");
                    succes++;
                    console.log(succes);
                    // Arrête le jeu si toutes les cartes ont été trouvées
                    if (succes == 2) {
                        alert("Vous avez gagné !");
                        enregistrerChrono()
                        for (var i = 0; i < divCarte.length; i++) {
                            divCarte[i].removeEventListener('click', apparitionFruit);
                        }
                        // Je réactive le bouton de démarrage
                        document.getElementById("commencer-jeu").disabled = false;
                        document.getElementById("arreter-jeu").disabled = true
                    }
                }, 500);
                caseDeux.removeEventListener('click', apparitionFruit);
                caseUne.dataset.trouve = "ok";
                caseDeux.dataset.trouve = "ok";
            } else {
                setTimeout(function () {
                    // Compteur qui s'incrémente à chaque erreur jusqu'à 5
                    echec++
                    if (echec == 5) {
                        widthRouge = widthRouge + 20
                        document.getElementById("barre-essai-rouge").style.width = `${widthRouge}%`
                        alert("Vous avez perdu !")
                        arreterChrono()
                        for (var i = 0; i < divCarte.length; i++) {
                            divCarte[i].removeEventListener('click', apparitionFruit);
                        }
                        // Je réactive le bouton de démarrage
                        document.getElementById("commencer-jeu").disabled = false;
                        document.getElementById("arreter-jeu").disabled = true
                    } else {
                        widthRouge = widthRouge + 20
                        alert("Se ne sont pas les mêmes fruits");
                        caseUne.style.background = "#aaaaaa";
                        document.getElementById(imgUne).style.visibility = "hidden"
                        caseDeux.style.background = "#aaaaaa";
                        document.getElementById(imgDeux).style.visibility = "hidden"
                        caseUne.addEventListener('click', apparitionFruit);
                        document.getElementById("barre-essai-rouge").style.width = `${widthRouge}%`
                    }
                }, 500);

            }
        }
    }
}

// ---------------------------------------------- //
//        Mise en place des fruits aléatoire      //
// ---------------------------------------------- //
function dispositionFruit() {
    document.getElementById("conteneur-jeu").innerHTML = ""
    // Je créé un tableau qui récupère le nom de mes images sans l'exension ".png"
    var tabFruits = ["banane01", "cerise01", "citron-vert01", "citron01", "fraise01", "framboise01", "grenade01", "mangue01", "orange01", "pasteque01", "peche01", "poire01", "pomme-rouge01", "pomme-verte01", "banane02", "cerise02", "citron-vert02", "citron02", "fraise02", "framboise02", "grenade02", "mangue02", "orange02", "pasteque02", "peche02", "poire02", "pomme-rouge02", "pomme-verte02"];
    // Tablbeau qui récupérera l'ordre des fruits mélangés
    var disposition = [];
    // Variable qui prend au hasard un fruit du tableau
    recupFruit = tabFruits[Math.floor(Math.random() * tabFruits.length)];
    while (tabFruits.length > 0) {
        // Récupération d'une position au hasard du tableau
        recupFruit = tabFruits[Math.floor(Math.random() * tabFruits.length)];
        // Ajout du fruit dans le tableau "disposition"
        disposition.push(recupFruit)
        // Suppréssion du fruit dans le tableau "tabFruits"
        tabFruits.splice(tabFruits.indexOf(recupFruit), 1);
        document.getElementById("conteneur-jeu").innerHTML += `<div class="carte" data-fruit="${recupFruit.substring(0, recupFruit.length-1)}" data-image="${recupFruit}" data-trouve="nok">
        <img src="img/${recupFruit}.png" id="${recupFruit}" alt="${recupFruit.substring(0, recupFruit.length-1)}"></div>`
    }
    console.log("disposition :", disposition);
}


// --------------------------------------------- //
// Fonction permettant de gérer le chronomètre   //
// --------------------------------------------- //
function demarrerChrono() {
    // J'attribue une date à une constante "dateDepart"
    var dateDepart = new Date().getTime();
    minuteur = setInterval(function () {
        // Je prend la date actuelle chaque seconde  
        var dateActuelle = new Date().getTime();
        // Je calcule le temps écoulé entre la dateActuelle et la dateDepart
        var tempsEcoule = dateActuelle - dateDepart
        // Conversion en secondes et minutes de la variable de "tempsEcoule"
        var minutes = Math.floor((tempsEcoule % (1000 * 60 * 60)) / (1000 * 60));
        var secondes = Math.floor((tempsEcoule % (1000 * 60)) / 1000);
        // Affichage des minutes et des secondes dans le DOM
        if (minutes < 10) {
            document.getElementById("chrono-minutes").innerHTML = `0${minutes}`;
        } else {
            document.getElementById("chrono-minutes").innerHTML = minutes;
        }

        if (secondes < 10) {
            document.getElementById("chrono-secondes").innerHTML = `0${secondes}`;
        } else {
            document.getElementById("chrono-secondes").innerHTML = secondes;
        }

    }, 1000);

}

function arreterChrono() {
    clearInterval(minuteur);
    document.getElementById("commencer-jeu").disabled = false;
    document.getElementById("arreter-jeu").disabled = true;
}

function enregistrerChrono() {
    clearInterval(minuteur);
    var minutes = document.getElementById("chrono-minutes").innerHTML
    var secondes = document.getElementById("chrono-secondes").innerHTML
    tempsEnregistre = minutes + secondes;
    tempsEnregistre = parseInt(tempsEnregistre)
    // Prépare mon Fetch qui va envoyer la valeur dans la BDD avec la méthode POST
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        // Ce qui est à gauche = nom des champs en base de données
        body: JSON.stringify({
            temps: tempsEnregistre,
        }),
    };
    fetch("/create/newtime", requestOptions)
        .then((response) => response.text())
        .then((data) => {
            alert(data);
        })
        .catch((error) => console.log(error));
}