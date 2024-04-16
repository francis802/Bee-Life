import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radiumStem=0.5) {
        super(scene);
        this.cylinder = new MyCylinder(scene, slices, stacks);
        this.radiumStem = radiumStem;
    }

    display(){
        this.scene.pushMatrix(); 
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(this.radiumStem,this.radiumStem,5);
        this.scene.setDiffuse(0, 5, 0, 5);
        this.cylinder.display();
        this.scene.popMatrix();
    }
}