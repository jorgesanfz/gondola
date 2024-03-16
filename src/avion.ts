import * as THREE from "three";
import { Controls, PlaneControls } from "./controls";

export default class Avion {
  public mesh: THREE.Mesh;
  public controls: PlaneControls;
  //public camera: THREE.PerspectiveCamera;

  constructor() {
    const geometry = new THREE.BoxGeometry(3, 1, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x7e7d94 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 2; // Position the cube above the ground
    this.mesh.position.z = 0; // Position the cube at the center of the scene
    this.mesh.position.x = 0; // Position the cube at the center of the scene
    this.controls = new PlaneControls();
    //this.camera = this.createCamera();
  }

  update(camera: THREE.Camera) {
    const speed = 0.1;
    let mouseNormalized = new THREE.Vector2();
    // normalized lol
    mouseNormalized.x = this.controls.mouse.position.x;
    mouseNormalized.y = this.controls.mouse.position.y;

    let mouse3D = new THREE.Vector3(mouseNormalized.x, mouseNormalized.y, 1);
    let direction = mouse3D;
    let movement = direction.multiplyScalar(speed);

    // ROTATE
    const rotationSpeed = 0.01;
    this.mesh.rotation.x += this.controls.mouse.position.y * rotationSpeed;
    this.mesh.rotation.y += -this.controls.mouse.position.x * rotationSpeed;
    camera.rotation.x += this.controls.mouse.position.y * rotationSpeed;
    camera.rotation.y += -this.controls.mouse.position.x * rotationSpeed;

    if (this.controls.keys.up) this.mesh.position.add(movement);
    //if (this.controls.keys.down) this.mesh.position.sub(movement);
  }

  // Add a method that creates a camera as a POV of the box
  createCamera() {
    // Create a cameradas
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Set the camera's position behind the mesh
    camera.position.x = this.mesh.position.x;
    camera.position.y = this.mesh.position.y - 5; // Offset the camera down by 5 units
    camera.position.z = this.mesh.position.z - 10; // Offset the camera back by 10 units

    // Create a point behind the mesh
    const lookAtPoint = new THREE.Vector3();
    const direction = new THREE.Vector3(); // Create a vector to store the direction

    this.mesh.getWorldDirection(direction); // Get the world direction

    lookAtPoint.copy(this.mesh.position);
    lookAtPoint.sub(direction.multiplyScalar(50)); // Adjust the scalar value to move the point further or closer to the mesh

    // Make the camera look at the point behind the mesh
    camera.lookAt(lookAtPoint);

    return camera;
  }
}
