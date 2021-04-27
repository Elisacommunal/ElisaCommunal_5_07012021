

// CONSTANTE
const urlApi = "http://localhost:3000/api/cameras/";
const searchParams = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlApi + searchParams;
const cameraCard = document.querySelector("#camera-card");
console.log(urlApiId)
// FUNCTIONS



//UTILITIES
fetch(urlApiId)
    .then((response) => 
        response.json()
    .then((data) => {
        console.log(data);
        let cameraProduct = "";
            cameraProduct += `<div class="card text-center">
                             <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}">
                             <div class="card-body">
                             <h5 class="card-title">${data.name}</h5>
                             <p class="card-text">${data.description}</p>
                             <p class="card-text">${data.price /100},00€</p>
                             </div>
                             </div> `;
        
         cameraCard.innerHTML += cameraProduct;
      }))
      .catch((err) => 
      console.log("erreur :" + err)) ;
        


