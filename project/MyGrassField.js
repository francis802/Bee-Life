import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
import { MyGrass } from './MyGrass.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassField extends CGFobject {
    constructor(scene) {
        super(scene);
        this.grass = [];
        this.grass_angles = []
        this.grassSize = 50;
        this.createGarden();
    }

    randomMinMax(min, max){
        return Math.random()*(max - min) + min;
    }

    randomInt(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    createGarden(){
        for (let i = 0; i < this.grassSize; i++){
            var row = [];
            for (let j = 0; j < this.grassSize; j++){
                row.push(this.randomMinMax(-Math.PI/4, Math.PI/4));

                this.grass.push(new MyGrass(this.scene));
            }
            this.grass_angles.push(row);
        }
    }

    display(){
        for (let i = 0; i < this.grassSize; i++){
            for (let j = 0; j < this.grassSize; j++){
                this.scene.pushMatrix();
                this.scene.translate(0, 0, 0);
                this.scene.translate(-i*20,0,j*20);
                this.scene.rotate(this.grass_angles[i][j], 0, 1, 0);
                this.grass[i*this.grassSize + j].display();
                this.scene.popMatrix();
            }
        }
    }
}