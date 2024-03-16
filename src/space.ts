import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export default function createSpace(scene: THREE.Scene) {
  scene.add(createGround(), createRoad(), createSky(), createLight());
}

let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00, // Neon green
  wireframe: true,
});

function createLight() {
  // Step 1: Create a THREE.PointLight instance
  let light = new THREE.PointLight(0xffffff, 1, 1000);
  // Step 2: Set the position of the light
  light.position.set(0, 200, 200);
  // Step 3: Add the light to your scene
  return light;
}

function createGround() {
  // Load the texture
  //const texture = textureLoader.load('path_to_your_texture.jpg'); // replace with your texture path
  var geo = new THREE.PlaneGeometry(2000, 2000, 8, 8);
  var mat = new THREE.MeshBasicMaterial({
    // map: texture,
    color: 0x505050,
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
  let geometryS = new THREE.SphereGeometry(1000, 60, 40);
  // Step 3: Create a material with the texture you loaded
  /*let material = new THREE.MeshBasicMaterial({
    //map: texture,
    color: 0x00c0b0,
    side: THREE.BackSide,
  });*/
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
