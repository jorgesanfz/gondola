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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(default_camera, renderer.domElement);

// Load the texture
//const textureLoader = new THREE.TextureLoader();
//const texture = textureLoader.load('path_to_your_texture.jpg'); // replace with your texture path

// Create the ground
var geo = new THREE.PlaneGeometry(2000, 2000, 8, 8);
var mat = new THREE.MeshBasicMaterial({
  // map: texture, // replace with your texture
  color: 0x007209,
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(geo, mat);
plane.position.y = -0.1; // Position the ground below the cube
plane.rotateX(-Math.PI / 2);
scene.add(plane);

// Create a road
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
scene.add(road);

// Initialize the keyboard controls
const avion = new Avion();
scene.add(avion.mesh);

default_camera.position.y = 5; // Move the camera up
default_camera.position.z = 10; // Move the camera back
default_camera.lookAt(
  avion.mesh.position.x,
  avion.mesh.position.y,
  avion.mesh.position.z
);
// Limit vertical angle
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

function animate() {
  requestAnimationFrame(animate);

  avion.update(default_camera);
  controls.update();
  //default_camera.lookAt(avion.mesh.position.x, avion.mesh.position.y, avion.mesh.position.z);
  cameraFollow();

  renderer.render(scene, default_camera);
}

animate();

function cameraFollow() {
  default_camera.position.x = avion.mesh.position.x;
  default_camera.position.y = avion.mesh.position.y + 5;
  default_camera.position.z = avion.mesh.position.z - 10;
  default_camera.lookAt(
    avion.mesh.position.x,
    avion.mesh.position.y,
    avion.mesh.position.z
  );
}
