import * as THREE from "three";
import Camera from "./Camera.js";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Resources from "./Utils/Resources.js";
import sources from "./sources.js";
import Debug from "./Utils/Debug.js";
import Operator from "./Operator.js";
import EventEmitter from "./Utils/EventEmitter.js";

let instance = null;

export default class Experience extends EventEmitter {
  constructor(canvas) {
    super();

    // Global Access
    window.experience = this;

    if (instance) {
      return instance;
    }

    instance = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.allMeshesInScene = [];
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.operator = new Operator();

    /**
     * Global Events
     */

    // sizes
    this.sizes.on("resize", () => {
      this.resize();
    });

    // time
    this.time.on("tick", () => {
      this.update();
    });

    // if (this.debug.active) this.debug.ui.add(this, 'destroy');
  }

  addObject(object, castRay = false) {
    this.scene.add(object);
    castRay && this.allMeshesInScene.push(object);
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene
    this.scene.children.forEach((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        child.material.dispose();
      }

      this.scene.remove(child);
    });

    // Dispose Oribit Controls
    this.camera.controls.dispose();

    this.renderer.renderer.dispose();

    // Destroy debug ui
    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
