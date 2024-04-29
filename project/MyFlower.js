import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MySphere } from './MySphere.js';

export class MyFlower extends CGFobject {
	constructor(scene, flowerRadius=2, numPetals=7, petalsColor=[2, 0, 1, 1], receptacleRadius=1, receptacleColor=[0, 1, 1, 1], stemRadius=0.1, numSubStem=6, stemColor=[0, 5, 0, 1], leafColor=[0, 1, 0, 1]) {
		super(scene);
        // Parameters:
        this.flowerRadius = flowerRadius;
        this.numPetals = numPetals;
        this.petalsColor = petalsColor;
        this.receptacleRadius = receptacleRadius;
        this.receptacleColor = receptacleColor;
        this.stemRadius = stemRadius;
        this.numSubStem = numSubStem;
        this.stemColor = stemColor;
        this.leafColor = leafColor;
        this.lenghtPetals = flowerRadius - receptacleRadius;

        // Objects:
        var stacks = 20;
        var slices = 20;
        this.receptacle = new MySphere(scene, this.receptacleRadius, slices, stacks, false);
        this.petal = new MyPetal(scene, this.lenghtPetals);
        this.stem = new MyStem(scene, slices, stacks, this.stemRadius, this.numSubStem, this.stemColor, this.leafColor);  
	}

    
	display(){
        
        // Stem:
        this.scene.pushMatrix(); 
        this.stem.display();
        this.scene.popMatrix();
       
        // Receptacle:
        var stemHeight = 0;
        for (let i = 0; i < this.stem.numSubStem; i++) {
            stemHeight += this.stem.heights[i]*Math.cos(this.stem.angles[i]);
        }
        this.scene.pushMatrix();
        this.scene.translate(0,stemHeight+this.receptacle.radius,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.setDiffuse(this.receptacleColor[0],this.receptacleColor[1],this.receptacleColor[2], this.receptacleColor[3]);
        this.receptacle.display();
        this.scene.popMatrix();

        // Petals:
        let radius = this.receptacleRadius + this.lenghtPetals/2;

    // Calcular o ângulo de cada pétala
    let angleIncrement = (Math.PI * 2) / this.numPetals;

    // Altura onde as pétalas devem começar no plano XY
    let startY = 0;

    // Exibir as pétalas
    for (let i = 0; i < this.numPetals; i++) {
        let angle = i * angleIncrement +  0.3;

        // Calcular as coordenadas x e y da posição da pétala no plano XY
        let x = Math.cos(angle) * (radius);
        let y = Math.sin(angle) * (radius);

        // Calcular o ângulo de orientação da pétala
        let orientationAngle = angle + Math.PI / 2;

        // Exibir a pétala na posição calculada
        this.scene.pushMatrix();
        this.scene.translate(x, y+stemHeight+this.receptacle.radius, startY+0.5);
        this.scene.rotate(Math.PI, 0, 0, 0); // Orientar a pétala para cima
        this.scene.rotate(orientationAngle, 0, 0, 1); // Orientar a pétala para que uma das pontas aponte para o centro da circunferência
        this.scene.setDiffuse(this.petalsColor[0], this.petalsColor[1], this.petalsColor[2], this.petalsColor[3]);
        this.petal.display();
        this.scene.popMatrix();
    }
    
    
    }
}

