import {CGFobject} from '../lib/CGF.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrass extends CGFobject {
	constructor(scene) {
		super(scene);
        this.lenghtGrass=1
		this.triangle = new MyTriangle(scene, this.lenghtGrass);
	}

	display() {
		

		this.scene.pushMatrix();
        this.scene.scale(0.5,1,1);
		this.triangle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.lenghtGrass/2,this.lenghtGrass*2,0);
        this.scene.scale(0.5,1,1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.lenghtGrass/2,this.lenghtGrass*2,0);
        this.scene.scale(0.5,3,1);
        this.triangle.display();
        this.scene.popMatrix();
        
        /*
        this.scene.pushMatrix();
        this.scene.translate(-this.lenghtGrass + this.lenghtGrass/4,this.lenghtGrass*8,0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.atan(3/(0.25/2)) - Math.atan(3/(0.5/2)), 0, 0, 1)
        this.scene.scale(0.25,3,1);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-this.lenghtGrass + this.lenghtGrass/4,this.lenghtGrass*8,0);
        this.scene.scale(0.25,1,1);
        this.triangle.display();
        this.scene.popMatrix();
        */
	}
	

}

