import * as THREE from 'three';
import Experience from "../Experience.js";

export default class Environment {
    constructor() {

        this.experience = new Experience();

        // Variables
        this.scene = this.experience.scene;

        // Setup
        this.setEnvLight();
    }

    setEnvLight() {
        this.light1 = new THREE.DirectionalLight('#ffffff', 1);
        this.light1.position.set(-1.2, 2, 4);
        this.scene.add(this.light1);

        // const help = new THREE.DirectionalLightHelper(this.light1);
        // this.scene.add(help);

        this.light2 = new THREE.DirectionalLight('#ffffff', 1);
        this.light2.position.set(- 1.2, 2, - 4);
        this.scene.add(this.light2);

        // const help2 = new THREE.DirectionalLightHelper(this.light2);
        // this.scene.add(help2);

        this.light3 = new THREE.DirectionalLight('#ffffff', 1);
        this.light3.position.set(4, 0, -4);
        this.scene.add(this.light3);

        // const help3 = new THREE.DirectionalLightHelper(this.light3);
        // this.scene.add(help3);
    }

}