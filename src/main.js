import { AxesHelper, BoxGeometry, BufferGeometry, MathUtils, Mesh, MeshNormalMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, WebGLRenderer,TextureLoader, Float32BufferAttribute} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { vertexColor } from 'three/src/Three.TSL.js';
import './style.css'
import { Group } from 'three';
import { Clock } from 'three';
import { Line } from 'three';
import { LineBasicMaterial } from 'three';

const scene = new Scene(); //creer une scene
const count = 300;
const distance = 2;
const size = 0.2
const textureLoader = new TextureLoader()
const circleTexture = textureLoader.load("../click.png")
// scene.add(new AxesHelper()) // Voir les axes

const camera = new PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.01, 1000); //creer la camera visuelle 1(zoom cam) 2(ratio de l'image) 3 et 4(afficher entre ... et ...)
camera.position.z = 2; // bouger la camera en fonction de l'axe z 
camera.position.y = .5 // y
camera.position.x = .5 // x
scene.add(camera); //ajouter la camera

const points = new Float32Array(count*3) //*3 car 3 coordonnées pour chaque point
const colors = new Float32Array(count*3)
for(let i = 0; i<points.length; i++){
  points[i] = MathUtils.randFloatSpread(distance) //random coordonnée x 
  colors[i] = Math.random() //couleur aleatoire
}

// const geometry = new BoxGeometry(1,1,1); //creer une geometrie carré

const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(points,3)) //tableau pisotion xyz
geometry.setAttribute('color', new Float32BufferAttribute(colors,3)) //tableau couleur
const material = new PointsMaterial({ //propriete du materiel
  size,    //grandeur
  color :0x8d8d8d,
  map:circleTexture, //texture
  alphaTest:0.1, //si le pixel a 0.1 d'opacité
  transparent:true //rend transparent alpha
})
const pointsObject = new Points(geometry, material) //ceer plusieurs geometries

// const cube = new Mesh(  // objet compose geometrie(ensemble de point pr former qqc) et materiel pour texture
//   new BoxGeometry(1,1,1), //geometrie avec largeur hauteur et profondeur
//   new MeshNormalMaterial() //materiel de base pr debbuguer
// ) 
const group = new Group();//creer un groupe

group.add(pointsObject) //ajouter les points créés au groupe
scene.add(group) //ajouter le groupe de point a la scene
const renderer = new WebGLRenderer({
  antialias:true,
  alpha:true
}) //ceer un rendu

const lineMaterial = new LineBasicMaterial({
  color : 0x8d8d8d,
  opacity:0.05,
  depthTest:false
})

const lineObject = new Line(geometry, lineMaterial)
// group.add(lineObject)
renderer.setClearColor(0x000000, 0)
renderer.setSize(window.innerWidth, window.innerHeight); //définir la taille du rendu (dans notre cas la taille = taille de la page)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); //définir le pixelRatio
document.body.appendChild(renderer.domElement); //afficher la scene dans le body
// renderer.render(scene, camera); //afficher le rendu en fonction de la scene et la camera

// const controls = new OrbitControls(camera, renderer.domElement) //controler la camera
const clock = new Clock;

let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) =>{
  mouseX = e.clientX
  mouseY = e.clientY
})

function tick(){
  const time = clock.getElapsedTime()
  group.rotation.y = time *0.1
  renderer.render(scene, camera) //afficher le rendu en fonction de la scene et la camera
  // controls.update
  // camera.position.x += .01
  camera.lookAt(0,0,0)
  requestAnimationFrame(tick); //rappeler la fonction pour l'animation
  const ratio = (mouseX / window.innerWidth - 0.5) *2;
  const ratioY=  (mouseY/window.innerHeight -0.5)*2
  // group.rotation.y = ratio * Math.PI * 0.1
  // group.rotation.x = ratioY * Math.PI *0.1
}

tick() //appelle de la fonction tick

window.addEventListener('resize', ()=>{  // redimensionner les mesures si les dimensions de l'ecran changent
  camera.aspect = window.innerWidth / window.innerHeight //changer l'aspect de la camera
  camera.updateProjectionMatrix() //update la projection
  renderer.setSize(window.innerWidth, window.innerHeight) //update les dimensions du rendu
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); //redéfinir le pixelRatio
})