




// Les constantes
const displayStore = document.getElementById("displayCameraStore");
const validation = document.getElementById("validate");
const prixTotalCommande = document.getElementById("totalPrice");



// Les fonctions
// pour récuperer les datas dans localStorage
function getBackCamera() {
    let cameraStore = JSON.parse(localStorage.getItem("camInCart"));
    if (cameraStore === null || cameraStore === "undefined") {
        cameraStore = [];
    }
    return cameraStore;
}
var cameraStore = getBackCamera();



/* function displayProductFromCart() {
    // si le panier est vide :
    if (cameraStore.length === 0 || cameraStore === null) {
        validation.style.display = " none";
        let panierVide = document.getElementById("empty-cart")
        panierVide.classList.remove("d-none")

        // s'il y a des produits dans le panier : 
    } else {
        const displayCamera = () => {
            const camerasStore = cameraStore.map((cam, index) => {
                return displayCart(cam, index);
            });
            displayStore.innerHTML = " ";
            displayStore.append(...camerasStore);
        };



    }
} */



function emptyCarts() {
    // si le panier est vide :
        validation.style.display = " none";
        let emptyCart = document.getElementById("empty-cart")
        emptyCart.classList.remove("d-none")

}




function test (cameraStore){
    cameraStore.forEach( product  => {
        setImageCart(container, product.camImage);
        setNameCart(container, product.camName);
        setLensesCart(container, product.camLenses);
        setQtyCart(container, product.camQuantity);
        setPriceCart(container, product.camPrice);
        setTotalCart(container, product.totalPrice);
    })};



// Création de l'élément de présentation de produit dans le panier
// MENTOR
function setGenerique(container, camElement, selector) {
    let element = container.querySelector(selector);
    if( selector.includes("image") ){
        element.src = camElement;
        element.alt = ss
    } else {
        element.innerHTML = camElement;
    }
    console.log(element);
}

// UTILISATION
setGenerique( container, cam.camImage, '.camera-image' )
setGenerique( container, cam.camName, '.camera-image' )

// MENTOR FIN

function setImageCart(container, cam) {
    let image = container.querySelector('.camera-image');
    image.src = cam.camImage;
    console.log(image);
}

function setNameCart(container, cam) {
    let name = container.querySelector('.camera-name');
    name.innerHTML = cam.camName;
    console.log(name);
}

function setLensesCart(container, cam) {
    let lenses = container.querySelector('.camera-lenses');
    lenses.innerHTML = cam.camLenses;
    console.log(lenses);
}

function setQtyCart(container, cam) {
    let quantity = container.querySelector('.camera-quantity');
    quantity.innerHTML = cam.camQuantity;
    console.log(quantity);
}

function setPriceCart(container, cam) {
    let price = container.querySelector('.camera-price');
    price.innerHTML = cam.camPrice;
    console.log(price);
}

function setTotalCart(container, cam) {
    let totalPriceCam = container.querySelector('.camera-totalPrice');
    totalPriceCam.innerHTML = cam.totalPrice;
    console.log(totalPriceCam);
}

function displayCart(cam, index) {
    let cameraElement = document.querySelector('.container-cart');
    let container = cameraElement.cloneNode(true);
    let clone = document.getElementById("clone-template");


    


    if(cameraStore.length === 0 || cameraStore === null) {
        return emptyCarts()
    } else {
        
    test(cameraStore)
  
    container.classList.remove('d-none')
    clone.append(container)
            

    const btnDelete = container.querySelector('.deleteBtn');
    btnDelete.addEventListener('click', () => {
        deleteCamera(index);
    });
    return container;
    
    }


    // appel des functions de chaques elements  
    /* setImageCart(container, cam);
    setNameCart(container, cam);
    setLensesCart(container, cam);
    setQtyCart(container, cam);
    setPriceCart(container, cam);
    setTotalCart(container, cam); */
    

    
}

   


    
    

displayCart();


/* const createCameraElement = (cam , index) =>{
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
     const btnDelete = container.querySelector('.deleteBtn');
    btnDelete.addEventListener('click', ()=>{
         deleteCamera(index);
     });
     return container;
}; */


// fonction deleteCamera qui sera appelé à l'interieur de l'évenement btnDelete pour suppr l'élément
const deleteCamera = (index) => {
    cameraStore.splice(index, 1);
    localStorage.setItem("camInCart", JSON.stringify(cameraStore))
    JSON.parse(localStorage.getItem("camInCart"));
    //displayCamera();
    displayCart();
    compteurPanierPrixTotal();
}


// incrementation du calcul du prix total de la commande:
const compteurPanierPrixTotal = () => {
    let arrayComptPanier = [];
    let arrayPrixTotal = [];
    for (const camInStore of cameraStore) {
        let itemQte = camInStore.camQuantite;
        arrayComptPanier.push(itemQte);
        console.log(arrayComptPanier);
        let prix = camInStore.totalPrice;
        arrayPrixTotal.push(prix);
    }
    console.log(arrayPrixTotal);

    if (arrayComptPanier.length === 0) {
        location.assign('shop.html');
    } else {
        let prixTotal = arrayPrixTotal.reduce((accumulator, currentValue) => accumulator + currentValue);
        prixTotalCommande.innerHTML = `PRIX TOTAL: ${prixTotal}€`;
        localStorage.setItem("TotalPrice", prixTotal);
        console.log(localStorage);
    }

    compteurPanierPrixTotal();
    displayCart();
   // displayCamera();
};