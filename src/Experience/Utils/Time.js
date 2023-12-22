import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
    constructor() {
        super();

        // Setup
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        /**
         * Do not make this 0 it will create bugs,
         * And why 16 because according to 60fps each frame
         * consist of 16 millisecond 
         */
        this.delta = 16;

        // Game Loop
        window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    tick() {

        // Variables
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        // Global Access
        this.trigger('tick');

        window.requestAnimationFrame(() => {
            this.tick();
        });
    }
}
