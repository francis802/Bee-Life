import {CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene, stemRadius=0.1) {
		super(scene);
		
		this.triagle = new MyTriangle(scene);
        this.leafStem = new MyCylinder(scene, 20, 20);
		this.rotation_angle = 30;
        this.stemRadius = stemRadius;
	}

	display() {
		
		this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stemRadius*5);
		this.scene.rotate(-this.rotation_angle * Math.PI / 180, 1, 0, 0);
		this.triagle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stemRadius*5);
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.triagle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stemRadius*5);
        this.scene.scale(this.stemRadius, this.stemRadius, this.stemRadius*5);
        this.leafStem.display();
        this.scene.popMatrix();

	}
	

}

