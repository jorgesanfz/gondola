import * as THREE from "three";

export interface Camera {
  position: THREE.Vector3;
  lookAt: (x: number, y: number, z: number) => void;
  update: (object: any) => void;
}

export default class thirdPersonCamera extends THREE.PerspectiveCamera {
  public camera: THREE.PerspectiveCamera;
  public object: any;
  constructor(object: any) {
    super();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.object = object;
  }
  update() {
    const rotationSpeed = 0.01;
    this.camera.position.x = this.object.mesh.position.x;
    this.camera.position.y = this.object.mesh.position.y + 5;
    this.camera.position.z = this.object.mesh.position.z + 10;
    this.camera.lookAt(
      this.object.mesh.position.x,
      this.object.mesh.position.y,
      this.object.mesh.position.z
    );
    this.camera.rotation.x +=
      this.object.controls.mouse.position.y * rotationSpeed;
    this.camera.rotation.y +=
      -this.object.controls.mouse.position.x * rotationSpeed;
  }
}
