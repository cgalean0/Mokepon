const sectionSeleccionarAtaque = document.getElementById('selecionar_ataque');
const botonReiniciarOculto = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton_mascota');

const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar_mascota');
const spanMascotaEnemigo = document.getElementById('mascota_enemigo');

const spanVidasJugador = document.getElementById('victorias_jugador');
const spanVIdasEnemigo = document.getElementById('victorias_enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques_jugador');
const ataqueDelEnemigo = document.getElementById('ataque_enemigo');

const spanMascotaJugador = document.getElementById('mascota_jugador');
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []
let botones = []
let opcionDeMokepones
let ataqueJugador = []
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let inputHipodogue
let inputCapipepo
let inputRatigueya
let botonFuego
let botonAgua
let botonTierra
let mascotaJugador
let ataquesMokepon
let victoriasJugador = 0
let victoriasEnemigo = 0
let ataquesMokeponEnemigo
let vidasEnemigo = 3
let vidasJugador = 3

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
    }
}
//Objetos
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
        ataquesMokepon = `
        <button id=${ataque.id} class="ataques BAtaques">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
     botonFuego = document.getElementById('boton_fuego');
     botonAgua = document.getElementById('boton_agua');
     botonTierra = document.getElementById('boton_tierra');
     botones = document.querySelectorAll('.BAtaques'); 
}
function secuenciaAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent === '💧'){
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo();
        })
    })
    
}
function aleatorio (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//Funcion Enemigo Selecciona Su Mascota.
function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaques();
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length, - 1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('Fuego') 
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push('Agua')
    } else {
        ataqueEnemigo.push('Tierra')
    }
    iniciarpelea();
}
function iniciarpelea() {
    if(ataqueJugador.length === 5){
        combate();
    }
}
function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}
//Combate.
function combate(){
    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            indexAmbosOponentes(i, i);
            crearMensaje('Empate');
        } else if(ataqueJugador[i]=== 'Agua' && ataqueEnemigo[i] === 'Fuego' || ataqueJugador[i] === 'Fuego' && ataqueEnemigo[i] === 'Tierra' || ataqueJugador[i] === 'Tierra' && ataqueEnemigo[i] === 'Agua') {
            indexAmbosOponentes(i, i)
            crearMensaje('Ganaste')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje('Perdiste')
            victoriasEnemigo++
            spanVIdasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias();
}
//Revisar Vidas
function revisarVictorias(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal('Fue Un empate, Puedes Mejorar👀');
    } else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('Great, Ganamos el combate🏆');
    } else {
        crearMensajeFinal('Acabamos de Perder😓');
    }
}
//crear Mensajes
function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement ('p')
    let nuevoAtaqueDelEnemigo = document.createElement ('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
//Mensaje Final
function crearMensajeFinal(resultadoFinal){

    sectionMensajes.innerHTML = resultadoFinal
    botonReiniciarOculto.style.display ='block';
}
//Reiniciar Juego
function reiniciarJuego(){
    location.reload();
}
//Esperamos a que todo cargue para poder usar los elementos del documento.
window.addEventListener('load', iniciarJuego)