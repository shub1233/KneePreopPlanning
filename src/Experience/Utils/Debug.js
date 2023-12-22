import * as dat from 'lil-gui';
import Experience from '../Experience';

export default class Debug {
    constructor() {
        // this.active = window.location.hash === '#debug';
        this.experience = new Experience();

        // if (this.active) {
        this.ui = new dat.GUI();

        this.totalPointsCreated = 0;

        this.uiObj = {
            femurCenter: {state: false, isDirty: false, pointInstance: null},
            hipCenter: {state: false, isDirty: false, pointInstance: null},
            femurProximalCanal: {state: false, isDirty: false, pointInstance: null},
            femurDistalCanal: {state: false, isDirty: false, pointInstance: null},
            medialEpicondyle: {state: false, isDirty: false, pointInstance: null},
            lateralEpicondyle: {state: false, isDirty: false, pointInstance: null},
            distalMedialPt: {state: false, isDirty: false, pointInstance: null},
            distalLateralPt: {state: false, isDirty: false, pointInstance: null},
            posteriorMedialPt: {state: false, isDirty: false, pointInstance: null},
            posteriorLateralPt: {state: false, isDirty: false, pointInstance: null},
        }
        // }
    }

    createdNewPoint() {
        this.totalPointsCreated += 1;

        if (this.totalPointsCreated === 10) {
            this.showUpdateButton();
        }
    }

    makeOperatorUI() {
        if (this.ui) {
            this.pointsFolder = this.ui.addFolder( 'Points' );
            const keys = Object.keys(this.uiObj);

            keys.forEach((key, index) => {
                this.pointsFolder.add(this.uiObj[key], "state").name(key).onChange((val) => {
                    this.setChecked(key, val, index);
                });
            })
        }
    }

    setChecked(point, val, index) {
        const keys = Object.keys(this.uiObj);

        keys.forEach((param, i) => {
            this.uiObj[param].state = false;
            this.pointsFolder.children[i].updateDisplay();
            if (this.pointsFolder.children[i]._disabled) this.pointsFolder.children[i].enable();
        });
    
        if (val) {
            keys.forEach((param, i) => {
                this.pointsFolder.children[i].disable();
            });

            this.uiObj[point].state = val;
            this.pointsFolder.children[index].enable();
            this.pointsFolder.children[index].updateDisplay();
        }

        this.experience.trigger("stateChanged", [point, val]);
    }

    showUpdateButton() {
        const btnUI = { update: () => this.experience.trigger("updateMakeLines")}
        this.pointsFolder.add(btnUI, "update");
    }
}