/*API */
getAllTeddies = () => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (
          this.readyState == XMLHttpRequest.DONE &&
          this.status >= 200 &&
          this.status < 400
        ) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        } else {
        }
      };
      request.open("GET", "http://localhost:3000/api/teddies/" + oursonId);
      request.send();
    });
  };


  async function teddies() {
    const teddies = await getAllTeddies();
    /*HTML index */
    let listeProduit = document.getElementById("listeProduit");
    /*structure HTML index */
    teddies.forEach((teddy) => {
      let produitContenant = document.createElement("section");
      let produitIllustration = document.createElement("div");
      let produitBox = document.createElement("div");
      let produitElement = document.createElement("div");
      let produitPhoto = document.createElement("img");
      let produitNom = document.createElement("h3");
      let produitPrix = document.createElement("p");
      let produitAction = document.createElement("a");
      /*class HTML index*/
      produitContenant.setAttribute("class", "produit_contenant", "col-5");
      produitIllustration.setAttribute("class", "produit_illustration");
      produitBox.setAttribute("class", "produit_box");
      produitPhoto.setAttribute("src", teddy.imageUrl);
      produitPhoto.setAttribute("alt", "Photo de l'ours en peluche");
      produitPhoto.setAttribute("class", "produit_photo");
      produitElement.setAttribute("class", "produit_element");
      produitNom.setAttribute("class", "produit_nom");
      produitPrix.setAttribute("class", "produit_prix");
      produitAction.setAttribute("href", "produit.html?id=" + teddy._id);
      produitAction.setAttribute("class", "produit_action");
      /*imbriquation HTML index*/
      listeProduit.appendChild(produitContenant);
      produitContenant.appendChild(produitIllustration);
      produitIllustration.appendChild(produitPhoto);
      produitBox.appendChild(produitElement);
      produitElement.appendChild(produitNom);
      produitElement.appendChild(produitPrix);
      produitBox.appendChild(produitAction);
      produitContenant.appendChild(produitBox)
      /* Contenu HTML index*/
      produitNom.textContent = teddy.name;
      produitPrix.textContent = teddy.price / 100 + " €";
      produitAction.textContent = "En savoir plus";
    });
  }
  let oursonId = "";
  async function detailTeddies() {
    oursonId = location.search.substring(4);
    const detailTeddies = await getAllTeddies();
    /*HTML produit */
    let detailProduit = document.getElementById("detailProduit");
    /* structure HTML  produit*/
    let detailContenant = document.createElement("section");
    let detailNom = document.createElement("h3");
    let detailIllustration = document.createElement("div");
    let detailElement = document.createElement("div");
    let detailPhoto = document.createElement("img");
    let detailDescription = document.createElement("p");
    let detailInformation = document.createElement("div");
    let detailPrix = document.createElement("p");
    let detailOption = document.getElementById("detailOption");
    let detailAction = document.getElementById("ajout_panier");
    /*class HTML page produit */
    detailContenant.setAttribute("class", "detail_contenant");
    detailIllustration.setAttribute("class", "detail_illustration");
    detailPhoto.setAttribute("src", detailTeddies.imageUrl);
    detailPhoto.setAttribute("alt", "Photo de " + detailTeddies.name);
    detailElement.setAttribute("class", "detail_element");
    detailPhoto.setAttribute("class", "detail_photo");
    detailNom.setAttribute("class", "detail_nom");
    detailDescription.setAttribute("class", "detail_description");
    detailInformation.setAttribute("class", "detail_information");
    detailPrix.setAttribute("class", "detail_prix");
    /* imbriquation HTML produit*/
    detailProduit.appendChild(detailContenant);
    detailContenant.appendChild(detailNom);
    detailContenant.appendChild(detailIllustration);
    detailIllustration.appendChild(detailPhoto);
    detailIllustration.appendChild(detailElement);
    detailElement.appendChild(detailDescription);
    detailContenant.appendChild(detailInformation);
    detailElement.appendChild(detailPrix);
    detailInformation.appendChild(detailOption);
    detailInformation.appendChild(detailAction);
    /* Contenu HTML produit */
    detailNom.textContent = detailTeddies.name;
    detailDescription.textContent = detailTeddies.description;
    detailPrix.textContent = detailTeddies.price / 100 + " €";

    console.log(detailTeddies.name)
    console.log(detailTeddies.description)
    console.log(detailTeddies.price / 100 + " €")


    detailTeddies.colors.forEach((teddy) => {
      let choixOption = document.createElement("option");
      document
        .getElementById("choix_option")
        .appendChild(choixOption).innerHTML = teddy;
    });
  }

  //-----PANIER----------//

//Panier user
let panier = JSON.parse(localStorage.getItem("panier"));

//Affichage nb article panier
function nombreIndexPanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = " ("+panier.length+")";
}
//initialisation panier

if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

//Ajout article

ajoutPanier = () => {
  let acheter = document.getElementById("ajout_panier");
  acheter.addEventListener("click", async function () {
    const ajout = await getAllTeddies();
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    alert("Cet article a été ajouté dans votre panier");
    location.reload();
  });
};

//------Page Panier-------

panierCreation = () => {
  if (panier.length > 0) {
    document.getElementById("panierVide").remove();

    let recapPanier = document.getElementById("panier-recap");
    //structure tableau
    let recap = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let recapPhoto = document.createElement("th");
    let recapNom = document.createElement("th");
    let recapPrixUnitaire = document.createElement("th");
    let recapRemove = document.createElement("th");
    let ligneTotal = document.createElement("tr");
    let colonneTotal = document.createElement("th");
    let recapPrixPaye = document.createElement("td");

    


    //structure
    recapPanier.appendChild(recap);
    recap.appendChild(ligneTableau);
    ligneTableau.appendChild(recapPhoto);
    ligneTableau.appendChild(recapNom);
    ligneTableau.appendChild(recapPrixUnitaire);
    ligneTableau.appendChild(recapRemove);

    //contenu des entetes
    recapPhoto.textContent = "Article";
    recapNom.textContent = "Nom";
    recapPrixUnitaire.textContent = "Prix";
    recapRemove.textContent = "Annuler ?";


 //Boucle FOR pour affichage des articles dans le panier
     
    for (let i = 0; i<panier.length; i++) {
    
      //ligne tableau

      let ligneArticle = document.createElement("tr");
      let photoTd = document.createElement("td");
      let photoArticle = document.createElement("img");
      let nomArticle = document.createElement("td");
      let prixUnitArticle = document.createElement("td");
      let supprimerArticle = document.createElement("td");
      let removeArticle = document.createElement("i");

      //Attribu
      ligneArticle.setAttribute("id", "article" + [i]);
      photoTd.setAttribute("class", "panier_tdphoto")
      photoArticle.setAttribute("class", "photo_article");
      photoArticle.setAttribute("src", panier[i].imageUrl);
      photoArticle.setAttribute("alt", "Photo de l'article commandé");
      removeArticle.setAttribute("id", "remove" + [i]);
      nomArticle.setAttribute("class", "panier_nom")
      prixUnitArticle.setAttribute("class", "panier_prix")
      supprimerArticle.setAttribute("class", "panier_suprimer")
      removeArticle.setAttribute("class", "fas fa-times-circle fa-1x");
      removeArticle.setAttribute("title", "Supprimer article ?");
      recap.setAttribute("class", "panier_table col-sm-9 col-lg-12")
      console.log(i);


//Supprimer un produit
   removeArticle.addEventListener("click", (event) => {this.annulerArticle(i);})

      //structure HTML
      recap.appendChild(ligneArticle);
      photoTd.appendChild(photoArticle);
      ligneArticle.appendChild(photoTd);
      ligneArticle.appendChild(nomArticle);
      ligneArticle.appendChild(prixUnitArticle);
      ligneArticle.appendChild(supprimerArticle);
      supprimerArticle.appendChild(removeArticle);

      //Contenu de chaque ligne

      nomArticle.textContent = panier[i].name;
      prixUnitArticle.textContent = panier[i].price / 100 + " €";
      console.log(panier[i].name);

    };


    //ligne Total
    recap.appendChild(ligneTotal);
    ligneTotal.appendChild(colonneTotal);
    ligneTotal.setAttribute("id", "ligneSomme");
    colonneTotal.textContent = "Total à payer";
    ligneTotal.appendChild(recapPrixPaye);

    recapPrixPaye.setAttribute("id", "sommeTotal");
    recapPrixPaye.setAttribute("colspan", "4");
    colonneTotal.setAttribute("id", "colonneTotal");
    colonneTotal.setAttribute("colspan", "2");

    //Calcule du total
    let sommeTotal = 0;
    panier.forEach((panier) => {
      sommeTotal += panier.price / 100;
    });

    //Affichage du total
    console.log(sommeTotal);
    document.getElementById("sommeTotal").textContent = sommeTotal + " €";
  }
};

annulerArticle = (i) => {
  panier.splice(i, 1);
   localStorage.clear();
   // Maj du panier
   localStorage.setItem("panier", JSON.stringify(panier));
   //Maj page
   window.location.reload();
 };

// verification message erreure
formValidation = () =>{

  let bouton = document.getElementById("bouton");
  
  
  let checkNumber = /^[0-9]+$/;
  let checkSpecial = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]*$/;
  let checkLetter = /^[A-Za-z-]+$/;
  
  let checked = "";
   // teste nom
   let nom = document.getElementById("nom").value;
   if (checkLetter.test(nom) == false || nom.length < 3){
     checked = "Veuillez saisir un nom valide"
   }
   // teste prenom
   let prenom = document.getElementById("prenom").value;
   if (checkLetter.test(prenom) == false || prenom.length < 3){
     checked = checked + "\n" +  "Veuillez saisir un prenom valide"
   }
   // teste email
   let email = document.getElementById("email").value;
   if (checkMail.test(email) == false){
     checked = checked + "\n" +  "Veuillez saisir un email valide"
   }
   // teste adresse
   let adresse = document.getElementById("adresse").value;
   if (checkSpecial.test(adresse) == true  || adresse.length < 5){
     checked = checked + "\n" +  "Veuillez saisir une adresse valide"
   }
   // teste ville
   let ville = document.getElementById("ville").value;
   if (checkLetter.test(ville) == false || ville.length < 3){
     checked = checked + "\n" +  "Veuillez saisir une ville valide"
   }
   // teste code postale
   let cp = document.getElementById("cp").value;
   if (checkNumber.test(cp) == false || cp.length != 5){
     checked = checked + "\n" +  "Veuillez saisir un code postale valide"
   }
  
  console.log(checked)
  
   if(checked != ""){
     alert(checked);
   }else{
      contact = {
      lastName: nom,
      firstName: prenom,
      email: email,
      address: adresse,
      city: ville,
      ZipCode: cp,
      Gift: gift,
      Information: information,
    }
    return contact;
   }
  }
basketValidation = () => {
  //Vérifier qu'il y ai au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("panier"));
  //Si le panier est vide ou null
  if  (etatPanier.length < 1 || etatPanier == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier n'est pas vide");
    return true;
  }
};
/*Envoi à l'API */
//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];
let url = "http://localhost:3000/api/teddies/order";

const envoiFormulaire = (sendForm, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "./confirmation.html";
        resolve(JSON.parse(this.responseText));
        console.log(sendForm);
      } else {
        console.log("ERROR")
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(sendForm);
    console.log(sendForm);
  });
};


confirmCommande = () => {
  let commander = document.getElementById("panier_form");
  commander.addEventListener("submit", (event) => {
    event.preventDefault()
    //Si le panier n'est pas vide et que le formulaire est valie => Construction du tableau products envoyé à l'API
    if (basketValidation() == true && formValidation() != null) {
      console.log("L'envoi peut etre fait");
      panier.forEach((article) => {
        products.push(article._id);
      });
      console.log("Ce tableau sera envoyé à l'API : " + products);

      //Création de l'objet à envoyer
      let commande = {
        contact,
        products,
      };

      let sendForm = JSON.stringify(commande);
      envoiFormulaire(sendForm, url);
      console.log(commande);

      //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
      contact = {};
      products = [];
      localStorage.clear();
    } else {
      console.log("ERROR");
    }
  });
};


// Confirmation de commande

retourOrder = () => {
  if (sessionStorage.getItem("order") != null) {
    let order = JSON.parse(sessionStorage.getItem("order"));
    document.getElementById("nameDetail").innerHTML = " " +  order.contact.lastName + " " + order.contact.firstName;
    document.getElementById("numberDetail").innerHTML = " " + order.orderId;
    document.getElementById("mailDetail").innerHTML = order.contact.email;
    document.getElementById("adressDetail").innerHTML = order.contact.address;
    document.getElementById("cityDetail").innerHTML = order.contact.ZipCode + " " + order.contact.city;
    console.log(order);
    sessionStorage.removeItem("order");
  }
  //Redirection vers l'accueil
  else {
    alert("Merci pour vote commande. A bientôt");
    window.location = "./index.html";
  }
};

confirmRecap = () =>{

//tableu recap commandeconfirmRecap = () => {
  //Création de la structure du tableau récapitulatif
  let recapConfirm = document.createElement("table");
  let ligneConfirm = document.createElement("tr");
  let confirmPhoto = document.createElement("th");
  let confirmNom = document.createElement("th");
  let confirmPrixUnitaire = document.createElement("th");
  let ligneConfirmTotal = document.createElement("tr");
  let colonneConfirmTotal = document.createElement("th");
  let confirmPrixPaye = document.createElement("td");

  //Placement de la structure dans la page
  let confirmPanier = document.getElementById("tableau_confirmation");
  confirmPanier.appendChild(recapConfirm);
  recapConfirm.appendChild(ligneConfirm);
  ligneConfirm.appendChild(confirmPhoto);
  ligneConfirm.appendChild(confirmNom);
  ligneConfirm.appendChild(confirmPrixUnitaire);

  //Class
  confirmNom.setAttribute("class", "colonne_nom")
  confirmPrixUnitaire.setAttribute("class", "colonne_prix")

  //contenu des entetes
  confirmPhoto.textContent = "Article";
  confirmNom.textContent = "Nom";
  confirmPrixUnitaire.textContent = "Prix";

  //Incrémentation de l'id des lignes pour chaque produit
  let i = 0;
  let order = JSON.parse(sessionStorage.getItem("order"));

  order.products.forEach((orderArticle) => {
    //Création de la ligne
    let ligneConfirmArticle = document.createElement("tr");
    let photoConfirmArticle = document.createElement("img");
    let nomConfirmArticle = document.createElement("td");
    let prixUnitConfirmArticle = document.createElement("td");

    //Attribution des class pour le css
    ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
    photoConfirmArticle.setAttribute("class", "photo_article");
    photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
    photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");
    recapConfirm.setAttribute("class", "panier_table col-sm-9 col-lg-12");
    nomConfirmArticle.setAttribute("class", "article-confirmation");
    prixUnitConfirmArticle.setAttribute("class", "article-confirmation");

    //Insertion dans le HTML
    recapConfirm.appendChild(ligneConfirmArticle);
    ligneConfirmArticle.appendChild(photoConfirmArticle);
    ligneConfirmArticle.appendChild(nomConfirmArticle);
    ligneConfirmArticle.appendChild(prixUnitConfirmArticle);

    //Contenu des lignes

    nomConfirmArticle.textContent = orderArticle.name;
    prixUnitConfirmArticle.textContent = orderArticle.price / 100 + " €";
  });

  //Dernière ligne du tableau : Total
  recapConfirm.appendChild(ligneConfirmTotal);
  ligneConfirmTotal.appendChild(colonneConfirmTotal);
  ligneConfirmTotal.setAttribute("id", "ligneSomme");
  colonneConfirmTotal.textContent = "Total payé";
  ligneConfirmTotal.appendChild(confirmPrixPaye);

  confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");
  confirmPrixPaye.setAttribute("colspan", "4");
  colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
  colonneConfirmTotal.setAttribute("colspan", "2");
  colonneConfirmTotal.setAttribute("class", "confirm_total")
  //Calcule de l'addition total
  let sommeConfirmTotal = 0;
  order.products.forEach((orderArticle) => {
    sommeConfirmTotal += orderArticle.price / 100;
  });

  //Affichage du prix total à payer dans l'addition
  console.log(sommeConfirmTotal);
  document.getElementById("sommeConfirmTotal").textContent = sommeConfirmTotal + " €";


}