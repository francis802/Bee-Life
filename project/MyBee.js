import {CGFtexture, CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';

export class MyBee extends CGFobject {
	constructor(scene, flowers, hive) {
		super(scene);
        this.sphere = new MySphere(scene, 1, 20, 20);
        this.flowers = flowers;
        this.hive = hive;
        

        // Head & Torax:
        this.upperBodyMaterial = new CGFappearance(scene);
        this.upperBodyTexture = new CGFtexture(scene, "images/bee_upper_body.png");
        this.upperBodyMaterial.setTexture(this.upperBodyTexture);
        this.upperBodyMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Abdomen:
        this.abdomenMaterial = new CGFappearance(scene);
        this.abdomenTexture = new CGFtexture(scene, "images/bee_body.jpg");
        this.abdomenMaterial.setTexture(this.abdomenTexture);
        this.abdomenMaterial.setTextureWrap('REPEAT', 'REPEAT');

        // Wings:
        this.wingsMaterial = new CGFappearance(scene);
        this.wingsTexture = new CGFtexture(scene, "images/bee_wings.jpg");
        this.wingsMaterial.setTexture(this.wingsTexture);
        this.wingsMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.wingsMaterial.setDiffuse(1,1,1, 0);
        this.wingsMaterial.setAmbient(1,1,1, 0);
        this.wingsMaterial.setSpecular(1,1,1, 0.1);
        this.wingsMaterial.setEmission(1,1,1, 0.3);

        // Eyes & legs & antennas:
        this.eyesMaterial = new CGFappearance(scene);
        this.eyesTexture = new CGFtexture(scene, "images/bee_eye.jpg");
        this.eyesMaterial.setTexture(this.eyesTexture);
        this.eyesMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.eyesMaterial.setDiffuse(0,0,0, 0);

        // Animation:
        this.wingsAngle = 0;
        this.wingsMovDown = true;

        this.translation = [0, 0, 0];
        this.orientation = 0; 
        this.speed = 0;
        this.velocity = [0,0,0];
        this.defaultPosition = [-50, -50, 0];
        this.position = [-50, -50, 0];
        this.isNearFlower = null;
        this.lastConfigurations = [this.position[1], this.speed, this.orientation]; // Last y, speed, orientation
        this.isGoingUp = false;
        this.Searching = false;
        this.goingToHive = false;
	}

    update(time, counterTime, movementInfo, speedFactor){
        // Body oscillation:
        if (counterTime >= 10 && counterTime < 20){
            this.position[1] -= 0.1;
            
        } 
        else if (counterTime <10){
            this.position[1] += 0.1;
            
        } 

        // Wing oscillation:
        if (this.wingsMovDown){
            this.wingsAngle -= Math.PI/4 ;
            this.wingsMovDown = false;
        } else {
            this.wingsAngle += Math.PI/4 ;
            this.wingsMovDown = true;
        }

        

        // Movement:
        if (movementInfo[0] != 0){   
            this.accelerate(movementInfo[0], speedFactor);
            
        }
        if (movementInfo[1] != 0 && !this.goingToHive){
            this.turn(movementInfo[1]);
        }
        
        if (this.goingToHive && (this.hive.isNear(this.position))){
            console.log("entered");
            this.speed = 0;
            this.goingToHive = false;
        }

        this.velocity[0] = this.speed*Math.cos(this.orientation);
        this.velocity[2] = -this.speed*Math.sin(this.orientation);

        this.position[0] += this.velocity[0]*(counterTime/5);
        this.position[2] += this.velocity[2]*(counterTime/5);
        
       
        if(this.goingToHive){
           
            this.position[1] += this.velocity[1]*(counterTime/5);
        }
    
        // Flower interaction:
        if (movementInfo[3] != 0 && !this.Searching){
            this.Searching = true;
            this.velocity[1] = this.speed;
            this.lastConfigurations[0] = this.position[1];
            this.lastConfigurations[1] = this.speed;
            this.lastConfigurations[2] = this.orientation;
        }
        
        
        if (this.Searching){
            this.position[1] -= this.velocity[1]*(counterTime/5);
            this.searchAround();  
        }

        if(movementInfo[4] && this.isNearFlower){
            console.log("Bee: ", this.position);
            this.isNearFlower.hasPollen = false;
            this.isGoingUp = true;
            this.velocity[1] = 0.2;
        }

        if (this.isGoingUp){
            if (this.position[1] <= this.lastConfigurations[0]){
                this.position[1] += this.velocity[1]*(counterTime/5);
            }
            else{
                console.log("Going up");
                this.speed = this.lastConfigurations[1];
                this.orientation = this.lastConfigurations[2];
                this.velocity[1] = 0;
                this.speed = this.lastConfigurations[1];
                this.Searching = false;
                this.isGoingUp = false;
                this.isNearFlower = null;
            }
        }
        
        if (movementInfo[5] != 0){
            console.log("Going to hive");
            this.goingToHive = true;
            var direction = [
                this.hive.position[0] - this.position[0],
                this.hive.position[1] - this.position[1],
                this.hive.position[2] - this.position[2]
            ];

            var distance = Math.sqrt(direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]);

            direction = [
                direction[0] / distance,
                direction[1] / distance,
                direction[2] / distance
            ];
        
            this.orientation = Math.atan2(-direction[2], direction[0]);
            this.velocity[1] = this.speed*direction[1];
        }
        
        // Reset position:
        if (movementInfo[2]){
            this.orientation = 0;
            this.speed = 0;
            this.Searching = false;
            this.isGoingUp = false;
            console.log("Before position:", this.position);
            this.position[0] = this.defaultPosition[0];
            this.position[1] = this.defaultPosition[1];
            this.position[2] = this.defaultPosition[2];
            console.log("After position:", this.position);
        }

        
    }

    turn(v){
        this.orientation += v*Math.PI/4;
    }
    
    accelerate(v, speedFactor){
        this.speed += v*speedFactor;
    }

    searchAround(){
        
        for (let i = 0; i < this.flowers.length; i++){
          
            if (this.flowers[i].isNear(this.position)){
                this.Searching = false;
                this.speed = 0;
                this.velocity[1] = 0;
                this.isNearFlower = this.flowers[i];
                console.log("Bee and Flower: ", this.isNearFlower.position);

            }
        }
    }
    
	display(){ 
        // Movement:
        this.scene.translate(this.position[0] , this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
            
        
        

        // Head:
        this.buildHead();
        
        
        // Torax:
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.scene.scale(1, 1.1, 1);
        this.upperBodyMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        
        // Abdomen:
        this.scene.pushMatrix();
        this.scene.translate(-2, -1, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1); 
        this.scene.scale(1, 1.8, 1);
        this.abdomenMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        // Legs:
        this.buildlegs();
        
        // Wings:
        this.scene.pushMatrix();
        this.scene.rotate(this.wingsAngle,1,0,0)
        this.buildRightWings();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-this.wingsAngle,1,0,0)
        this.buildLeftWings();
        this.scene.popMatrix();
        

    }

    buildHead(){
        // Head:
        this.scene.pushMatrix();
        this.scene.translate(2, 0, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.8, 1.2, 0.8);
        this.upperBodyMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Olho esquerdo:
        this.scene.pushMatrix();
        this.scene.translate(2, 0.2, 0.6);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.4, 0.6, 0.4);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Olho direito:
        this.scene.pushMatrix();
        this.scene.translate(2, 0.2, -0.6);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.4, 0.6, 0.4);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Antena esquerda:
        this.scene.pushMatrix();
        this.scene.translate(2.5, 0.85, 0.4);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.05, 0.5, 0.05);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(2, 1, 0.4);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(0.05, 0.25, 0.05);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Antena direita:
        this.scene.pushMatrix();
        this.scene.translate(2.5, 0.85, -0.4);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.05, 0.5, 0.05);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(2, 1, -0.4);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(0.05, 0.25, 0.05);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

    }




    buildLeftWings(){
        // Asa maior esquerda:
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.5, -2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1); 
        this.scene.scale(0, 1.5, 0.5);
        this.wingsMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix()

        // Asa menor esquerda:
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0.25, -1.5);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1); 
        this.scene.scale(0, 1.2, 0.5);
        this.wingsMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix()
    }

    buildRightWings(){
        
        // Asa maior direita:
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.5, 2);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1); 
        this.scene.scale(0, 1.5, 0.5);
        this.wingsMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix()

        // Asa menor direita:
        this.scene.pushMatrix();
        this.scene.translate(-0.8, 0.25, 1.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1); 
        this.scene.scale(0, 1.2, 0.5);
        this.wingsMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix()
    }

    buildlegs(){
        // Perna esquerda tras:
        this.scene.pushMatrix();
        this.scene.translate(-0.2, -0.5, 0.8);
        this.scene.rotate(-Math.PI/4, 1, 0, 1);
        this.scene.scale(0.1, 0.5, 0.1);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, -1.1, 1);
        this.scene.scale(0.1, 0.4, 0.1);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Perna esquerda meio:
        this.scene.pushMatrix();
        this.scene.translate(0.3, -0.3, 0.8);
        this.scene.rotate(-Math.PI/4, 1, 0, 1);
        this.scene.scale(0.1, 0.5, 0.1);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.1, -0.9, 1);
        this.scene.scale(0.1, 0.4, 0.1);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        // Perna esquerda frente:
        this.scene.pushMatrix();
        this.scene.translate(0.6, 0, 1);
        this.scene.rotate(-Math.PI/4, 1, 0, 0.4);
        this.scene.scale(0.1, 0.5, 0.1);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, -0.6, 1.25);
        this.scene.scale(0.1, 0.4, 0.1);
        this.eyesMaterial.apply();
        this.sphere.display();
        this.scene.popMatrix();

         // Perna direita tras:
         this.scene.pushMatrix();
         this.scene.translate(-0.2, -0.5, -0.8);
         this.scene.rotate(Math.PI/4, 1, 1, 0);
         this.scene.scale(0.1, 0.5, 0.1);
         this.eyesMaterial.apply();
         this.sphere.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix();
         this.scene.translate(-0.25, -1.1, -1);
         this.scene.scale(0.1, 0.4, 0.1);
         this.eyesMaterial.apply();
         this.sphere.display();
         this.scene.popMatrix();
 
         // Perna direita meio:
         this.scene.pushMatrix();
         this.scene.translate(0.3, -0.3, -0.8);
         this.scene.rotate(Math.PI/4, 1, 1, 0);
         this.scene.scale(0.1, 0.5, 0.1);
         this.eyesMaterial.apply();
         this.sphere.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix();
         this.scene.translate(0.25, -0.9, -1);
         this.scene.scale(0.1, 0.4, 0.1);
         this.eyesMaterial.apply();
         this.sphere.display();
         this.scene.popMatrix();
 
         // Perna direita frente:
         this.scene.pushMatrix();
         this.scene.translate(0.6, 0, -1);
         this.scene.rotate(Math.PI/4, 1, 1, 0);
         this.scene.scale(0.1, 0.5, 0.1);
         this.eyesMaterial.apply();
         this.sphere.display();
         this.scene.popMatrix();
 
         this.scene.pushMatrix();
         this.scene.translate(0.55, -0.6, -1.2);
         this.scene.scale(0.1, 0.4, 0.1);
         this.eyesMaterial.apply();
         this.sphere.display();
         this.scene.popMatrix();
       
    }

   
}

