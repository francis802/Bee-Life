import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPollen extends CGFobject {

    constructor(scene, polen_texture) {
        super(scene);
        this.polenShape = new MySphere(scene, 0.3, 20, 20, false, 2, 1); // Sphere inside
        this.polen_texture = polen_texture;
        this.initBuffers();
    }

    initBuffers() {
        this.polenShape.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.polen_texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.polenShape.display();
        this.scene.popMatrix();
      }


}