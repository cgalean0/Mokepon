const sectionSeleccionarAtaque = document.getElementById('selecionar_ataque');
const botonReiniciarOculto = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton_mascota');

const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar_mascota');
const spanMascotaEnemigo = document.getElementById('mascota_enemigo');

const spanVidasJugador = document.getElementById('vidas_jugador');
const spanVIdasEnemigo = document.getElementById('vidas_enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques_jugador');
const ataqueDelEnemigo = document.getElementById('ataque_enemigo');

const spanMascotaJugador = document.getElementById('mascota_jugador');
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []
let opcionDeMokepones
let ataqueJugador 
let ataqueEnemigo 
let inputHipodogue
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
let ataquesMokepon
let vidasEnemigo = 3
let vidasJugador = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodogue = new Mokepon('Hipodogue', './assets/Hipodogue.png', 5);
let capipepo = new Mokepon('Capipepo', './assets/Capipepo.png', 5);
let ratigueya = new Mokepon('Ratigueya', './assets/Ratigueya.png', 5);

hipodogue.ataques.push(
    { nombre: '💧', id: 'boton_agua'},
    { nombre: '💧', id: 'boton_agua'},
    { nombre: '💧', id: 'boton_agua'},
    { nombre: '🔥', id: 'boton_fuego'},
    { nombre: '🌱', id: 'boton_tierra'}
)
capipepo.ataques.push(
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🔥', id: 'boton_fuego'}
)
ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🌱', id: 'boton_tierra'}

)
mokepones.push(hipodogue, capipepo, ratigueya)
//Funcion iniciar juego.
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre}>
        <label class="tarjeta_mokepon" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodogue = document.getElementById('Hipodogue');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
    })

    botonReiniciarOculto.style.display ='none';
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador )
    botonReiniciar.addEventListener('click', reiniciarJuego);
    
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';

    if(inputHipodogue.checked){
        spanMascotaJugador.innerHTML = inputHipodogue.id
        mascotaJugador = inputHipodogue.id
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
        alert("selecciona una Mascota!")
    }
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador){
    let ataques
    
    for (let i = 0; i < mokepones.length; i++) {       
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="ataques">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })
     botonFuego = document.getElementById('boton_fuego');
     botonAgua = document.getElementById('boton_agua');
     botonTierra = document.getElementById('boton_tierra');

     botonFuego.addEventListener('click', ataqueFuego);
     botonAgua.addEventListener('click', ataqueAgua);
     botonTierra.addEventListener('click', ataqueTierra);
    
}

//Funcion Numero Aleatorio.
function aleatorio (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Funcion Enemigo Selecciona Su Mascota.
function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
}
//Ataques
function ataqueFuego(){
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo();
}
function ataqueAgua(){
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo();
}
function ataqueTierra(){
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo();
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3)
    if(ataqueAleatorio == 1){
        ataqueEnemigo = 'Fuego'
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'Agua'
    } else if(ataqueAleatorio == 3) {
        ataqueEnemigo = 'Tierra'
    }
    combate();
}
//Combate.
function combate(){
    if(ataqueJugador == ataqueEnemigo){
        crearMensaje('Empate');
    } else if(ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra' || ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua' || ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego'){
        crearMensaje('Ganaste');
        vidasEnemigo--
        spanVIdasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje('Perdiste');
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador;   
    } 
    revisarVidas();
    
}
//Revisar Vidas
function revisarVidas(){
    if(vidasJugador == 0){
        crearMensajeFinal('Tu mascota no puede continuar, No tiene mas vidas');
    } else if(vidasEnemigo == 0){
        crearMensajeFinal('Tu mascota gana el combate, Sigue asi😎');
    }
}
//crear Mensajes
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement ('p')
    let nuevoAtaqueDelEnemigo = document.createElement ('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
//Mensaje Final
function crearMensajeFinal(resultadoFinal){

    sectionMensajes.innerHTML = resultadoFinal
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    botonReiniciarOculto.style.display ='block';
}
//Reiniciar Juego
function reiniciarJuego(){
    location.reload();
}
//Esperamos a que todo cargue para poder usar los elementos del documento.
window.addEventListener('load', iniciarJuego)

