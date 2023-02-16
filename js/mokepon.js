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
const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa')

let mascotaJugadorObjeto
let mokepones = []
let botones = []
let opcionDeMokepones
let ataqueJugador = []
let ataqueEnemigo = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let inputSquirtle
let inputBulbasaur
let inputCharmander
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
let lienzo = mapa.getContext('2d')
let intervalo
let mapabackground = new Image()
mapabackground.src = '../assets/Pueblo_Paleta_HGSS.png'

class Mokepon{
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
}
//Objetos
let squirtle = new Mokepon('Squirtle', './assets/squirtle.png', 5);
let bulbasaur = new Mokepon('Bulbasaur', './assets/bulbasaur.png', 5);
let charmander = new Mokepon('Charmander', './assets/charmander.png', 5);

squirtle.ataques.push(
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🦶', id: 'boton_patada'},
    {nombre: '👊', id: 'boton_puño'}
)
bulbasaur.ataques.push(
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🦶', id: 'boton_patada'},
    {nombre: '👊', id: 'boton_puño'}
)
charmander.ataques.push(
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🔥', id: 'boton_fuego'},
    {nombre: '🦶', id: 'boton_patada'},
    {nombre: '👊', id: 'boton_puño'}

)
mokepones.push(squirtle, bulbasaur, charmander)
//Funcion iniciar juego.
function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none';
    sectionVerMapa.style.display = 'none';

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${Mokepon.nombre}>
        <label class="tarjeta_mokepon" for=${Mokepon.nombre}>
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputSquirtle = document.getElementById('Squirtle');
        inputBulbasaur = document.getElementById('Bulbasaur');
        inputCharmander = document.getElementById('Charmander');
    })

    botonReiniciarOculto.style.display ='none';
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador )
    botonReiniciar.addEventListener('click', reiniciarJuego);
    
}
function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    //sectionSeleccionarAtaque.style.display = 'flex';
    

    if(inputSquirtle.checked){
        spanMascotaJugador.innerHTML = inputSquirtle.id
        mascotaJugador = inputSquirtle.id
    } else if(inputBulbasaur.checked){
        spanMascotaJugador.innerHTML = inputBulbasaur.id
        mascotaJugador = inputBulbasaur.id
    } else if(inputCharmander.checked){
        spanMascotaJugador.innerHTML = inputCharmander.id
        mascotaJugador = inputCharmander.id
    }else {
        alert("selecciona una Mascota!")
    }
    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
    iniciarMapa();
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
     botonPatada = document.getElementById('boton_patada');
     botonPuño = document.getElementById('boton_puño');
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
            } else if(e.target.textContent === '🌱'){
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if(e.target.textContent === '👊'){
                ataqueJugador.push('Puño')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('Patada')
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

    if(ataqueAleatorio == 0){
        ataqueEnemigo.push('Fuego') 
    } else if(ataqueAleatorio == 1){
        ataqueEnemigo.push('Agua')
    } else if(ataqueAleatorio == 2){
        ataqueEnemigo.push('Tierra')
    } else if(ataqueAleatorio == 3) {
        ataqueEnemigo.push('Puño');
    } else {
        ataqueEnemigo.push('Patada');
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
        } else if(ataqueJugador[i]=== 'Fuego' && ataqueEnemigo[i] === '' || ataqueJugador[i] === 'Fuego' && ataqueEnemigo[i] === 'Puño' || ataqueJugador[i] === '' && ataqueEnemigo[i] === 'Patada' || ataqueJugador[i] === ''  && ataqueEnemigo[i] === 'Agua' || ataqueJugador[i] === 'Puño' && ataqueEnemigo[i] === '' || ataqueJugador[i] === 'Puño' && ataqueEnemigo[i] === 'Agua' || ataqueJugador[i] === 'Patada' && ataqueEnemigo[i] === 'Puño' || ataqueJugador[i] === 'Patada' && ataqueEnemigo[i] === 'Fuego' || ataqueJugador[i] === 'Agua' && ataqueEnemigo[i] === 'Patada' || ataqueJugador[i] === 'Agua' && ataqueEnemigo[i] === 'Fuego') {
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
        crearMensajeFinal('Great, Ganamos el Combate🏆');
    } else {
        crearMensajeFinal('Tu Mascota Pierde El Combate😓');
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

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height);
    lienzo.drawImage(
        mapabackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    lienzo.drawImage(
        mascotaJugadorObjeto.mapaFoto,
        mascotaJugadorObjeto.x,
        mascotaJugadorObjeto.y,
        mascotaJugadorObjeto.ancho,
        mascotaJugadorObjeto.alto
    )
}

function moverX() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverY() {
    mascotaJugadorObjeto.velocidadY = 5
}
function moverU() {
    mascotaJugadorObjeto.velocidadY = -5 
}
function moverR() {
    mascotaJugadorObjeto.velocidadX = -5
}
function capturaTecla() {
    document.addEventListener('keydown', e=> {
        if (e.key==='ArrowUp') {
            mascotaJugadorObjeto.y-=5
            pintarCanvas()
        } else if (e.key==='ArrowDown') {
            mascotaJugadorObjeto.y+=5
            pintarCanvas()
        } else if (e.key==='ArrowLeft') {
            mascotaJugadorObjeto.x-=5
            pintarCanvas()
        } else if (e.key==='ArrowRight') {
            mascotaJugadorObjeto.x+=5
            pintarCanvas()
        }
    })
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function iniciarMapa() {
    mapa.width = 420
    mapa.height = 360
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    intervalo = setInterval(pintarCanvas, 50)
    capturaTecla();
}
function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {       
        if(mascotaJugador === mokepones[i].nombre){
           return mokepones[i]
        }
    }
}
window.addEventListener('load', iniciarJuego)