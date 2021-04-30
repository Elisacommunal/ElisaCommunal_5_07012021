// CONSTANTE
const urlApi = "http://localhost:3000/api/cameras/";
const searchParams = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlApi + searchParams;
const cameraCard = document.querySelector("#camera-card");
console.log(urlApiId)
let btn = document.querySelector(".cart") 

// FUNCTIONS
function compte() {
    let quantite = document.getElementById("qte");
    for (let nbr = 1; nbr <= 10; nbr++) {
       let newQuantite = document.createElement("option");
       newQuantite.innerText += nbr;
       quantite.append(newQuantite);
     }
  };
  // fonction pour afficher les options de lentilles
  function optionLentille(data) {
    let choixLentille = document.getElementById("choix-lentille")
    for (let i = 0; i < data.lenses.length; i++) {
      let newChoixLentille = document.createElement("option")
      newChoixLentille.innerText = data.lenses[i];
      choixLentille.append(newChoixLentille);
    }
  };

fetch(urlApiId)
    .then((response) => 
        response.json()
    .then((data) => {
        console.log(data);
        let cameraProduct = "";
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
                                        <label for="quantité">Choisissez une quantité</label>
                                        <select class="form-control" id="qte" name="quantité"></select>
                                    </div>
                                    <div class="form-group">
                                    <label>Choisissez une lentille </label>
                                        <select class="form-control" id="choix-lentille">
                                        </select>
                                    </div>
                                </form>
                            </div>`;
         cameraCard.innerHTML += cameraProduct;
         compte();
         optionLentille(data);


         btn.addEventListener("click",()=>{
            let choixCamera = {
              camName : data.name,
              camId   : data._id,
              camImage: data.imageUrl,
              camPrice: data.price/100,
              camLenses: document.getElementById("choix-lentille").value,
              camQuantite :parseInt( document.getElementById("qte").value),
              get totalPrice (){
                    return this.camPrice * this.camQuantite;
                }
            };
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
                    alert(`Vous avez bien ajouté ${choixCamera.camQuantite} - ${data.name} au panier.`);
                  } else {
                    alert("Une erreur est survenue");
                  }
        });
    })
      .catch((err) => console.log("erreur :" + err)));




        


