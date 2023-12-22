import * as THREE from 'three';
import Experience from '../Experience';

/**
 * point1 should be the point at which you want to draw the plane at.
 */
export default class Plane {
    constructor(point1, point2) {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.drawPlane(point1, point2);
    }

    drawPlane(point1, point2) {
        const direction = new THREE.Vector3().subVectors(point2, point1).normalize();
        const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(direction, point1)

        const geometry = new THREE.PlaneGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 'yellow', transparent: true, opacity: 0.5, side: THREE.DoubleSide });

        this.planeMesh = new THREE.Mesh(geometry, material);
        const { normal } = plane;
        this.planeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        this.planeMesh.position.copy(point1);

        this.experience.addObject(this.planeMesh);
    }
}