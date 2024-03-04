import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

export class MyTangram extends CGFobject {
	constructor(scene) {
		    super(scene);
		    this.f1 = new MyDiamond(this.scene);
        this.f2 = new MyParallelogram(this.scene);
        this.f3 = new MyTriangleBig(this.scene);
        this.f4 = new MyTriangle(this.scene);
        this.f5 = new MyTriangleBig(this.scene);
        this.f6 = new MyTriangleSmall(this.scene);
        this.f7 = new MyTriangleSmall(this.scene);
	}

    
	display(){
             
          var rotation = [
            Math.cos(Math.PI / 4),
            Math.sin(Math.PI / 4),
            0.0,
            0.0,
            -Math.sin(Math.PI / 4),
            Math.cos(Math.PI / 4),
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          ];
      
          var translation = [
            1.0,
            0.0,
            0.0,
            0.0,
      
            0.0,
            1.0,
            0.0,
            0.0,
      
            0.0,
            0.0,
            1.0,
            0.0,
      
            -1.0,
            3.0,
            0.0,
            1.0,
          ];
      
          var scalation = [
            Math.sqrt(2),
            0.0,
            0.0,
            0.0,
      
            0.0,
            Math.sqrt(2),
            0.0,
            0.0,
      
            0.0,
            0.0,
            Math.sqrt(2),
            0.0,
      
            0.0,
            0.0,
            0.0,
            1.0,
          ];
          
      
          // F1 - Diamond
          this.scene.pushMatrix();
          this.scene.multMatrix(translation);
          this.scene.multMatrix(scalation);
          this.scene.multMatrix(rotation);
          this.scene.setDiffuse(0, 2, 0, 10);
          this.f1.display();
          this.scene.popMatrix();
      
          // F2 - Parallelogram
          this.scene.pushMatrix();
          this.scene.translate(-1,1,0);
          this.scene.rotate(-Math.PI/2,0,0,1);
          this.scene.setDiffuse(2, 2.5, 0, 10);
          this.f4.display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
          this.scene.translate(-3,1,0);
          this.scene.rotate(Math.PI/2,0,0,1);
          this.scene.setDiffuse(2, 2, 0, 10);
          this.f4.display();
          this.scene.popMatrix();
      
          // F3 - Big Triangle 1
          this.scene.pushMatrix();
          this.scene.translate(1, 0, 0);
          this.scene.scale(1.5, 1.5, 1.5);
          this.scene.setDiffuse(10, 0.7, 0, 1);
          this.f3.display();
          this.scene.popMatrix();
      
          // F4
          this.scene.pushMatrix();
          this.scene.translate(-1.5,-2,0);
          this.scene.scale(1.5,2,0);
          this.scene.rotate(-Math.PI/2,0,0,1);
          this.scene.setDiffuse(2, 0.3, 1, 1);
          this.f4.display();
          this.scene.popMatrix();
      
      
          // F5 - Big Triangle 2
          this.scene.pushMatrix();
          this.scene.translate(0, -4, 0);
          this.scene.setDiffuse(0, 0.5, 0, 1);
          this.scene.scale(1.5, 2, 1.5);
          this.scene.setDiffuse(0, 0.5, 3.5, 1);
          this.f3.display();
          this.scene.popMatrix();
      
          // F7 - Small Triangle 2
          this.scene.pushMatrix();
          this.scene.scale(1.5, 2, 1.5);
          this.scene.translate(2, -1, 0);
          this.scene.rotate(Math.PI/2, 0, 0, 1);
          this.scene.setDiffuse(2, 0, 0, 1);
          this.f7.display();
          this.scene.popMatrix();
         
           // F6 - Small Triangle 1
           this.scene.pushMatrix();
           this.scene.scale(1.5, 2, 1.5);
           this.scene.translate(1, 0, 0);
           this.scene.rotate(Math.PI, 0, 0, 1);
           this.scene.setDiffuse(1, 0.3, 1.5, 1);
           this.f6.display();
           this.scene.popMatrix();
        
    }
}

