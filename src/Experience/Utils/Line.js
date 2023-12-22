import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import Experience from "../Experience";
import Plane from "./Plane";

const typeOfLinesMadeFrom = {
    mechanicalAxis: ["femurCenter", "hipCenter"],
    anatomicalAxis: ["femurProximalCanal", "femurDistalCanal"],
    TransEpicondyleAxis: ["medialEpicondyle", "lateralEpicondyle"],
    PosteriorCondyleAxis: ["posteriorMedialPt", "posteriorLateralPt"],
};

export default class Line {
    constructor(type) {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.debug = this.experience.debug;

        this.point1 = this.debug.uiObj[typeOfLinesMadeFrom[type][0]].pointInstance;
        this.point2 = this.debug.uiObj[typeOfLinesMadeFrom[type][1]].pointInstance;

        this.makeLine();

        if (type === "mechanicalAxis") {
            this.plane = new Plane(this.point1.pointMesh.position, this.point2.pointMesh.position);
        }

        this.experience.time.on("tick", () => {
            this.update(this.point1);
        });
    }

    makeLine() {
        if (this.point1 && this.point2) {
            const position1 = this.point1.pointMesh.position;
            const position2 = this.point2.pointMesh.position;

            const geometry = new LineGeometry();
            geometry.setPositions([
                position1.x, position1.y, position1.z,
                position2.x, position2.y, position2.z,
            ]);
            this.material = new LineMaterial({
                color: "red",
                worldUnits: true,
                linewidth: 0.01,
                dashed: false,
                vertexColors: false,
                alphaToCoverage: true,
                depthTest: false,
                depthWrite: false,
            });

            this.lineMesh = new Line2(geometry, this.material);
            this.lineMesh.computeLineDistances();
            this.experience.addObject(this.lineMesh);
        }
    }

    update() {
        this.material?.resolution?.set(this.sizes.width, this.sizes.height);
    }

    destroy() {
        this.scene.remove(this.lineMesh);
        this.lineMesh = null;

        if (this.plane) {
            this.plane.planeMesh.geometry.dispose();
            this.plane.planeMesh.material.dispose();
            this.scene.remove(this.plane.planeMesh);
            this.plane.planeMesh = null;
            this.plane = null;
        }
    }
}
