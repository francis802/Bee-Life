import {CGFobject} from '../lib/CGF.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyGrass extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        // Length of each grass blade

        // Vertices for 5 triangles forming the grass blades
        this.vertices = [
            // First triangle 
            -1/5, 0, 0, // 0
            1/5, 0, 0, // 1
            0, 1, 0, // 2
            -1/5, 0, 0, // 3
            1/5, 0, 0, // 4
            0, 1, 0, // 5

            // Second triangle 
            -1/5, 0, 0, // 6
            0, 1, 0, // 7
            -1/3, 1, 0, // 8
            -1/5, 0, 0, // 9
            0, 1, 0, // 10
            -1/3, 1, 0, // 11

            // Third triangle 
            0, 1, 0, // 12
            -1/3, 1, 0, // 13
            -1/5, 2, 0, // 14
            0, 1, 0, // 15
            -1/3, 1, 0, // 16
            -1/5, 2, 0, // 17

            // Fourth triangle 
            0, 1, 0, // 18
            -1/5, 2, 0, // 19
            0, 2, 0, // 20
            0, 1, 0, // 21
            -1/5, 2, 0, // 22
            0, 2, 0, // 23

            // Fith triangle 
            -1/5, 2, 0, // 24
            0, 2, 0, // 25
            1/10, 2.7, 0, // 26
            -1/5, 2, 0, // 27
            0, 2, 0, // 28
            1/10, 2.7, 0, // 29

            
        ];

        // Indices for the triangles
        this.indices = [
            // First triangle
            0, 1, 2,
            5, 4, 3,
            // Second triangle
            6, 7, 8,
            11, 10, 9,
            // Third triangle
            12, 13, 14,
            17, 16, 15,
            // Fourth triangle
            18, 19, 20,
            23, 22, 21,
            // Fith triangle
            24, 25, 26,
            29, 28, 27
        ];

        // Normals for each vertex (all facing front)
        this.normals = [
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, -1, 0, 0, -1, 0, 0, -1
        ];

        // Texture coordinates (optional, can be adjusted as needed)
        this.texCoords = [
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1,
            0, 0, 1, 0, 0, 1
        ];

        // Define the primitive type
        this.primitiveType = this.scene.gl.TRIANGLES;

        // Initialize the buffers
        this.initGLBuffers();
    }
}