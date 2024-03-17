import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Avion from "./src/avion";
import createSpace from "./src/space";
import thirdPersonCamera from "./src/camera";
import AirPlane from "./src/airplane";

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

/*const controls = new OrbitControls(default_camera, renderer.domElement);
// Limit vertical angle
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians*/

// Add axes to the scene
scene.add(new THREE.AxesHelper(5));

createSpace(scene);

// Avion Camera
/*
default_camera.position.y = 5; // Move the camera up
default_camera.position.z = 10; // Move the camera back
avion_camera.lookAt(
avion.mesh.position.x,
avion.mesh.position.y,
avion.mesh.position.z
);
*/

// ----------------- Airplane -----------------

function createPlane() {
  let airplane = new AirPlane();
  airplane.create();
  airplane.mesh.scale.set(0.05, 0.05, 0.05);
  airplane.mesh.position.y = 1;
  scene.add(airplane.mesh);
}
createPlane();

const avion = new Avion();
//scene.add(avion.mesh);
const avion_camera = new thirdPersonCamera(avion);

animate();

function animate() {
  requestAnimationFrame(animate);

  avion.update();
  avion_camera.update();
  //controls.update();

  renderer.render(scene, avion_camera.camera);
}
