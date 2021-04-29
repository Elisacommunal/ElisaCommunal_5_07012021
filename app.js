
// CONSTANTE



// FUNCTIONS
async function getData (parameter) {
    let url = "http://localhost:3000/api/cameras/" + parameter;
    let response = await fetch(url);
    return await response.json();
}

parameter = "cardProduct1";

function displayProduct(product, id_container) {
    let container = document.getElementById(id_container);

    let template = `<div class="card text-center">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                    <h2 class="card-title">${product.name}</h2>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price/100},00€</p>
                    <a href="product.html?id=${product._id}" class="btn btn-dark">Ajouter au panier</a>
                    </div>
                </div>`;

container.innerHTML += template 
}


// UTILITIES
getData("5be1ed3f1c9d44000030b061")
    .then(product => {
        console.log(product);
        displayProduct(product, "cardProduct1");
    })
    .catch(error => console.error(error))



    getData("5be1ef211c9d44000030b062")
    .then(data => {
        console.log(data);
        displayProduct(data, "cardProduct2");
    })
    .catch(error => console.error(error))

    

    getData("5be9bc241c9d440000a730e7")
    .then(data => {
        console.log(data);
        displayProduct(data, "cardProduct3");
    })
    .catch(error => console.error(error))



    getData("5be9c4471c9d440000a730e8")
    .then(data => {
        console.log(data);
        displayProduct(data, "cardProduct4");
    })
    .catch(error => console.error(error))


    getData("5be9c4c71c9d440000a730e9")
    .then(data => {
        console.log(data);
        displayProduct(data, "cardProduct5");
    })
    .catch(error => console.error(error))

    
/* container.innerHTML += '<div class="card" style="width: 18rem;"></div>' ;
        container.innerHTML += `<img src=${product.imageUrl} class="card-img-top" alt="${product.name}"></img>`;
        container.innerHTML += '<div class="card-body"></div>';
        container.innerHTML += '<h5 class="card-title">' + product.name +'</h5>' ;
        container.innerHTML += '<p class="card-text">' + product.description + '</p>';
        container.innerHTML += '<p class="card-text">' + product.price+ '</p>' ;
        container.innerHTML += '<a href="#" class="btn btn-primary">Go somewhere</a>';
        container.innerHTML += '</div>';
        container.innerHTML += '</div>'; */
    