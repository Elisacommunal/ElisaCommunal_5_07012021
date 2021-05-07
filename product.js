// CONSTANTE
const urlApi = "http://localhost:3000/api/cameras/";
const searchParams = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlApi + searchParams;
const cameraCard = document.querySelector("#camera-card");
//console.log(urlApiId)
//console.log(searchParams);
let btn = document.querySelector(".cart") 

let ici = document.getElementById('ici')
// FUNCTIONS

//fonction compteur

function compteur() {
  let qty = parseInt( document.getElementById("qte").value);
  if (qty > 0) {
    return qty;
  }else{
    qty = 1;
    alert("Quantité non valide, 1 ajouté au panier par défault");
  }
  console.log(qty);
  return qty;
  
}
  // fonction pour afficher les options de lentilles
  
  function optionLentille(product) {
    let choixLentille = document.getElementById("choix-lentille")
    for (let i = 0; i < product.lenses.length; i++) {
      let newChoixLentille = document.createElement("option")
      newChoixLentille.innerText = product.lenses[i];
      choixLentille.append(newChoixLentille);
      console.log(newChoixLentille);
    }
  };

  function setImageProduct(container, product){
    let image = container.querySelector( '.product-image' );
    image.src = product.imageUrl
    //console.log(image);
}

function setNameProduct(container, product){
    let nameCard = container.querySelector( '.product-title' );
    nameCard.innerHTML += product.name
    //console.log(nameCard);
}

function setDescriptProduct(container, product){
    let descript = container.querySelector('.product-descript');
    descript.innerHTML += product.description
    //console.log(descript);
}

function setPriceProduct(container, product){
    let prix = container.querySelector('.product-price');
    prix.innerHTML += product.price/100
    //console.log(prix);
}


function displayProduct( product ){
  let containerProduct = document.getElementById('ici');
  let container = document.querySelector('.container-product');
  

  setImageProduct(container, product);
  setNameProduct(container, product);
  setPriceProduct(container, product);
  setDescriptProduct(container, product);
  optionLentille(product);
  
  container.classList.remove('d-none');
  containerProduct.append(container);
  
}

fetch(urlApiId)
    .then((response) => 
        response.json()
    .then((product) => {
      displayProduct(product);
      
        //console.log(product);
        /*let cameraProduct = "";
            cameraProduct += `<div class="card text-center col-10 offset-1">
                            <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${data.name}</h5>
                                    <p class="card-text">${data.description}</p>
                                    <p class="card-text">${data.price /100},00€</p>
                                </div>
                            <div class="card-footer text-muted">
                                <form class="offset-2 col-8 offset-2">
                                    <div class="form-group">
                                    <label>Choisissez une lentille </label>
                                        <select class="form-control" id="choix-lentille">
                                        </select>
                                    </div>
                                </form>
                            </div>`;
         cameraCard.innerHTML += cameraProduct;
         optionLentille(product);*/


         btn.addEventListener("click",()=>{
            let choixCamera = {
              camName : product.name,
              camId   : product._id,
              camImage: product.imageUrl,
              camPrice: product.price/100,
              camLenses: document.getElementById("choix-lentille").value,
              camQuantity : compteur(),
              get totalPrice (){
                    return this.camPrice * this.camQuantity;
                } 
            };console.log(choixCamera);
           
            if(typeof localStorage != "undefined"){
                // on recupère la valeur dans le localStorage
              let cameraStore  = JSON.parse(localStorage.getItem("camInCart"));
                    if (cameraStore === null || cameraStore === "undefined") {
                        cameraStore = []; // on crée le tableau 
                       } 
                     if(cameraStore) {
                        cameraStore.push(choixCamera); // si le tableau existe on push le choix
                     } 
                    localStorage.setItem("camInCart", JSON.stringify(cameraStore));
                    alert(`Vous avez bien ajouté ${choixCamera.camQuantity} - ${product.name} au panier.`);
                  } else {
                    alert("Une erreur est survenue");
                  }
        });
    })
      .catch((err) => console.log("erreur :" + err)));




        


