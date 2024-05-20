import {CGFobject} from '../lib/CGF.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene, lenghtPetal=1) {
		super(scene);
		
		this.triagle = new MyTriangle(scene, lenghtPetal);
		this.rotation_angle = 30;
	}

	display() {
		this.scene.pushMatrix();
		this.scene.rotate(-this.rotation_angle * Math.PI / 180, 1, 0, 0);
		this.triagle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.triagle.display();
		this.scene.popMatrix();
	}
	

}

