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
/* function setImageProduct(container, product) {
    let image = container.querySelector('.product-image');
    image.src = product.imageUrl
    image.alt = product.name
    console.log(image.alt);
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
 */
function setLinkProduct(container, product) {
    let link = container.querySelector('.product-link');
    link.href += product._id
}

function setGeneral(container, camElement, selector) {
    let element = container.querySelector(selector);
    if( selector.includes("image") ){
        element.src = camElement;
        element.alt = camElement;
    } else {
        element.innerHTML = camElement;
    }
    console.log(element);
}



// fonction pour faire la mise en page des card index.html
function displayProducts(product, id_container) {
    let containerProducts = document.getElementById(id_container);
    let baseContainer = document.querySelector('.container-products');
    let container = baseContainer.cloneNode(true);


    setGeneral( container, product.imageUrl, '.product-image' ) 
    setGeneral( container, product.name, '.product-title' ) 
    setGeneral( container, product.description, '.product-descript' ) 
    setGeneral( container, product.price / 100, '.product-price' ) 
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


    setGeneral( container, product.imageUrl, '.product-image' ) 
    setGeneral( container, product.name, '.product-title' ) 
    setGeneral( container, product.price / 100, '.product-price' ) 
    setGeneral( container, product.description, '.product-descript' ) 
    lensesOption(product);


    container.classList.remove('d-none');
    containerProduct.append(container);

}


// FONCTIONS PAGE SHOP

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
let cameraStore = getBackCamera();

// Création de l'élément de présentation de produit dans le panier

// fonction pour faire la mise en page des card shop.html
function displayCart(cam, index) {
    let cameraElement = document.querySelector('.container-cart');
    let container = cameraElement.cloneNode(true);
    let clone = document.getElementById("clone-template");

    // appel de chaques elements avec la fonction setGeneral 
    setGeneral(container, cam.camImage, '.camera-image')
    setGeneral(container, cam.camName, '.camera-name')
    setGeneral(container, cam.camLenses, '.camera-lenses')
    setGeneral(container, cam.camQuantity, '.camera-quantity')
    setGeneral(container, cam.camPrice, '.camera-price')
    setGeneral(container, cam.totalPrice, '.camera-totalPrice')
    

    container.classList.remove('d-none')
    clone.append(container)

    const btnDelete = container.querySelector('.deleteBtn');

        btnDelete.addEventListener('click', () => {
    if (window.confirm(`Voulez-vous vraiment supprimer cet article de votre panier ?`)) {
        deleteCamera(index);
        window.location.href = "shop.html";
    } else {
        window.location.href = "shop.html";
    };   
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

    let arrayTotalPrice = [];
    for (const camInStore of cameraStore) {
        let priceProduct = camInStore.totalPrice;
        arrayTotalPrice.push(priceProduct);
    }
    console.log(arrayTotalPrice);

    if (arrayTotalPrice.length === 0) {
        location.assign('shop.html');
    } else {
        let totalPriceCart = arrayTotalPrice.reduce((accumulator, currentValue) => accumulator + currentValue);
        totalPriceOrder.innerHTML = `PRIX TOTAL: ${totalPriceCart}€`;
        localStorage.setItem("totalPrice", totalPriceCart);
        console.log(localStorage);
    }
}

function formManagement(){

    let check = document.getElementById('gridCheck').value;
    let formChecked = document.getElementById('formChecked').checkValidity();


    if (formChecked == false) {

        alert('Merci de bien vouloir remplir tout les champs requis afin de valider votre commande');

    }else{

        let contact = {
            firstName: document.getElementById('inputFirstName').value,
            lastName: document.getElementById('inputLastName').value,
            address: document.getElementById('inputAddress').value,
            city: document.getElementById('inputCity').value,
            email: document.getElementById('inputEmail').value,
        };
        console.log(contact);

        let products = [];
        console.log(cameraStore);
        for (let camreraInstore of cameraStore){
            let productsId = camreraInstore.camId;
            products.push(productsId);
            console.log(products);
        }

        let order = { contact, products };
        console.log(order);

        let sendData = fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            body: JSON.stringify(order),
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        sendData.then( async response =>{
            try{
                console.log(response);
                let confirmation = await response.json();
                console.log(confirmation);
                let confirmationId = confirmation.orderId;
                console.log(confirmationId);

                let result = {
                    contact: contact,
                    confirmationId: confirmationId,
                }
                console.log(result);

                if(typeof localStorage != "undefined"){
                    localStorage.setItem("confirm", JSON.stringify(result));
                    localStorage.setItem("camInCart", JSON.stringify([]));
                
                    window.location.href = "confirmation.html";

                }else{
                    alert("LocalStorage n'est pas définit")
                }
            } catch(error) {
                console.log(error);
                alert("Une erreur est survenue, veuillez retenter plus tard")
            }
        })
    }
}


// PAGE CONFIRMATION



// Fonction qui ajoute un compte dans le panier


function cameraNumber(){
    //recuperation article dans localstorage
    const cameraStore = JSON.parse(localStorage.getItem("camInCart"));
    //récupération de l'id où va être injecté counter
    const cartCamera = document.getElementById("cart_camera");

    if (cameraStore){
        // fonction qui compte le nombre d'articles du panier
        let count = cameraStore.reduce((sum, item) => sum += item.camQuantity, 0);
        //injection du texte dans l'id
        cartCamera.innerHTML += count;
    }
};
cameraNumber();

/* let monarray = [
    "image",
    "titre",
    "prix",
]

let monarray2 = [
    "image",
    "titre",
    "prix",
]

let monarray3 = [
    "image",
    "titre",
    "prix",
]

let mesproduits = [
    monarray,
    monarray2,
    monarray3
]


setImageCart(mesprroduits[0][0])


mesProduits.foreach( monproduit => {
    setImageCart( monProduit[0] )
    setTitleCart( monProduit[0] )
} ) */
