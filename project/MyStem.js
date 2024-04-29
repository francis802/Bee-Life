import { CGFobject } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MyLeaf } from './MyLeaf.js';
import { MyPetal } from './MyPetal.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radiumStem, numSubStem, stemColor, leafColor) {
        super(scene);
        this.cylinder = new MyCylinder(scene, slices, stacks);
        this.radiumStem = radiumStem;
        this.numSubStem = numSubStem;
        this.stemColor = stemColor;
        this.leafColor = leafColor;
        this.leaf = new MyLeaf(scene, radiumStem);
        this.heights = [];
        this.angles = [];
        this.createRandomStem();
    }

    createRandomStem(){
        var minSubStem = 1;
        var maxSubStem = 3.5;
        var minAngle = 0;
        var maxAngle = Math.PI/6;
        var sumAngles = 0;
        var sumHeightsZ = 0;
        var maxHeightZ = maxSubStem*Math.sin(maxAngle);
        let i = 0;
        while(i < this.numSubStem - 2){
            var angle = Math.random()*(maxAngle - minAngle) + minAngle;
            if (i%2 == 0){
                if (sumAngles + angle > maxAngle){
                    angle = maxAngle - sumAngles - Math.random()*(maxAngle - sumAngles);
                }
                sumAngles += angle;
                
            }
            else{
                if (sumAngles - angle < -maxAngle){
                    angle = maxAngle + sumAngles - Math.random()*(maxAngle + sumAngles);
                }
                sumAngles -= angle;
            }
            this.angles.push(angle)
            i++;
        }
        i = 0;
        while( i < this.numSubStem - 2){
            var height = Math.random()*(maxSubStem - minSubStem) + minSubStem;
            if (i%2 == 0){
                if (sumHeightsZ + height*Math.sin(this.angles[i]) > maxHeightZ){
                    height = (maxHeightZ - sumHeightsZ - Math.random()*(maxHeightZ - sumHeightsZ))/Math.sin(this.angles[i]);
                }
                sumHeightsZ += height*Math.sin(this.angles[i]);
            }
            else{
                if (sumHeightsZ - height*Math.sin(this.angles[i]) < -maxHeightZ){
                    height = (maxHeightZ + sumHeightsZ - Math.random()*(maxHeightZ + sumHeightsZ))/Math.sin(this.angles[i]);
                }
                sumHeightsZ -= height*Math.sin(this.angles[i]);
            }
            this.heights.push(height);
            i++;
        }
        if (this.numSubStem != 1){
            if ((this.numSubStem%2 == 0 && sumHeightsZ >0) || (this.numSubStem%2 != 0 && sumHeightsZ < 0)){
                this.heights.push(Math.random()*(maxSubStem - minSubStem) + minSubStem);
                this.angles.push(0);
                this.heights.push(Math.abs(sumHeightsZ)/Math.sin(maxAngle));
                this.angles.push(maxAngle);
            }
            else{
                this.heights.push(Math.abs(sumHeightsZ)/Math.sin(maxAngle));
                this.angles.push(maxAngle);
                this.heights.push(Math.random()*(maxSubStem - minSubStem) + minSubStem);
                this.angles.push(0);
            }
        }
        else {
            this.heights.push(Math.random()*(maxSubStem - minSubStem) + minSubStem);
            this.angles.push(0);
        }
    }

    display(){
        var i = 0;
        var totalHeight = 0;
        var deltaZ = 0;
        while (i < this.numSubStem){
            var adjustY = this.radiumStem*Math.sin(this.angles[i]);
            var adjustZ = this.radiumStem*Math.cos(this.angles[i]);

            if (i%2 == 0){
                if (i != 0 && i != this.numSubStem - 1 && this.heights[i] > 1){
                    this.scene.pushMatrix();
                    this.scene.translate(0,totalHeight,deltaZ + this.radiumStem - adjustZ);
                    this.scene.scale(0.4,0.4,0.4);
                    this.scene.rotate(Math.PI,Math.PI,Math.PI*3/4,0);
                    this.leaf.display();
                    this.scene.popMatrix();
                }
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
                if (i != this.numSubStem - 1 && this.heights[i] > 1){
                    this.scene.pushMatrix();
                    this.scene.translate(0,totalHeight,deltaZ + this.radiumStem - adjustZ - this.heights[i-1]*Math.sin(this.angles[i-1]));
                    this.scene.scale(0.4,0.4,0.4);
                    this.scene.rotate(0,-Math.PI/2,Math.PI*3/4,0);
                    this.leaf.display();
                    this.scene.popMatrix();
                }
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