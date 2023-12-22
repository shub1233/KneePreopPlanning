import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import Experience from "./Experience.js";

export default class Camera {
    constructor() {

        // variables
        this.camera = null;
        this.controls = null;
        this.transfromControls = null;
        this.experience = new Experience();

        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        // Methods
        this.setCamera();
        this.setOrbitControls();
        this.setTransformControls();
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 7);
        this.scene.add(this.camera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

    setTransformControls() {
        this.transfromControls = new TransformControls(this.camera, this.canvas);
    }

    resize() {
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}
