import * as THREE from "three";
import Experience from "../Experience";

export default class Point {
  constructor(position, type) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.ui = this.experience.debug;
    this.orbitControls = this.experience.camera.controls;
    this.tranformControls = this.experience.camera.transfromControls;

    this.type = type;

    this.geometry = new THREE.SphereGeometry(0.03);
    this.material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(1, Math.random(), Math.random()),
    });

    this.pointMesh = new THREE.Mesh(this.geometry, this.material);
    this.pointMesh.name = type;
    this.pointMesh.position.copy(position);

    this.experience.addObject(this.pointMesh);

    this.showGizmo();

    this.experience.on("stateChanged", this.onStateChanged);

    this.ui.createdNewPoint();
  }

  onStateChanged = (state, value) => {
    if (state === this.type && value) {
      this.showGizmo();
    } else if (state === this.type && !value) {
      this.discardGizmo();
    }
  };

  showGizmo() {
    this.tranformControls.attach(this.pointMesh);
    this.scene.add(this.tranformControls);

    this.tranformControls.addEventListener("dragging-changed", (event) => {
      this.orbitControls.enabled = !event.value;
    });
  }

  discardGizmo() {
    this.tranformControls.detach(this.pointMesh);
    this.scene.remove(this.tranformControls);

    this.tranformControls.removeEventListener("dragging-changed");
  }
}
