// FONCTIONS PAGE INDEX

//fonction compteur
function meter() {
    let qty = parseInt(document.getElementById("qte").value);
    if (qty > 0) {
        return qty;
    } else {
        qty = 1;
        alert("Quantité non valide, 1 ajouté au panier par défault");
    }
    console.log(qty);
    return qty;
};


// fonction pour initialisé les cardProducts
function setImageProduct(container, product) {
    let image = container.querySelector('.product-image');
    image.src = product.imageUrl
}

function setNameProduct(container, product) {
    let nameCard = container.querySelector('.product-title');
    nameCard.innerHTML += product.name
}

function setDescriptProduct(container, product) {
    let descript = container.querySelector('.product-descript');
    descript.innerHTML += product.description
}

function setPriceProduct(container, product) {
    let prix = container.querySelector('.product-price');
    prix.innerHTML += product.price / 100
}

function setLinkProduct(container, product) {
    let link = container.querySelector('.product-link');
    link.href += product._id
}


// fonction pour faire la mise en page des card index.html
function displayProducts(product, id_container) {
    let containerProducts = document.getElementById(id_container);
    let baseContainer = document.querySelector('.container-products');
    let container = baseContainer.cloneNode(true);

    setImageProduct(container, product);
    setNameProduct(container, product);
    setPriceProduct(container, product);
    setDescriptProduct(container, product);
    setLinkProduct(container, product);

    container.classList.remove('d-none')
    containerProducts.append(container)
}

// fonction pour faire apparaitre les card index.html
function getAlldata(placement) {
    placement.forEach(element => {
        getData(element.id)
            .then(product => {
                displayProducts(product, element.selector)
            })
            .catch(error => console.error(error))
    });
}


// FONCTIONS PAGE PRODUCT


// fonction pour afficher les options de lentilles 
function lensesOption(product) {
    let lensesChoice = document.getElementById("choix-lentille")
    for (let i = 0; i < product.lenses.length; i++) {
        let newLensesChoice = document.createElement("option")
        newLensesChoice.innerText = product.lenses[i];
        lensesChoice.append(newLensesChoice);
        console.log(newLensesChoice);
    }
};

// fonction pour faire la mise en page de la card product.html
function displayProduct(product) {
    let containerProduct = document.getElementById('ici');
    let container = document.querySelector('.container-product');


    setImageProduct(container, product);
    setNameProduct(container, product);
    setPriceProduct(container, product);
    setDescriptProduct(container, product);
    lensesOption(product);

    container.classList.remove('d-none');
    containerProduct.append(container);

}


// FONCTIONS PAGE PRODUCT

// fonction qui observe si le panier est vide ou non
function listenerCart() {
    // si le panier est vide :
    if (cameraStore.length === 0 || cameraStore === null) {
        validation.style.display = " none";
        let emptyCart = document.getElementById("empty-cart")
        emptyCart.classList.remove("d-none")

        // s'il y a des produits dans le panier : 
    } else {

        totalPriceCartMeter();
        displayCamera();

    };
}

// pour récuperer les datas dans localStorage
function getBackCamera() {
    let cameraStore = JSON.parse(localStorage.getItem("camInCart"));
    if (cameraStore === null || cameraStore === "undefined") {
        cameraStore = [];
    }
    return cameraStore;
}

// Création de l'élément de présentation de produit dans le panier
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

// fonction pour faire la mise en page des card shop.html
function displayCart(cam, index) {
    let cameraElement = document.querySelector('.container-cart');
    let container = cameraElement.cloneNode(true);
    let clone = document.getElementById("clone-template");
    // appel des functions de chaques elements  
    setImageCart(container, cam);
    setNameCart(container, cam);
    setLensesCart(container, cam);
    setQtyCart(container, cam);
    setPriceCart(container, cam);
    setTotalCart(container, cam);


    container.classList.remove('d-none')
    clone.append(container)

    const btnDelete = container.querySelector('.deleteBtn');
    btnDelete.addEventListener('click', () => {
        deleteCamera(index);
    });
    return container;
}

// fonction présentation du produit
function displayCamera() {
    const camerasStore = cameraStore.map((cam, index) => {
        return displayCart(cam, index);
    });
    displayStore.innerHTML = " ";
    displayStore.append(...camerasStore);
};

// fonction deleteCamera qui sera appelé à l'interieur de l'évenement btnDelete pour suppr l'élément
function deleteCamera(index) {
    cameraStore.splice(index, 1);
    localStorage.setItem("camInCart", JSON.stringify(cameraStore))
    JSON.parse(localStorage.getItem("camInCart"));
    displayCamera();
    totalPriceCartMeter();
}

// incrementation du calcul du prix total de la commande:
function totalPriceCartMeter() {
    let arrayCartMeter = [];
    let arrayTotalPrice = [];
    for (const camInStore of cameraStore) {
        let itemQty = camInStore.camQuantity;
        arrayCartMeter.push(itemQty);
        console.log(arrayCartMeter);
        let priceProduct = camInStore.totalPrice;
        arrayTotalPrice.push(priceProduct);
    }
    console.log(arrayTotalPrice);

    if (arrayCartMeter.length === 0) {
        location.assign('shop.html');
    } else {
        let totalPriceCart = arrayTotalPrice.reduce((accumulator, currentValue) => accumulator + currentValue);
        totalPriceOrder.innerHTML = `PRIX TOTAL: ${totalPriceCart}€`;
        localStorage.setItem("TotalPrice", totalPriceCart);
        console.log(localStorage);
    }
}