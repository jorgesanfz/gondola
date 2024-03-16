import * as THREE from "three";
import { Controls, PlaneControls } from "./controls";

export default class Avion {
  public mesh: THREE.Mesh;
  public controls: PlaneControls;
  public camera: THREE.PerspectiveCamera;

  constructor() {
    // Create a cube
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x1100ff });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 1; // Position the cube above the ground
    this.mesh.position.z = 0; // Position the cube at the center of the scene
    this.mesh.position.x = 0; // Position the cube at the center of the scene
    this.controls = new PlaneControls();
    this.camera = this.createCamera();
  }

  update(camera: THREE.Camera) {
    var vector = new THREE.Vector3(
      this.controls.mouse.position.x,
      this.controls.mouse.position.y,
      0.5
    );
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    // Handle keyboard input
    const keyboard = this.controls.keys;
    const moveForward = keyboard.up; //keyboard.isPressed("w");
    if (moveForward) {
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    }
  }

  /*update(camera: THREE.Camera) {
    const speed = 0.1;

    // Handle keyboard input
    const keyboard = this.controls.keys;
    const moveForward = keyboard.up; //keyboard.isPressed("w");

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.controls.mouse.position, camera);

    const plane = new THREE.Plane(
      new THREE.Vector3(0, 1, 0), // Adjusted plane normal to move only in the forward direction
      -this.mesh.position.y
    );
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);

    const direction = target.sub(this.mesh.position).normalize();

    // Move the object based on keyboard input and mouse click
    if (moveForward) {
      const forwardDirection = new THREE.Vector3(
        direction.x,
        0,
        direction.z
      ).normalize();
      this.mesh.position.add(forwardDirection.multiplyScalar(speed));
    } /*else if (this.controls.mouse.click) {
      this.mesh.position.add(direction.multiplyScalar(speed));
    }
  }*/

  /*update() {
    const speed = 0.1;
    if (this.controls.keys.up) this.mesh.position.y += speed;
    if (this.controls.keys.down) this.mesh.position.y -= speed;
    if (this.controls.keys.left) this.mesh.position.x -= speed;
    if (this.controls.keys.right) this.mesh.position.x += speed;
  }*/

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

// Update the camera's position with the cube's position
//camera.position.x = cube.position.x;
//camera.position.y = cube.position.y + 5; // Offset the camera up by 5 units
//camera.position.z = cube.position.z + 10; // Offset the camera back by 10 units

//camera.lookAt(cube.position);

// Create a point in front of the cube
/*const lookAtPoint = new THREE.Vector3();
  lookAtPoint.copy(cube.position);
  lookAtPoint.add(cube.getWorldDirection().multiplyScalar(10)); // Adjust the scalar value to move the point further or closer to the cube

  // Make the camera look at the point in front of the cube
  camera.lookAt(lookAtPoint);*/
