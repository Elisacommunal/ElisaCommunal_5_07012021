// CONSTANTE


const urlApi = "http://localhost:3000/api/cameras/";
const searchParams = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlApi + searchParams;
const cameraCard = document.querySelector("#camera-card");
console.log(urlApiId)


// FUNCTIONS
function compte() {
    let quantite = document.getElementById("qte");
    for (let nbr = 1; nbr <= 5; nbr++) {
       let newQuantite = document.createElement("option");
       newQuantite.innerText += nbr;
       quantite.append(newQuantite);
     }
  };
  // fonction pour afficher les options de couleurs.
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
                                        <label for="quantité">Choisissez une quantité (<em> Dans la limite de 5 appareils photos </em>) </label>
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
      }))
      .catch((err) => 
      console.log("erreur :" + err)) ;


//UTILITIES

        


