/* console.log("uno")
console.log("dos")

 setTimeout(()=> { // Ejecuta la función según los milisegundos del segundo argumento
    alert("hola mundo")
}, 10000) 

console.log("tres")
console.log("cuatro")
console.log("cinco") */

const API = "https://api.escuelajs.co/api/v1/categories/"
const tbody = document.querySelector("tbody")

// Los endpoints de una API tienen los métodos: 

// GET => Obtener informacion
// POST => Enviar informacion
// PUT => Actualizar informacion
// PATCH => Actualizar un dato puntualmente
// DELETE => Para eliminar

async function getData() {
    const response = await fetch(API) // la respuesta
    const data = await response.json() // la información que trae la respuesta, .json() viene ahí y pasa la info a JavaScript
    index(data, tbody) // Imprimo el array que me de
}

function index(data, tbody) {
    data.forEach(element => {
        tbody.innerHTML += `
        <tr>
        <th scope="row">${element.id}</th>
        <td>${element.name}</td>
        <td><image src=${element.image} alt=${element.name} width=100px/></td>
        <td><${element.creationAt}/> </td>
        <td><${element.updatedAt}/> </td>
        <td> <button type="button" data-id=${element.id} class="btn btn-danger"> Eliminar </button> </td>
        </tr>
        `
    })
}

getData()

// Creamos una nueva categoría

const newCategory = {
    name: "lenguajes programación",
    image: "https://areaf5.es/wp-content/uploads/2023/06/Lenguajes-scaled.jpg"
}

const btnNew = document.querySelector("#btn-enviar")
btnNew.addEventListener("click", postData)

tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
        let id = e.target.getAttribute("data-id")
        console.log(id)
        deleteData(id)
    }
})


async function postData() {
    const response = await fetch(API, { // Si no recibe el segundo parametro, toma GET
        method: "POST", // método
        headers: { // qué se va a enviar
            "Content-Type": "application/json" // formato en que lo enviamos
            // si la API es privada, aquí va el token también
        },
        body: JSON.stringify(newCategory), // lo que vamos a enviarle
        // JSON.stringify lo que hace es pasarlo en formato json
    })
    location.reload()
}

async function deleteData(id) {
    await fetch(`${API}${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    location.reload()
}