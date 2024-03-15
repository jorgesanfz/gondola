import * as THREE from "three";
//import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { KeyControls } from "./src/controls.js";
import Box from "./src/box.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
road.position.y = 0.1; // Position the road above the ground
road.rotateX(-Math.PI / 2);
road.rotateZ(Math.PI / 2);
scene.add(road);

/*
  camera.position.y = 5; // Move the camera up
  camera.position.z = 10; // Move the camera back
  camera.lookAt(0, 0, 0); // Make the camera look at the origin

  const controls = new OrbitControls(camera, renderer.domElement);
  // Limit vertical angle
  controls.minPolarAngle = 0; // radians
  controls.maxPolarAngle = Math.PI / 2; // radians
*/

// Initialize the keyboard controls
const boxControls = new KeyControls();
const box = new Box(boxControls);
scene.add(box.mesh);

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  /*if (
    box.keyControls.up ||
    box.keyControls.down ||
    box.keyControls.left ||
    box.keyControls.right
  ) {
    controls.enabled = false;
  } else {
    controls.enabled = true;
  }
  controls.update();*/

  box.update();

  // Update the camera's position with the box's position
  camera.position.x = box.mesh.position.x;
  camera.position.y = box.mesh.position.y + 20; // Offset the camera up by 5 units
  camera.position.z = box.mesh.position.z + 10; // Offset the camera back by 10 units

  // Create a point in front of the box
  const lookAtPoint = new THREE.Vector3();
  const direction = new THREE.Vector3(); // Create a vector to store the direction

  box.mesh.getWorldDirection(direction); // Get the world direction

  lookAtPoint.copy(box.mesh.position);
  lookAtPoint.add(direction.multiplyScalar(10)); // Adjust the scalar value to move the point further or closer to the box

  // Make the camera look at the point in front of the box
  camera.lookAt(lookAtPoint);

  renderer.render(scene, camera);
}

animate();
