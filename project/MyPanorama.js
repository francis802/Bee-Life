import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPanorama extends CGFobject {

    constructor(scene, panorama_texture) {
        super(scene);
        this.sphere = new MySphere(scene, 200, 20, 20, true); // Sphere inside
        this.panorama_texture = panorama_texture;
        this.initBuffers();
    }

    initBuffers() {
        this.sphere.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.panorama_texture.bind();
        this.sphere.display();
        this.scene.popMatrix();
      }


}