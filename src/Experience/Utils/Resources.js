import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import EventEmitter from "./EventEmitter.js";
import Model3D from "../World/Model3D.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.experience = new Experience();

    // Options
    this.sources = sources;

    // Setup
    this.items = [];
    this.loaders = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders.stlLoader = new STLLoader();
  }

  startLoading() {
    // Load all sources`
    for (const source of this.sources) {
      if (source.type === "stlModel") {
        this.loaders.stlLoader.load(source.path, (geometry) => {
          geometry.center();
          const material = new THREE.MeshStandardMaterial();
          const mesh = new THREE.Mesh(geometry, material);
          const newModel = new Model3D(mesh, source.position, source.scale, source.rotation)
          this.sourceLoaded(source, newModel.model);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded += 1;

    this.experience.addObject(file, true);

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
