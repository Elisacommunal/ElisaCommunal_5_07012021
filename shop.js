const displayStore = document.getElementById("displayCameraStore");
const validation = document.getElementById("validate");
const prixTotalCommande = document.getElementById("totalPrice")

// pour récuperer les datas dans localStorage
function getBackCamera() {
    let cameraStore  = JSON.parse(localStorage.getItem("camInCart"));
    if (cameraStore === null || cameraStore === "undefined") {
        cameraStore = [];
    }
    return cameraStore;  
}
let cameraStore = getBackCamera();
console.log(cameraStore)



//A PARTIR DE MAINTENANT
// si le panier est vide :
if (cameraStore.length === 0 || cameraStore === null && getComputedStyle(validation).display == "block") {
    validation.style.display =" none";
    let panierVide = `<h1 class="offset-1 col-10 offset-1 text-center">Votre panier est vide !</h1>
    <a href="index.html" class=" btn btn-dark"><span class="white" >Retour à l'accueil</span></a> `
    displayStore.innerHTML += panierVide;
    
// s'il y a des produits dans le panier : 
} else {
const displayCamera = () => {
    const camerasStore = cameraStore.map((cam , index) => {
        return createCameraElement(cam, index);
    });
    displayStore.innerHTML =" ";
    // j'utilise l'operateur spread pour retourner une liste et pas un tableau
    displayStore.append(...camerasStore);
};

const createCameraElement = (cam , index) =>{
    const list = document.createElement('ul');
    list.setAttribute("class","ulProduct");
    list.innerHTML = `
    <div class="container-fluid">
    <div class="col-12">
        <div>Article
            <ul class="ulProduct__ul">
                <li>${cam.camName} </li>
                <li><img src="${cam.camImage}" width= 100px height= 100px></li>
                <li>${cam.camLenses}</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-3"><span class="libelle">Quantité</span>
            <ul class="ulProduct__ul">
                <li>${cam.camQuantite}</li>
            </ul>
        </div>
        <div class="col-3"><span class="libelle">Prix unitaire</span>
            <ul class="ulProduct__ul">
                <li>${cam.camPrice}</li>
            </ul>
        </div>
        <div class="col-3"><span class="libelle">Prix total</span>
            <ul class="ulProduct__ul">
                <li>${cam.totalPrice}</li>
            </ul>
        </div>
        <div class="col-3"><span class="libelle">Supprimer</span>
            <ul class="ulProduct__ul">
                <li><a class="deleteBtn btn"><i class="far fa-trash-alt icon"></i></a></li>
            </ul>
        </div> 
    </div>
    </div>`;
   const btnDelete = list.querySelector('.deleteBtn');
   btnDelete.addEventListener('click', ()=>{
        deleteCamera(index);
    });
    return list;
};


// fonction deleteFurni qui sera appelé à l'interieur de l'évenement btnDelete
const deleteCamera = (index)=>{
    cameraStore.splice(index,1);
    localStorage.setItem("camInCart", JSON.stringify(cameraStore)) 
    JSON.parse(localStorage.getItem("camInCart"));
    displayCamera();
    compteurPanierPrixTotal();
}


// incrementation du panier et calcul du prix total de la commande:
const compteurPanierPrixTotal = () =>{
    let arrayComptPanier =[] ;
    let arrayPrixTotal =[];
    for (const camInStore of cameraStore) {
      let itemQte = camInStore.camQuantite;
      arrayComptPanier.push(itemQte); 
      console.log(arrayComptPanier);

      let prix = camInStore.totalPrice;
      arrayPrixTotal.push(prix);
    }
    console.log(arrayPrixTotal);

    if (arrayComptPanier.length === 0 ) {
        location.assign('shop.html');
    }else{
    let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue)=> accumulator+ currentValue);
    prixTotalCommande.innerHTML= `PRIX TOTAL: ${prixTotal}€`;
    localStorage.setItem("TotalPrice", prixTotal);
    console.log(localStorage);  
}}

compteurPanierPrixTotal();
displayCamera();
};