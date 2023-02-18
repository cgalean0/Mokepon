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
const anchoMaximoDelMapa = 350

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
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
//Objetos
let squirtle = new Mokepon('Squirtle', './assets/squirtle.png', 5, '../assets/squirtle-ico.png');
let bulbasaur = new Mokepon('Bulbasaur', './assets/bulbasaur.png', 5, '../assets/bullbasaur-ico.png');
let charmander = new Mokepon('Charmander', './assets/charmander.png', 5, '../assets/charmander-ico.png');

let squirtleEnemigo = new Mokepon('Squirtle', './assets/squirtle.png', 5, '../assets/squirtle-ico.png');
let bulbasaurEnemigo = new Mokepon('Bulbasaur', './assets/bulbasaur.png', 5, '../assets/bullbasaur-ico.png');
let charmanderEnemigo = new Mokepon('Charmander', './assets/charmander.png', 5, '../assets/charmander-ico.png');


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
squirtleEnemigo.ataques.push(
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '💧', id: 'boton_agua'},
    {nombre: '🦶', id: 'boton_patada'},
    {nombre: '👊', id: 'boton_puño'}
)
bulbasaurEnemigo.ataques.push(
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🌱', id: 'boton_tierra'},
    {nombre: '🦶', id: 'boton_patada'},
    {nombre: '👊', id: 'boton_puño'}
)
charmanderEnemigo.ataques.push(
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
function seleccionarMascotaEnemigo(enemigo){
    let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
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
        } else if(ataqueJugador[i]=== 'Fuego' && ataqueEnemigo[i] === 'Tierra' || ataqueJugador[i] === 'Fuego' && ataqueEnemigo[i] === 'Puño' || ataqueJugador[i] === 'Tierra' && ataqueEnemigo[i] === 'Patada' || ataqueJugador[i] === 'Tierra'  && ataqueEnemigo[i] === 'Agua' || ataqueJugador[i] === 'Puño' && ataqueEnemigo[i] === 'Tierra' || ataqueJugador[i] === 'Puño' && ataqueEnemigo[i] === 'Agua' || ataqueJugador[i] === 'Patada' && ataqueEnemigo[i] === 'Puño' || ataqueJugador[i] === 'Patada' && ataqueEnemigo[i] === 'Fuego' || ataqueJugador[i] === 'Agua' && ataqueEnemigo[i] === 'Patada' || ataqueJugador[i] === 'Agua' && ataqueEnemigo[i] === 'Fuego') {
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
    mascotaJugadorObjeto.pintarMokepon();
    squirtleEnemigo.pintarMokepon();
    bulbasaurEnemigo.pintarMokepon();
    charmanderEnemigo.pintarMokepon();
    if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(squirtleEnemigo);
        revisarColision(bulbasaurEnemigo);
        revisarColision(charmanderEnemigo);
    }
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

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota= mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo ||izquierdaMascota > derechaEnemigo) {
        return
    }
    detenerMovimiento();
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo);
}
window.addEventListener('load', iniciarJuego)