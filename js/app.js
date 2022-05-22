// Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []





// Event Listeners
eventListeners()

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet)

    // Cuando el documento esta lista
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        console.log(tweets);

        crearHTML()
    })
}




// Funciones
function agregarTweet(e) {
    e.preventDefault()

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value

    // Validando...
    if(tweet === '') {
        // console.log('No puede ir vacío');
        mostrarError('Un mensaje no puede ir vacío')

        return; // evita que se  ejecuten mas lineas de código
                // siempre y cuando el if este dentro de una funcion
    }

    // console.log('Agregando tweet');
    
    // Añadir al arreglo de tweets
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    tweets = [...tweets, tweetObj]

    // Una vez agregado vamos a crear el HTML
    crearHTML()

    // Reiniciar el formulario
    formulario.reset()
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(contenido)

    // Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

// Muestra un listado de los tweet
function crearHTML() {
    limpiarHTML()

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            // creamos el HTML
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.innerHTML = 'X'

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet( tweet.id )
            }


            const li = document.createElement('li')

            // añadimos el texto
            li.innerHTML = tweet.tweet

            // asignar el botón de eliminar
            li.appendChild(btnEliminar)

            // insertarlo en el HTML
            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage()
}

// Limpiar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

// Agrega los tweets actuales a Local Storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Eliminar tweet
function borrarTweet(id) {
    // console.log('borrando', id);

    tweets = tweets.filter( tweet => tweet.id !== id)
    crearHTML()
}