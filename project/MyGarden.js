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
        this.flowers = [];
        this.nflowers = nflowers;
        this.flowers_angles = []
        this.createGarden();
    }

    randomMinMax(min, max){
        return Math.random()*(max - min) + min;
    }

    randomInt(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    createGarden(){
        for (let i = 0; i < this.nflowers; i++){
            var row = [];
            for (let j = 0; j < this.nflowers; j++){
                row.push(Math.random() * 360);
                var receptacleRadius = this.randomMinMax(1, 2);
                var flowerRadius = this.randomMinMax(receptacleRadius + 1, receptacleRadius + 4);
                var numPetals = this.randomInt(5, 10);
                var stemRadius = this.randomMinMax(0.1, 0.3);
                var numSubStem = this.randomInt(3, 8);
                let leafColors = [[0, 1, 0, 1], [0, 1, 1, 1], [1, 1, 0, 1]];
                let stemColors = [[0, 5, 0, 1], [0, 5, 1, 1], [1, 5, 0, 1]];
                let petalsColors = [[2, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [4, 0, 0, 1]];
                let receptacleColors = [[1, 1, 1, 1], [1, 1, 0, 1], [2, 0, 0, 1], [1, 0, 1, 1]];

                this.flowers.push(new MyFlower(this.scene, flowerRadius, numPetals, petalsColors[this.randomInt(0,3)], receptacleRadius, receptacleColors[this.randomInt(0,3)], stemRadius, numSubStem, stemColors[this.randomInt(0,2)], leafColors[this.randomInt(0,2)]));
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
                this.flowers[i*this.nflowers + j].display();
                this.scene.popMatrix();
            }
        }
    }
}