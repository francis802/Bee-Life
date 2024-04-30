import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyRock } from './MyRock.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRockSet extends CGFobject {
    constructor(scene, rockTexture) {
        super(scene);
        this.rockTexture = rockTexture;
        this.stones = [];
        this.stoneScales = [];
        this.stoneRotations = [];
        this.createRockPile();
    }

    randomMinMax(min, max){
        return Math.random()*(max - min) + min;
    }

    randomInt(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    createRockPile(){
        var baseSize = 5;
        while (baseSize > 0){
            var stoneLevel = [];
            var stoneScaleLevel = [];
            var stoneRotationLevel = [];
            for (let i = 0; i < baseSize*baseSize; i++){
                var stoneSize = this.randomMinMax(1, 2);
                stoneScaleLevel.push([this.randomMinMax(0.5, 1.5), this.randomMinMax(0.5, 1.5), this.randomMinMax(0.5, 1.5)]);
                stoneRotationLevel.push(this.randomMinMax(0, 2*Math.PI));
                stoneLevel.push(new MyRock(this.scene, stoneSize, 20, 20));
            }
            this.stones.push(stoneLevel);
            this.stoneScales.push(stoneScaleLevel);
            this.stoneRotations.push(stoneRotationLevel);
            baseSize--;
        }
    }

    display(){
        var originPile = [-50, -100, -50];
        for (let i = 0; i < this.stones.length; i++){
            var stoneLevel = this.stones[i];
            var stoneScaleLevel = this.stoneScales[i];
            var stoneRotationLevel = this.stoneRotations[i];
            var baseSize = Math.sqrt(stoneLevel.length);
            for (let j = 0; j < stoneLevel.length; j++){
                this.scene.pushMatrix();
                this.rockTexture.bind();
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
                this.scene.translate(originPile[0] + Math.floor(j/baseSize)*3, originPile[1], originPile[2] + (j%baseSize)*3);
                this.scene.scale(stoneScaleLevel[j][0], stoneScaleLevel[j][1], stoneScaleLevel[j][2]);
                this.scene.rotate(stoneRotationLevel[j], 0, 1, 0);
                stoneLevel[j].display();
                this.scene.popMatrix();
            }
            originPile = [originPile[0] + 1.5, originPile[1] + 3, originPile[2] + 1.5];
        }
    }
}