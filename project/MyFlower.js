import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MySphere } from './MySphere.js';

export class MyFlower extends CGFobject {
	constructor(scene, lenghtPetals=1, numPetals=7, colorPetals=[2, 0, 1], radiumReceptacle=1, colorReceptacle=[0, 1, 1], radiumStem=0.1, heightStem=6, coloStem=[0, 5, 0]) {
		super(scene);
        // Parameters:
        this.numPetals = numPetals; 
        this.radiumStem = radiumStem;
        this.lenghtPetals = lenghtPetals;
        this.coloStem = coloStem;
        this.colorReceptacle = colorReceptacle;
        this.colorPetals = colorPetals;
        this.heightStem = heightStem;

        // Objects:
        var stacks = 20;
        var slices = 20;
        this.receptacle = new MySphere(scene, radiumReceptacle, slices, stacks, false);
        this.petal = new MyPetal(scene, this.lenghtPetals);
        this.stem = new MyStem(scene, slices, stacks, this.radiumStem, this.heightStem);  
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
        this.scene.setDiffuse(this.colorReceptacle[0],this.colorReceptacle[1],this.colorReceptacle[2], 0);
        this.receptacle.display();
        this.scene.popMatrix();

        // Petals:
        let radius = this.receptacle.radius + this.lenghtPetals/2;

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
        this.scene.setDiffuse(2, 0, 1, 5);
        this.petal.display();
        this.scene.popMatrix();
    }
    
    
    }
}

