import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radiumStem, numSubStem) {
        super(scene);
        this.cylinder = new MyCylinder(scene, slices, stacks);
        this.radiumStem = radiumStem;
        this.numSubStem = numSubStem;
        this.leaf = new MyPetal(scene);
        this.heights = [];
        this.angles = [];
        this.createRandomStem();
    }

    createRandomStem(){
        var minSubStem = 1;
        var maxSubStem = 5;
        var minAngle = 0;
        var maxAngle = Math.PI/4;
        var sumAngles = 0;
        var sumHeightsZ = 0;
        for (let i= 0; i < this.numSubStem - 1; i++){
            this.angles.push(Math.random()*(maxAngle - minAngle) + minAngle);
            if (i%2 == 0){
                sumAngles += this.angles[i];
            }
            else{
                sumAngles -= this.angles[i];
            }
        }
        this.angles.push((sumAngles)%(Math.PI/2));

        for (let i = 0; i < this.numSubStem - 1; i++){
            this.heights.push(Math.random()*(maxSubStem - minSubStem) + minSubStem);
            if (i%2 == 0){
                sumHeightsZ += this.heights[i]*Math.cos(this.angles[i]);
            }
            else{
                sumHeightsZ -= this.heights[i]*Math.cos(this.angles[i]);
            }
        }
        this.heights.push(Math.abs(sumHeightsZ)/Math.cos(this.angles[this.numSubStem-1]));
    }

    display(){
        var i = 0;
        var totalHeight = 0;
        var deltaZ = 0;
        while (i < this.numSubStem){
            var adjustY = this.radiumStem*Math.sin(this.angles[i]);
            var adjustZ = this.radiumStem*Math.cos(this.angles[i]);

            if (i%2 == 0){
                this.scene.pushMatrix();
                this.scene.translate(0,totalHeight,deltaZ + this.radiumStem - adjustZ);
                this.scene.rotate(-Math.PI/2-this.angles[i],1,0,0);
                var height1 = this.heights[i];
                this.scene.scale(this.radiumStem,this.radiumStem,height1);
                this.scene.setDiffuse(0, 5, 0, 5);
                this.cylinder.display();
                this.scene.popMatrix();
                totalHeight += height1*Math.cos(this.angles[i]) - adjustY;
            }
            else {
                this.scene.pushMatrix();
                var height2 = this.heights[i];
                deltaZ += this.heights[i]*Math.sin(this.angles[i]) - this.heights[i-1]*Math.sin(this.angles[i-1]);
                totalHeight += height2*Math.cos(this.angles[i]) - adjustY;
                this.scene.translate(0,totalHeight,deltaZ + this.radiumStem - adjustZ);
                this.scene.rotate(Math.PI/2+this.angles[i],1,0,0);
                this.scene.scale(this.radiumStem,this.radiumStem,height2);
                this.scene.setDiffuse(0, 5, 0, 5);
                this.cylinder.display();
                this.scene.popMatrix();
            }
            i++;
            
        }
        /*
        var adjustY = this.radiumStem*Math.sin(this.angleStem);
        var adjustZ = this.radiumStem*Math.cos(this.angleStem);
        var height1 = 0;

        var i = 0;
        var totalHeight = 0;
        if (this.heightStem%2 == 1){
            this.scene.pushMatrix();
            this.scene.rotate(-Math.PI/2,1,0,0);
            height1 = this.heights[i];
            this.scene.scale(this.radiumStem,this.radiumStem,height1);
            this.scene.setDiffuse(0, 5, 0, 5);
            this.cylinder.display();
            this.scene.popMatrix();
            i = 1;
        }
        while (i < this.heightStem){
            // Pos curve of the stem
            this.scene.pushMatrix();
            
            if(i == 1) {
                totalHeight += height1 - adjustY;
            }
            this.scene.translate(0,totalHeight,this.radiumStem - adjustZ);
            this.scene.rotate(-Math.PI/2-this.angleStem,1,0,0);
            var height2 = this.heights[i];
            this.scene.scale(this.radiumStem,this.radiumStem,height2);
            this.scene.setDiffuse(0, 5, 0, 5);
            this.cylinder.display();
            this.scene.popMatrix();

            
            // Neg curve of the stem
            this.scene.pushMatrix();
            totalHeight += 2*(height2*Math.cos(this.angleStem) - adjustY);
            this.scene.translate(0,totalHeight, this.radiumStem - adjustZ);
            this.scene.rotate(Math.PI/2+this.angleStem,1,0,0);
            this.scene.scale(this.radiumStem,this.radiumStem,height2);
            this.scene.setDiffuse(0, 5, 0, 5);
            this.cylinder.display();
            this.scene.popMatrix();
            i += 2;
        }
        */
    }
}