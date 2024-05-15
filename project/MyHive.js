import { CGFobject } from '../../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { MyUnitCube } from '../tp3/MyUnitCube.js';
import { MyHiveBody } from './MyHiveBody.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyHiveBody(scene, 1, 20, 20);
        this.balcony = new MyUnitCube(scene);
        this.base = new MyUnitCube(scene);

        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setTexture(this.scene.hiveTexture);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.dirtMaterial = new CGFappearance(this.scene);
        this.dirtMaterial.setTexture(this.scene.dirtTexture);
        this.dirtMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(4, 4, 4);
        this.hiveMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(4, 0.4, 4);
        this.scene.translate(0, -2.5, 1);
        this.dirtMaterial.apply();
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 0.2, 0.8);
        this.scene.translate(0, 9, -4);
        this.dirtMaterial.apply();
        this.balcony.display();
        this.scene.popMatrix();

    }
}