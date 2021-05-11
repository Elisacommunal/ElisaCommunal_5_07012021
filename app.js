
// CONSTANTE
let placement = [
    {
        id : "5be1ed3f1c9d44000030b061",
        selector : 'cardProduct1'
    },
    {
        id : "5be1ef211c9d44000030b062",
        selector : 'cardProduct2'
    },
    {
        id : "5be9bc241c9d440000a730e7",
        selector : 'cardProduct3'
    },
    {
        id : "5be9c4471c9d440000a730e8",
        selector : 'cardProduct4'
    },
    {
        id : "5be9c4c71c9d440000a730e9",
        selector : 'cardProduct5'
    }
]

// FUNCTIONS
async function getData (parameter) {
    let url = "http://localhost:3000/api/cameras/" + parameter;
    let response = await fetch(url);
    return await response.json();
}




// UTILITIES
getAlldata(placement)
