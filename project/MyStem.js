import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radiumStem=0.1, heightStem=6, angleStem=Math.PI/9) {
        super(scene);
        this.cylinder = new MyCylinder(scene, slices, stacks);
        this.radiumStem = radiumStem;
        this.heightStem = heightStem;
        this.angleStem = angleStem;
    }

    display(){
        // First part of the stem
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2,1,0,0);
        var height1 = this.heightStem/3+Math.tan(this.angleStem)*this.heightStem/6;
        this.scene.scale(this.radiumStem,this.radiumStem,height1);
        this.scene.setDiffuse(0, 5, 0, 5);
        this.cylinder.display();
        this.scene.popMatrix();

        // Second part of the stem
        this.scene.pushMatrix();
        this.scene.translate(0,height1,0);
        this.scene.rotate(-Math.PI/2-this.angleStem,1,0,0);
        var height2 = (this.heightStem - height1)/(2*Math.cos(this.angleStem));
        this.scene.scale(this.radiumStem,this.radiumStem,height2);
        this.scene.setDiffuse(0, 5, 0, 5);
        this.cylinder.display();
        this.scene.popMatrix();

        
        // Third part of the stem
        this.scene.pushMatrix();
        this.scene.translate(0,height1+2*height2*Math.cos(this.angleStem),0);
        this.scene.rotate(Math.PI/2+this.angleStem,1,0,0);
        this.scene.scale(this.radiumStem,this.radiumStem,height2);
        this.scene.setDiffuse(0, 5, 0, 5);
        this.cylinder.display();
        this.scene.popMatrix();
        
    }
}