import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGarden extends CGFobject {
    constructor(scene, nflowers) {
        super(scene);
        this.flower = new MyFlower(scene);
        this.nflowers = nflowers;
        this.flowers_angles = []
        this.createGarden();
    }

    createGarden(){
        for (let i = 0; i < this.nflowers; i++){
            var row = [];
            for (let j = 0; j < this.nflowers; j++){
                row.push(Math.random() * 360);
            }
            this.flowers_angles.push(row);
        }
    }

    display(){
        for (let i = 0; i < this.nflowers; i++){
            for (let j = 0; j < this.nflowers; j++){
                this.scene.pushMatrix();
                this.scene.translate(0, -100, 0);
                this.scene.rotate(this.flowers_angles[i][j], 0, 1, 0);
                this.scene.translate(i*20,0,j*20);
                this.flower.display();
                this.scene.popMatrix();
            }
        }
    }
}