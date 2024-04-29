import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene, lenghtPetal=1) {
		super(scene);
		this.initBuffers(lenghtPetal);
	}
	
	initBuffers(lenghtPetal) {
		this.vertices = [
			(-1*lenghtPetal), -0, 0,	//0
			(1*lenghtPetal), 0, 0,	//1
			0, (2*lenghtPetal), 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			0, 2, 1
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			
		]

		this.textCoords = [
			0, 0,
			1, 0,
			0, 1
		]

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

