import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, -1, -2,	//0-a
			-1, 1, -2,	//1-b
			1, 1, -2,	//2-c
			1, -1, -2,	//3-d
			-1, -1, 0,	//4-e
			-1, 1, 0,	//5-f
			1, 1, 0,	//6-g
			1, -1, 0,	//7-h
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			// Back face
			1, 0, 3,
			1, 3, 2,
			
			// Front face
			5, 4, 7,
			5, 7, 6,

			// Left face
			5, 4, 0,
			5, 0, 1,

			// Right face
			6, 7, 3,
			6, 3, 2,

			// Top face
			1, 5, 6,
			1, 6, 2,
			
			// Bottom face
			0, 4, 7,
			0, 7, 3

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

