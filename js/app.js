let api = 'http://localhost:8080/api/v1/product';
let container = document.querySelector("#container")
let endPointInsert = "/insert"
let endPointDelete = "/delete"

// let productsEndpoint = "products";
/* esto es una concatenacion, hay que la ruta se va asi:
   http://localhost:8080/api/v1/productproducts, en el carga de abajo
*/

document.querySelector("#cargar").addEventListener('click', () => {
    // peticion(api + productsEndpoint, (product) => {     --> asi se pondria con el endpoint
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

    let nombre = document.createElement("h1")
    nombre.innerHTML = product.productName

    let id = document.createElement("p")
    id.innerHTML = product.productId

    let precio = document.createElement("p")
    precio.innerHTML = product.productPrice

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

async function deleteProduct(id) {
    const url = `${api}${endPointDelete}/${id}`;
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
        })
}





















// aqui vamos a pedir a la API que nos de los datos de los personajes

// async function fetchProducts(){
//     const url = api;

//     try{
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data)
//         mostrarProductos(data.products);

//     if (Array.isArray(data)) {
//         mostrarProductos(data);
//         } else if (data.results && Array.isArray(data.results)) {
//             mostrarProductos(data.results);
//         } else if (data.products && Array.isArray(data.products)) {
//             mostrarProductos(data.products);
//         } else {
//             console.error('No se encontró un array de productos en la respuesta');
//         } 
//     }
//     catch (error) {
//     console.error('Error al obtener los productos:', error);
// }


// function productCard(products){
    //     let card = document.querySelector('.card-container');
    //     card.innerHTML = '';                                   // con este limpiamos el contenedor para agregar nuevos personajes
    
    //     products.forEach(product => {
    //         const card = document.createElement('div');
    //         card.className = 'card';
    //         card.innerHTML = `
    //             <span>${product.name} - ${product.price}</span>
    //             <button onclick="deleteProduct(${product.id})">borrar</button>
    //         `;
    //         container.appendChild(card);
    //     });
    // }
    
    // async function deleteProduct(id){
    //     try{
    //         const response = await fetch('http://localhost:8080/api/v1/product',{
    //             method: 'DELETE',
    //         });
    //         if (response.ok) {
    //             fetchProducts(); // Volver a listar productos
    //         } else {
    //             console.error('Error al eliminar el producto:', response.status);
    //         }
    //     } catch (error) {
    //     console.error('Error al eliminar el producto:', error);
    //     }
    // }
    
    // addProductForm.addEventListener('submit', async (event) => {
    //     event.preventDefault();
    
    //     const productName = document.getElementById('product-name').value;
    //     const productPrice = document.getElementById('product-price').value;
    
    //     try{
    //         const response = await fetch('http://localhost:8080/api/v1/product', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 productName: productName, 
    //                 productPrice: productPrice
    //             }),
    //         });
    //         if (response.ok){
    //             fetchProducts();
    //             addProductForm.reset();
    //         } else {
    //             console.error('error al agregar')
    //         }
    //     } catch (error){
    //         console.error('error al agregar', error);
    //     }
    // });


