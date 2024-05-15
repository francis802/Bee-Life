import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
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
        this.grass_angles = [];
        this.grass_heights = [];
        this.grassSize = 50;
        this.createGarden();

        this.grassMaterial = new CGFappearance(scene);
        this.grassTexture = new CGFtexture(scene, "images/grass_texture.jpg");
        this.grassMaterial.setTexture(this.grassTexture);
        this.grassMaterial.setTextureWrap('MIRROR', 'MIRROR');
        this.grassMaterial.setDiffuse(0, 0.6, 0, 1);
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
            var row_heights = [];
            for (let j = 0; j < this.grassSize; j++){
                row.push(this.randomMinMax(-Math.PI/4, Math.PI/4));
                row_heights.push(this.randomMinMax(0.5, 1.1));

                this.grass.push(new MyGrass(this.scene));
            }
            this.grass_angles.push(row);
            this.grass_heights.push(row_heights);
        }
    }

    display(){
        for (let i = 0; i < this.grassSize/2; i++){
            for (let j = 0; j < this.grassSize/2; j++){
                this.scene.pushMatrix();
                this.scene.translate(0, -100, 0);
                this.scene.translate(20 + 2*i,0,-20 -2*j);
                this.scene.scale(1, this.grass_heights[i][j], 1);
                this.scene.rotate(this.grass_angles[i][j], 0, 1, 0);
                this.grassMaterial.apply();
                this.grass[i*this.grassSize + j].display();
                this.scene.popMatrix();
            }
        }
    }
}