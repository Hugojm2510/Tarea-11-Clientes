let api = 'http://localhost:8080/api/v1/product';
let container = document.querySelector("#container")
let endPointInsert = "/insert"
let endPointDelete = "/delete"


document.querySelector("#cargar").addEventListener("click", () => {
    peticion(api, (product) => {
        container.appendChild(productCard(product))
    });
});

document.querySelector("#limpiar").addEventListener("click", () => {
    container.innerHTML = ""
})

function productCard(product){
    let card = document.createElement("div")
    card.className = "product"

    let nombre = document.createElement("h2")
    nombre.innerHTML = product.productName

    let id = document.createElement("p")
    id.innerHTML = `ID de product: ${product.productId}`;

    let precio = document.createElement("p")
    precio.innerHTML = `Precio Producto: ${product.productPrice}`;

    let botonBorrar = document.createElement("button")
    botonBorrar. innerHTML = "Borrar"

    botonBorrar.onclick = async () => {
        await deleteProduct(product.productId);
    };

    card.appendChild(nombre)
    card.appendChild(id)
    card.appendChild(precio)
    card.appendChild(botonBorrar)

    return card
}

const addProduct = document.querySelector('#addProduct');

addProduct.addEventListener('submit', async (event) => {
    event.preventDefault();

    const productName = document.querySelector("#product-name").value;
    const productPrice = document.querySelector("#product-price").value;

    console.log(api + endPointInsert)

    const response = await fetch(api + endPointInsert, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            productName: productName,
            productPrice: productPrice
        }),
    });
});


async function deleteProduct(id){
    const url = `${api}${endPointDelete}/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    });
    if(response.ok){
        container.innerHTML = '';
        peticion(api, (product) => {
            container.appendChild(productCard(product));
        });
    } else {
        console.error("error")
    }
}

async function peticion(api, f){
    fetch(api)
        .then(res => res.json())
        .then(resp => {
            resp.forEach( (x) => {
                f(x)
            });
        });
}