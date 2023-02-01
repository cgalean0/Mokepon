const sectionSeleccionarAtaque = document.getElementById('selecionar_ataque');
const botonReiniciarOculto = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton_mascota');

const botonFuego = document.getElementById('boton_fuego');
const botonAgua = document.getElementById('boton_agua');
const botonTierra = document.getElementById('boton_tierra');
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

let mokepones = []
let opcionDeMokepones
let ataqueJugador 
let ataqueEnemigo 
let hipodoguee
let capipepoo
let ratigueyaa
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

        hipodoguee = document.getElementById('Hipodogue');
        capipepoo = document.getElementById('Capipepo');
        ratigueyaa = document.getElementById('Ratigueya');
    })

    botonReiniciarOculto.style.display ='none';
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador )
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    sectionSeleccionarAtaque.style.display = 'flex';
    if(hipodoguee.checked){
        spanMascotaJugador.innerHTML = 'Hipodogue';
    } else if(capipepoo.checked){
        spanMascotaJugador.innerHTML = 'Capipepo';
    } else if(ratigueyaa.checked){
        spanMascotaJugador.innerHTML = 'Ratigueya';
    }else {
        alert("selecciona una Mascota!")
    }
    seleccionarMascotaEnemigo();
}
//Funcion Numero Aleatorio.
function aleatorio (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Funcion Enemigo Selecciona Su Mascota.
function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(1, 3)
    if(mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = 'Pydos'
    } else if(mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = 'Langostelvis'
    } else if(mascotaAleatoria == 3){
        spanMascotaEnemigo.innerHTML = 'Tucapalma'
    }
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

