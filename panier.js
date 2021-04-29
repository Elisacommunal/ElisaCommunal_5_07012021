

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