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
			-1, -1, -2,	//0-ab
			-1, 1, -2,	//1-bb
			1, 1, -2,	//2-cb
			1, -1, -2,	//3-db

			-1, -1, 0,	//4-ef
			-1, 1, 0,	//5-ff
			1, 1, 0,	//6-gf
			1, -1, 0,	//7-hf

			-1, -1, -2,	//8-al
			-1, 1, -2,	//9-bl
			-1, -1, 0,	//10-el
			-1, 1, 0,	//11-fl

			1, 1, -2,	//12-cr
			1, -1, -2,	//13-dr
			1, 1, 0,	//14-gr
			1, -1, 0,	//15-hr

			-1, 1, -2,	//16-bu
			1, 1, -2,	//17-cu
			-1, 1, 0,	//18-fu
			1, 1, 0,	//19-gu

			-1, -1, -2,	//20-ad
			1, -1, -2,	//21-dd
			-1, -1, 0,	//22-ed
			1, -1, 0,	//23-hd


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
			11, 10, 8,
			11, 8, 9,

			// Right face
			14, 15, 13,
			14, 13, 12,

			// Up face
			16, 18, 19,
			16, 19, 17,
			
			// Down face
			20, 22, 23,
			20, 23, 21

		];

		this.normals = [
			// Back face
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			
			// Front face
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			// Left face
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			// Right face
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			// Up face
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			
			// Down face
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

