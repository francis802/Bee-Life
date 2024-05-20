import {CGFtexture, CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyPollen } from './MyPollen.js';

export class MyBee extends CGFobject {
	constructor(scene, flowers, hive) {
		super(scene);
        this.sphere = new MySphere(scene, 1, 20, 20);
        this.flowers = flowers;
        this.hive = hive;
        this.states = {
            FLYING: 1,
            FLYING_POLLEN: 2,
            SEARCHING: 3,
            STOPPED: 4,
            GOING_UP: 5,
            GOING_TO_HIVE: 6,
            REACHED_HIVE: 7
        }
        this.curr_state = this.states.FLYING;

        // Pollen:
        this.pollen = new MyPollen(scene, 0.3, 20, 20, 2, 1);
        this.catchPollen = false;
        this.pollenMaterial = new CGFappearance(scene);
        this.pollenTexture = new CGFtexture(scene, "images/polen.jpg");
        this.pollenMaterial.setTexture(this.pollenTexture);
        this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.pollenMaterial.setDiffuse(1, 1, 1, 1);
        

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
        this.acceleration = 0;
        this.time = 0;
        this.defaultPosition = [-50, -50, 0];
        this.position = [-50, -50, 0];
        this.isNearFlower = null;
        this.lastConfigurations = [this.position[1], this.speed, this.orientation]; // Last y, speed, orientation
        this.isGoingUp = false;
        this.Searching = false;
        this.goingToHive = false;
	}

    changeVelocity(movementInfo, speedFactor) {
        if (movementInfo[0] != 0){   
            this.accelerate(movementInfo[0], speedFactor);
            this.velocity[0] = this.speed*Math.cos(this.orientation);
            this.velocity[2] = -this.speed*Math.sin(this.orientation);
        }
        if (movementInfo[1] != 0){
            this.turn(movementInfo[1]);
            this.velocity[0] = this.speed*Math.cos(this.orientation);
            this.velocity[2] = -this.speed*Math.sin(this.orientation);
        }
    }

    updatePos(){
        this.position[0] += this.velocity[0];
        this.position[2] += this.velocity[2];
    }

    startPollenSearch(movementInfo, speedFactor){
        // Flower interaction:
        if (movementInfo[3] != 0){
            this.curr_state = this.states.SEARCHING;
            if( this.speed == 0) this.velocity[1] = speedFactor;
            else this.velocity[1] = this.speed;
            this.acceleration = this.speed/15;
            this.lastConfigurations[0] = this.position[1];
            this.lastConfigurations[1] = this.speed;
            this.lastConfigurations[2] = this.orientation;
        }
    }

    prepareTripToHive(movementInfo, speedFactor){
        if (movementInfo[5] != 0){
            console.log("Going to hive");
            this.curr_state = this.states.GOING_TO_HIVE;
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
            this.time = distance/this.speed;
            this.acceleration = this.speed/distance;
            this.orientation = Math.atan2(-direction[2], direction[0]);
            if( this.speed == 0) this.accelerate(1, speedFactor);
            this.velocity[1] = this.speed*direction[1] + this.acceleration*this.time;
            this.velocity[0] = this.speed*Math.cos(this.orientation);
            this.velocity[2] = -this.speed*Math.sin(this.orientation);
            
            
        }
    }

    update(time, counterTime, movementInfo, speedFactor){
        if(counterTime % 2 == 0){
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
        }

        switch (this.curr_state) {
            case this.states.FLYING:
                this.changeVelocity(movementInfo, speedFactor);
                this.updatePos();
                this.startPollenSearch(movementInfo, speedFactor);
                this.prepareTripToHive(movementInfo, speedFactor);
                this.resetMovement(movementInfo);

                break;
            case this.states.FLYING_POLLEN:
                this.changeVelocity(movementInfo, speedFactor);
                this.updatePos();
                this.startPollenSearch(movementInfo, speedFactor);
                this.prepareTripToHive(movementInfo, speedFactor);
                this.resetMovement(movementInfo);

                break;
            case this.states.SEARCHING:
                this.position[1] += this.velocity[1];
                this.velocity[1] -= this.acceleration;
                this.updatePos();
                this.searchAround();  
                this.resetMovement(movementInfo);
                break;
            case this.states.STOPPED:
                if(movementInfo[4] != 0){
                    if(this.isNearFlower){
                        this.isNearFlower.hasPollen = false;
                        this.catchPollen = true;
                    }
                    console.log("Bee: ", this.position);
                    this.curr_state = this.states.GOING_UP;
                    this.velocity[1] = 0.1;
                    this.speed = this.lastConfigurations[1];
                    this.orientation = this.lastConfigurations[2];
                    this.velocity[0] = this.speed*Math.cos(this.orientation);
                    this.velocity[2] = -this.speed*Math.sin(this.orientation);

                    this.acceleration = 0.04;
                }
                this.resetMovement(movementInfo);
                break;
            case this.states.GOING_UP:
                console.log(this.velocity);
                if (this.position[1] <= this.lastConfigurations[0]){
                    this.position[1] += this.velocity[1];
                    this.velocity[1] += this.acceleration;
                    this.updatePos();
                }
                else{
                    this.velocity[1] = 0;
                    if(this.catchPollen) this.curr_state = this.states.FLYING_POLLEN;
                    else this.curr_state = this.states.FLYING;
                }
                this.resetMovement(movementInfo);
                break;
            case this.states.GOING_TO_HIVE:
                this.position[1] += this.velocity[1];
                this.velocity[1] -= this.acceleration;
                this.updatePos();
                this.resetMovement(movementInfo);
                break;
            case this.states.REACHED_HIVE:
                console.log("entered");
                this.speed = 0;
                this.velocity[0] = 0;
                this.velocity[1] = 0;
                this.velocity[2] = 0;
                if(this.catchPollen) this.hive.addPollen();
                this.catchPollen = false;
                this.startPollenSearch(movementInfo, speedFactor);
                this.resetMovement(movementInfo);
                break;

        }
    }

    resetMovement(movementInfo){
        if (movementInfo[2] != 0){
            this.orientation = 0;
            this.speed = 0;
            if (this.catchPollen){
                this.curr_state = this.states.FLYING_POLLEN;
            }
            else{
                this.curr_state = this.states.FLYING;
            }
            
            this.position[0] = this.defaultPosition[0];
            this.position[1] = this.defaultPosition[1];
            this.position[2] = this.defaultPosition[2];
            this.velocity[0] = 0;
            this.velocity[1] = 0;
            this.velocity[2] = 0;
            
            this.lastConfigurations[0] = this.position[1];
            this.lastConfigurations[1] = this.speed;
            this.lastConfigurations[2] = this.orientation;
        }
    }

    turn(v){
        this.orientation += v*Math.PI/4;
    }
    
    accelerate(v, speedFactor){
        
        if (this.speed + v*speedFactor >= 0) this.speed += v*speedFactor;
    }

    searchAround(){
        console.log("Bee: ", this.position);
        for (let i = 0; i < this.flowers.length; i++){
          
            if (this.flowers[i].isNear(this.position)){
                this.curr_state = this.states.STOPPED;
                this.lastConfigurations[1] = this.speed;
                this.lastConfigurations[2] = this.orientation;
                this.speed = 0;
                this.velocity[0] = 0;
                this.velocity[1] = 0;
                this.velocity[2] = 0;
                this.isNearFlower = this.flowers[i];
                console.log("Bee and Flower: ", this.isNearFlower.position);
                break;
            }
            if(this.position[1] <= -97){
                this.curr_state = this.states.STOPPED;
                this.speed = 0;
                this.velocity[0] = 0;
                this.velocity[1] = 0;
                this.velocity[2] = 0;
                break;
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

        if(this.catchPollen){
            this.scene.pushMatrix();
            this.scene.translate(0, -1.3, 0);
            this.scene.rotate(Math.PI/2, 0, 0, 1);
            this.scene.scale(1.3, 1.3, 1.3);
            this.pollenMaterial.apply();
            this.pollen.display();
            this.scene.popMatrix();
        }
        

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

