import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MySphere } from './MySphere.js';

export class MyFlower extends CGFobject {
	constructor(scene, radiumFlower=1, numPetals=15, colorPetals=[2, 0, 1], radiumReceptacle=2, colorReceptacle=[2, 2, 0], radiumStem=0.5, heightStem=0, coloStem=[0, 5, 0]) {
		super(scene);
        // Parameters:
        this.numPetals = numPetals; 
        this.radiumStem = radiumStem;
        this.lenghtPetals = radiumFlower - radiumReceptacle;
        this.coloStem = coloStem;
        this.colorReceptacle = colorReceptacle;
        this.colorPetals = colorPetals;

        // Objects:
        this.receptacle = new MySphere(scene, radiumReceptacle, 20, 20, false);
        this.petal = new MyPetal(scene, this.lenghtPetals);
        this.stem = new MyStem(scene, 20, 20);  
	}

    
	display(){
        
        // Stem:
        this.scene.pushMatrix(); 
        this.stem.display();
        this.scene.popMatrix();
        
       
        // Receptacle:
        this.scene.pushMatrix();
        this.scene.translate(0,6,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.setDiffuse(2, 2, 0, 5);
        this.receptacle.display();
        this.scene.popMatrix();

        // Petals:
        let radius = 3;

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
        this.scene.translate(x, y+6, startY+0.5);
        this.scene.rotate(Math.PI, 0, 0, 0); // Orientar a pétala para cima
        this.scene.rotate(orientationAngle, 0, 0, 1); // Orientar a pétala para que uma das pontas aponte para o centro da circunferência
        this.scene.setDiffuse(2, 0, 1, 5);
        this.petal.display();
        this.scene.popMatrix();
    }
    
    }
}

