import {CGFtexture, CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyStem } from './MyStem.js';
import { MySphere } from './MySphere.js';
import { MyPollen } from './MyPollen.js';

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
        this.position = []

        
        var stacks = 20;
        var slices = 20;

        // Receptacle:
        this.receptacle = new MySphere(scene, this.receptacleRadius, slices, stacks, false);
        this.receptacleMaterial = new CGFappearance(scene);
        this.receptacleTexture = new CGFtexture(scene, "images/receptacle_texture.jpg");
        this.receptacleMaterial.setTexture(this.receptacleTexture);
        this.receptacleMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacleMaterial.setDiffuse(this.receptacleColor[0],this.receptacleColor[1],this.receptacleColor[2], this.receptacleColor[3]);
        
        // Petals:
        this.petal = new MyPetal(scene, this.lenghtPetals);
        this.petalMaterial = new CGFappearance(scene);
        this.petalTexture = new CGFtexture(scene, "images/white_petal.jpg");
        this.petalMaterial.setTexture(this.petalTexture);
        this.petalMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.petalMaterial.setDiffuse(this.petalsColor[0], this.petalsColor[1], this.petalsColor[2], this.petalsColor[3]);
        
        // Stem:
        this.stem = new MyStem(scene, slices, stacks, this.stemRadius, this.numSubStem, this.stemColor, this.leafColor);  
        this.stemMaterial = new CGFappearance(scene);
        this.stemTexture = new CGFtexture(scene, "images/stem_texture.jpg");
        this.stemMaterial.setTexture(this.stemTexture);
        this.stemMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.stemMaterial.setDiffuse(this.stemColor[0],this.stemColor[1],this.stemColor[2], this.stemColor[3]);

        this.stemHeight = 0;
        for (let i = 0; i < this.stem.numSubStem; i++) {
            this.stemHeight += this.stem.heights[i]*Math.cos(this.stem.angles[i]);
        }

        // Pollen:
        this.pollen = new MyPollen(scene, 0.3, 20, 20, 2, 1);
        this.hasPollen = true;
        this.pollenMaterial = new CGFappearance(scene);
        this.pollenTexture = new CGFtexture(scene, "images/polen.jpg");
        this.pollenMaterial.setTexture(this.pollenTexture);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenMaterial.setDiffuse(1, 1, 1, 1);
	}

    isNear(position){
        //console.log("flower: ", this.position);
        // Distância euclidiana em x e z
        let dx = this.position[0] - position[0];
        let dz = this.position[2] - position[2];
        let distanceXZ = Math.sqrt(dx * dx + dz * dz);
    
        // Verifica se a distância em xz é menor ou igual
        let isWithinXZ = distanceXZ <= this.receptacleRadius + this.lenghtPetals + 2;
    
        // Verifica se a posição y está dentro da altura do objeto
        let isWithinHeight = Math.abs(position[1] - (this.position[1]+this.stemHeight+this.receptacleRadius)) <= this.receptacleRadius + this.lenghtPetals + 1;
        //console.log("Height: ", thisposition[1]+this.stemHeight+this.receptacleRadius);
        //console.log("Bee Height: ", isWithinHeight);
        return isWithinXZ && isWithinHeight;
    }

    setPosition(position){
        this.position = position;
    }
    
	display(){
        
        // Stem:
        this.scene.pushMatrix(); 
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();
       
        // Receptacle:
        this.scene.pushMatrix();
        this.scene.translate(0,this.stemHeight+this.receptacle.radius,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.receptacleMaterial.apply();
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
        this.scene.translate(x, y+this.stemHeight+this.receptacle.radius, startY+0.5);
        this.scene.rotate(Math.PI, 0, 0, 0); // Orientar a pétala para cima
        this.scene.rotate(orientationAngle, 0, 0, 1); // Orientar a pétala para que uma das pontas aponte para o centro da circunferência
        this.petalMaterial.apply();
        this.petal.display();
        this.scene.popMatrix();
    }

        // Pollen:
        if(this.hasPollen){
            this.scene.pushMatrix();
            this.scene.translate(0, this.stemHeight+this.receptacle.radius, this.receptacle.radius);
            this.pollenMaterial.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }
        
    
    
    }
}

