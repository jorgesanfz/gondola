import * as THREE from "three";
import { Controls, PlaneControls } from "./controls";
import { Camera } from "./camera";

export default class Avion {
  public mesh: THREE.Mesh;
  public controls: PlaneControls;
  private mouseNormalized = new THREE.Vector2();
  private mouse3D = new THREE.Vector3();
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

  update() {
    const speed = 0.1;
    // normalized lol
    this.mouseNormalized.x = this.controls.mouse.position.x;
    this.mouseNormalized.y = this.controls.mouse.position.y;

    this.mouse3D = new THREE.Vector3(
      this.mouseNormalized.x,
      this.mouseNormalized.y,
      -1
    );
    let direction = this.mouse3D;
    let movement = direction.multiplyScalar(speed);
    if (this.controls.keys.up) this.mesh.position.add(movement);
    if (this.controls.keys.down) this.mesh.position.sub(movement);

    // ROTATE
    this.rotation();
    /*const rotationSpeed = 0.05;
    this.mesh.rotation.x += this.controls.mouse.position.y * rotationSpeed;
    this.mesh.rotation.y += -this.controls.mouse.position.x * rotationSpeed;*/
  }

  rotation() {
    const rotationSpeed = 0.01;
    let directionToMouse = new THREE.Vector3(
      this.mouseNormalized.x,
      this.mouseNormalized.y,
      1
    ).sub(this.mesh.position);

    // Normalize the direction vector
    directionToMouse.normalize();

    // Calculate the dot product of the direction vector and the forward vector of the mesh
    let dot = directionToMouse.dot(
      this.mesh.getWorldDirection(new THREE.Vector3())
    );

    // Calculate the angle in radians from the dot product
    let angle = Math.acos(dot);

    // Define the angle limit (in radians)
    let angleLimit = THREE.MathUtils.degToRad(30); // Replace 30 with the desired angle limit in degrees

    // If the angle is within the limit, apply the rotation
    if (angle < angleLimit) {
      this.mesh.rotation.x += this.controls.mouse.position.y * rotationSpeed;
      this.mesh.rotation.y += -this.controls.mouse.position.x * rotationSpeed;
    }
  }
}
