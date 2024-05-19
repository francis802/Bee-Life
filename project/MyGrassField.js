import { CGFappearance, CGFobject, CGFshader, CGFtexture } from '../lib/CGF.js';
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
        this.createField();

        this.grassMaterial = new CGFappearance(scene);
        this.grassTexture = new CGFtexture(scene, "images/grass_texture.jpg");
        this.grassMaterial.setTexture(this.grassTexture);
        this.grassMaterial.setTextureWrap('MIRROR', 'MIRROR');
        this.grassMaterial.setDiffuse(0, 0.6, 0, 1);

        this.windShader = new CGFshader(this.scene.gl, "shaders/wind.vert", "shaders/wind.frag");
    }

    randomMinMax(min, max){
        return Math.random()*(max - min) + min;
    }

    randomInt(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    }

    createField(){
        for (let i = 0; i < this.grassSize; i++){
            var row = [];
            var row_heights = [];
            for (let j = 0; j < this.grassSize; j++){
                row.push(this.randomMinMax(0, 2*Math.PI));
                row_heights.push(this.randomMinMax(0.5, 1.1));

                this.grass.push(new MyGrass(this.scene));
            }
            this.grass_angles.push(row);
            this.grass_heights.push(row_heights);
        }
    }

    display(){
        this.scene.setActiveShader(this.windShader);
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
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(time) {
        this.windShader.setUniformsValues({timeFactor: time / 50000});
    }
}