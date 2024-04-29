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
        this.panorama_texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.sphere.display();
        this.scene.popMatrix();
      }


}