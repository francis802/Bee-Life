import {CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MySphere } from './MySphere.js';

export class MyFlower extends CGFobject {
	constructor(scene) {
		super(scene);
        this.receptacle = new MySphere(scene, 2, 20, 20, false);
        this.petals = [];
        for (let i = 0; i < 5; i++) {
            this.petals.push(new MyPetal(scene));
        }
        
        this.stem = new MyStem(scene, 20, 20);   
	}

    
	display(){
        
        // Stem:
        this.scene.pushMatrix(); 
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,5);
        this.stem.display();
        this.scene.popMatrix();
        
       
        // Receptacle:
        this.scene.pushMatrix();
        this.scene.translate(0,6,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.receptacle.display();
        this.scene.popMatrix();

        // Petals:
        let radius = 3;

    // Calcular o ângulo de cada pétala
    let angleIncrement = (Math.PI * 2) / (this.petals.length);

    // Altura onde as pétalas devem começar no plano XY
    let startY = 0;

    // Exibir as pétalas
    for (let i = 0; i < this.petals.length; i++) {
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
        this.petals[i].display();
        this.scene.popMatrix();
    }
    
    }
}

