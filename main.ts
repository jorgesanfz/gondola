import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Avion from "./src/avion";

const scene = new THREE.Scene();

const default_camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const avion_camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add axes to the scene
//const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

//const textureLoader = new THREE.TextureLoader();

const ground = createGround();
scene.add(ground);

const road = createRoad();
scene.add(road);

const skybox = createSky();
scene.add(skybox);

// Light
// Step 1: Create a THREE.PointLight instance
let light = new THREE.PointLight(0xffffff, 1, 1000);
// Step 2: Set the position of the light
light.position.set(0, 200, 200);
// Step 3: Add the light to your scene
scene.add(light);

const controls = new OrbitControls(default_camera, renderer.domElement);
// Limit vertical angle
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

// Add the avion to the scene
const avion = new Avion();
scene.add(avion.mesh);

// Avion Camera
avion_camera.position.y = 5; // Move the camera up
avion_camera.position.z = 10; // Move the camera back
avion_camera.lookAt(
  avion.mesh.position.x,
  avion.mesh.position.y,
  avion.mesh.position.z
);

animate();

function animate() {
  requestAnimationFrame(animate);

  avion.update(avion_camera);
  //controls.update();
  cameraFollow();
  //default_camera.lookAt(avion.mesh.position.x, avion.mesh.position.y, avion.mesh.position.z);

  renderer.render(scene, avion_camera);
}

function cameraFollow() {
  avion_camera.position.x = avion.mesh.position.x;
  avion_camera.position.y = avion.mesh.position.y + 5;
  avion_camera.position.z = avion.mesh.position.z + 10;
  avion_camera.lookAt(
    avion.mesh.position.x,
    avion.mesh.position.y,
    avion.mesh.position.z
  );
}

function createGround() {
  // Load the texture
  //const texture = textureLoader.load('path_to_your_texture.jpg'); // replace with your texture path
  var geo = new THREE.PlaneGeometry(2000, 2000, 8, 8);
  var mat = new THREE.MeshBasicMaterial({
    // map: texture,
    color: 0x007209,
    side: THREE.DoubleSide,
  });
  var plane = new THREE.Mesh(geo, mat);
  plane.position.y = -0.1; // Position the ground below the cube
  plane.rotateX(-Math.PI / 2);
  return plane;
}

function createSky() {
  // Step 1: Load a texture for the sky
  //let skyTexture = loader.load("path_to_your_texture.jpg");
  // Step 2: Create a large sphere geometry
  let geometryS = new THREE.SphereGeometry(5000, 60, 40);
  // Step 3: Create a material with the texture you loaded
  let material = new THREE.MeshBasicMaterial({
    //map: texture,
    color: 0x00c0b0,
    side: THREE.BackSide,
  });
  // Step 4: Create a mesh with the sphere geometry and the material, and add it to your scene
  let skybox = new THREE.Mesh(geometryS, material);

  return skybox;
}

function createRoad() {
  //const roadTexture = textureLoader.load("path_to_road_texture.jpg"); // replace with your road texture path
  const roadGeo = new THREE.PlaneGeometry(2000, 50, 8, 8);
  const roadMat = new THREE.MeshBasicMaterial({
    //map: roadTexture,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.position.y = -0.1; // Position the road above the ground
  road.rotateX(-Math.PI / 2);
  road.rotateZ(Math.PI / 2);
  return road;
}
