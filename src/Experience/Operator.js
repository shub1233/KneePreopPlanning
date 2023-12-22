import * as THREE from "three";
import Experience from "./Experience";
import Raycasting from "./Utils/Raycasting";
import Point from "./Utils/Point";
import Line from "./Utils/Line";

export default class Operator {
  constructor() {
    this.experience = new Experience();
    this.ui = this.experience.debug;
    this.allMeshesInScene = this.experience.allMeshesInScene;
    this.camera = this.experience.camera;
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.ray = new Raycasting();
    this.mouse = new THREE.Vector2(1, 1);
    this.currentActivePoint = null;

    // Make Ui
    this.ui.makeOperatorUI();

    this.axisLines = {
      mechanicalAxis: null,
      anatomicalAxis: null,
      TransEpicondyleAxis: null,
      PosteriorCondyleAxis: null,
    };

    // Listeners
    this.experience.on("stateChanged", this.onStateChanged);
    this.experience.on("updateMakeLines", this.createAxisLines);

    this.ray.on("pointerdown", (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
      this.checkIntersection();
    });
  }

  createAxisLines = () => {
    for (const axis in this.axisLines) {
      if (this.axisLines[axis]) {
        this.axisLines[axis].destroy();
      }

      this.axisLines[axis] = new Line(axis);
    }
  }

  onStateChanged = (state, value) => {
    if (value) {
      this.currentActivePoint = { ...this.ui.uiObj[state], type: state };
    } else {
      this.currentActivePoint = null;
    }
  }

  checkIntersection() {
    if (this.currentActivePoint && !this.currentActivePoint.isDirty) {
      this.ray.raycaster.setFromCamera(this.mouse, this.camera.camera);
      const intersects = this.ray.raycaster.intersectObjects(
        this.allMeshesInScene,
        true
      );

      if (intersects.length) {
        const newPoint = new Point(intersects[0].point, this.currentActivePoint.type);
        this.currentActivePoint.isDirty = true;
        this.ui.uiObj[this.currentActivePoint.type].isDirty = true;
        this.ui.uiObj[this.currentActivePoint.type].pointInstance = newPoint;
      }
    }
  }
}
