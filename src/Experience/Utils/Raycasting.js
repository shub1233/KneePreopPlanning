import * as THREE from 'three';
import EventEmitter from "./EventEmitter.js";

export default class Raycasting extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(1, 1);

    // mouse move event
    window.addEventListener("pointerdown", (event) => {
      this.trigger("pointerdown", [event]);
    });
  }
}
