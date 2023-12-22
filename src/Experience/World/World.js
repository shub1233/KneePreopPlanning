import Experience from '../Experience.js';
import Environment from './Environment.js';

export default class World {
    constructor() {
        this.experience = new Experience();

        // Variables
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Wait for response
        this.resources.on('ready', () => {
            // setup
            this.environment = new Environment();
        });
    }

    update() {
        /* update */
    }
}


