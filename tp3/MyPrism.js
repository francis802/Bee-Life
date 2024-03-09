import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let idx = 0;
		let ang = (2 * Math.PI) / this.slices;

		for (let i = 0; i < this.slices; i++) {
			let x1 = Math.cos(i*ang);
            let y1 = Math.sin(i*ang);
            let x2 = Math.cos((i + 1)*ang);
            let y2 = Math.sin((i + 1)*ang);
            
            let z = 1 / this.stacks

			for (let j = 0; j < this.stacks; j++) {
				let x = Math.cos((i + 0.5) * ang);
                let y = Math.sin((i + 0.5) * ang);
                let size = Math.sqrt((x * x) + (y * y));

                this.vertices.push(x1, y1, z * j);
				this.vertices.push(x2, y2, z * j);
				this.vertices.push(x1, y1, z * (j + 1));
				this.vertices.push(x2, y2, z * (j + 1));

                this.indices.push(idx+2, idx, idx+1, idx+1, idx+3, idx+2);

                this.normals.push(x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0, x/size, y/size, 0);

                idx+=4;

			}
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

