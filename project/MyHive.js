import {CGFtexture, CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyUnitCube } from '../tp3/MyUnitCube.js';
import { MyHiveBody } from './MyHiveBody.js';
import { MyPollen } from './MyPollen.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyHiveBody(scene, 1, 20, 20);
        this.balcony = new MyUnitCube(scene);
        this.base = new MyUnitCube(scene);

        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setTexture(this.scene.hiveTexture);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.dirtMaterial = new CGFappearance(this.scene);
        this.dirtMaterial.setTexture(this.scene.dirtTexture);
        this.dirtMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Pollen:
        this.pollen = new MyPollen(scene, 0.3, 20, 20, 2, 1);
        this.caughtPollen = 0;
        this.pollenMaterial = new CGFappearance(scene);
        this.pollenTexture = new CGFtexture(scene, "images/polen.jpg");
        this.pollenMaterial.setTexture(this.pollenTexture);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenMaterial.setDiffuse(1, 1, 1, 1);

        this.position = [];

        this.initBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(4, 4, 4);
        this.hiveMaterial.apply();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(4, 0.4, 4);
        this.scene.translate(0, -2.5, 1);
        this.dirtMaterial.apply();
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(2.5, 0.2, 1.6);
        this.scene.translate(0, 9, -2);
        this.dirtMaterial.apply();
        this.balcony.display();
        this.scene.popMatrix();

        if(this.caughtPollen){
            this.displayPollens();
        }

    }
    
    displayPollens() {
        // Limitar o número de polens a um máximo de 10
        const maxPollens = Math.min(this.caughtPollen, 18);

        // Iterar sobre o número de polens a serem exibidos
        for (let i = 0; i < maxPollens; i++) {
            // Calcular a posição na matriz 2x5
            let row = Math.floor(i / 9);
            let col = i % 9;
    
            // Calcular as coordenadas de tradução
            let x = col * 0.5;
            let z = row * 1.0;
    
            // Push matrix, translate, apply material, display pollen, pop matrix
            this.scene.pushMatrix();
            this.scene.translate(-2 + x, 2, -5.5 + z);
            this.pollenMaterial.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }
    }
    
    
    
    setPosition(pos){
        this.position = pos;
    }

    isNear(pos){
        if (Math.abs(pos[0] - this.position[0]) < 3 && Math.abs(pos[2] - this.position[2]) < 3){
            console.log("near");
            return true;
        }
        return false;
    }

    addPollen(){
        this.caughtPollen++;
    }
}
