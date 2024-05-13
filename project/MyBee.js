import {CGFtexture, CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';

export class MyBee extends CGFobject {
	constructor(scene) {
		super(scene);
        this.sphere = new MySphere(scene, 1, 20, 20);

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
	}

    
	display(){ 
        
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
        this.buildWings();
        
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

    buildWings(){
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

