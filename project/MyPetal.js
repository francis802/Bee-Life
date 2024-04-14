import {CGFobject} from '../lib/CGF.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPetal extends CGFobject {
	constructor(scene) {
		super(scene);
		
		this.triagle = new MyTriangle(scene);
		this.rotation_angle = 30;
	}

	display() {
		

		this.scene.pushMatrix();
		this.scene.rotate(-this.rotation_angle * Math.PI / 180, 1, 0, 0);
		this.triagle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(180 * Math.PI / 180, 1, 0, 0);
		this.triagle.display();
		this.scene.popMatrix();
	}
	

}
