import * as THREE from "three";
import Experience from "../Experience.js";

export default class Model3D {
  constructor(mesh, pos, scale, rotation) {
    this.experience = new Experience();
    this.model = mesh;
    this.position = new THREE.Vector3().fromArray(pos);
    this.scale = new THREE.Vector3().fromArray(scale);
    this.rotation = new THREE.Euler().fromArray(rotation);

    this.setModel();
  }

  setModel() {
    this.model.position.copy(this.position);
    this.model.rotation.copy(this.rotation);
    this.model.scale.copy(this.scale);
  }

  update() {
    // update
  }
}
