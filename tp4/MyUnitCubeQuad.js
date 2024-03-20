import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";


export class MyUnitCubeQuad extends CGFobject {
   
	constructor(scene, texture_top, texture_front, texture_right, texture_back, texture_left, texture_bottom) {
		super(scene);
		this.quad = new MyQuad(this.scene);
		this.texture_top = texture_top;
        this.texture_front = texture_front;
        this.texture_right = texture_right;
        this.texture_back = texture_back;
        this.texture_left = texture_left;
        this.texture_bottom = texture_bottom;
	}

    
	display(){
		// Front face
		this.scene.pushMatrix();
		this.texture_front.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
		this.scene.popMatrix();

		// Back face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -1);
		this.texture_back.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
		this.scene.popMatrix();

		// Top face
		this.scene.pushMatrix();
		this.scene.translate(0, 0.5, -0.5);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.texture_top.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		// Bottom face
		this.scene.pushMatrix();
		this.scene.translate(0, -0.5, -0.5);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.texture_bottom.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		// Right face
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0.5, 0, 0.5);
		this.texture_right.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();

		// Left face
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.translate(0.5, 0, -0.5);
		this.texture_left.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.quad.display();
		this.scene.popMatrix();
        
    }
}

