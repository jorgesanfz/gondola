import * as THREE from "three";

export default class Box {
  constructor(keyControls) {
    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x1100ff });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 1; // Position the cube above the ground
    this.keyControls = keyControls;
  }

  update() {
    const speed = 0.1;
    if (this.keyControls.keys.up) this.mesh.position.y += speed;
    if (this.keyControls.keys.down) this.mesh.position.y -= speed;
    if (this.keyControls.keys.left) this.mesh.position.x -= speed;
    if (this.keyControls.keys.right) this.mesh.position.x += speed;
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

    // Set the camera's position relative to the box
    camera.position.x = this.mesh.position.x;
    camera.position.y = this.mesh.position.y + 5; // Offset the camera up by 5 units
    camera.position.z = this.mesh.position.z + 10; // Offset the camera back by 10 units

    // Create a point in front of the box
    const lookAtPoint = new THREE.Vector3();
    const direction = new THREE.Vector3(); // Create a vector to store the direction

    this.mesh.getWorldDirection(direction); // Get the world direction

    lookAtPoint.copy(this.mesh.position);
    lookAtPoint.add(direction.multiplyScalar(10)); // Adjust the scalar value to move the point further or closer to the box

    // Make the camera look at the point in front of the box
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
