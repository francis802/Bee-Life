import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {

    constructor(scene, radius, slices, stacks, inside=false, north=1, south=1) {
        super(scene);
        this.north = north;
        this.south = south;
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.inside = inside ? -1 : 1;
        this.initBuffers();
    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let angle;
        for (let i = 0; i <= this.stacks * 2; i += 1) {
            angle = - Math.PI / 2 + Math.PI * i / (2 * this.stacks);
            this.vertices.push(this.radius * Math.cos(angle), this.radius * Math.sin(angle), 0);
            this.normals.push(this.inside * Math.cos(angle), this.inside * Math.sin(angle), 0);
            this.texCoords.push(0, 1 - i / (this.stacks * 2));
        }

        let index_a, index_b, index_c, index_d, y_factor, angle_xz, angle_xy, x, y, z, points;
        for (let i = 1; i <= this.slices + 1; i++) {

            angle_xz = 2 * Math.PI * i / this.slices;

            this.vertices.push(0, -this.radius , 0);
            this.texCoords.push(0, 1);
            this.normals.push(0, this.inside, 0);

            for (let j = 0; j <= this.stacks * 2; j++) {

                angle_xy = - Math.PI / 2 + Math.PI * j / (2 * this.stacks);
                y_factor = angle_xy >= 0 ? this.north : this.south;

                x = Math.cos(angle_xz) * Math.cos(angle_xy);
                z = Math.sin(angle_xz) * Math.cos(angle_xy);
                y = Math.sin(angle_xy);
                
                this.vertices.push(this.radius * x, this.radius * y * y_factor, this.radius * z);
                this.normals.push(this.inside * x, this.inside * y, this.inside * z);
                this.texCoords.push(i / this.slices, 1 - j / (this.stacks * 2));
                points = this.vertices.length / 3;
                index_c = points - 2;
                index_d = points - 1;
                index_b = index_d - (this.stacks*2 + 1);
                index_a = index_b - 1;

                if (this.inside == -1) {
                    this.indices.push(index_a, index_c, index_d, index_a, index_d, index_b);
                } else {
                    this.indices.push(index_d, index_c, index_a, index_b, index_d, index_a);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }


}