import { CGFobject } from '../../lib/CGF.js';
import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 200, 20, 20, true); // Sphere inside
        this.panoramaMaterial = new CGFappearance(scene);
        this.panoramaTexture = new CGFtexture(this.scene, 'images/panorama4.jpg');
        this.panoramaMaterial.setTexture(this.panoramaTexture);
        this.panoramaMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    initBuffers() {
        this.sphere.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.panoramaMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
      }


}