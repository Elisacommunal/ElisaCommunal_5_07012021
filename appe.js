
const cameras = "http://localhost:3000/api/cameras";

async function getData (url) {
    let response = await fetch(url);
    return await response.json();
}

getData(cameras + "/5be1ed3f1c9d44000030b061")
    .then(data => {
        console.log(data);
        displayProduct(data);
    })
    .catch(error => console.error(error))


    function displayProduct(product) {
        let container = document.getElementById("leID");

       /* container.innerHTML += '<div class="card" style="width: 18rem;"></div>' ;
        container.innerHTML += `<img src=${product.imageUrl} class="card-img-top" alt="${product.name}"></img>`;
        container.innerHTML += '<div class="card-body"></div>';
        container.innerHTML += '<h5 class="card-title">' + product.name +'</h5>' ;
        container.innerHTML += '<p class="card-text">' + product.description + '</p>';
        container.innerHTML += '<p class="card-text">' + product.price+ '</p>' ;
        container.innerHTML += '<a href="#" class="btn btn-primary">Go somewhere</a>';
        container.innerHTML += '</div>';
        container.innerHTML += '</div>'; */

       let template = `<div class="card" style="width: 18rem;">
                        <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.price}€</p>
                        <a href="#" class="btn btn-primary">Ajouter au panier</a>
                        </div>
                    </div>`;

    container.innerHTML += template 
    }

    