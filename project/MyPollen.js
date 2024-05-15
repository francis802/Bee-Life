import { CGFobject } from '../../lib/CGF.js';

export class MyPollen extends CGFobject {
    constructor(scene, radius, slices, stacks, north = 1, south = 1) {
        super(scene);
        this.north = north;
        this.south = south;
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i <= this.stacks * 2; i += 1) {
            const angle = -Math.PI / 2 + (Math.PI * i) / (2 * this.stacks);
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);
            this.vertices.push(x, y, 0);
            this.normals.push(Math.cos(angle), Math.sin(angle), 0);
            this.texCoords.push(0, 1 - i / (this.stacks * 2));
        }

        for (let i = 0; i <= this.slices; i++) {
            const angle_xz = (2 * Math.PI * i) / this.slices;
            this.vertices.push(0, -this.radius, 0);
            this.texCoords.push(0, 1);
            this.normals.push(0, 1, 0);

            for (let j = 0; j <= this.stacks * 2; j++) {
                const angle_xy = -Math.PI / 2 + (Math.PI * j) / (2 * this.stacks);
                const y_factor = angle_xy >= 0 ? this.north : this.south;
                const x = Math.cos(angle_xz) * Math.cos(angle_xy);
                const z = Math.sin(angle_xz) * Math.cos(angle_xy);
                const y = Math.sin(angle_xy);

                this.vertices.push(this.radius * x, this.radius * y * y_factor, this.radius * z);
                this.normals.push(x, y, z);
                this.texCoords.push(i / this.slices, 1 - j / (this.stacks * 2));

                const points = this.vertices.length / 3;
                const index_c = points - 2;
                const index_d = points - 1;
                const index_b = index_d - (this.stacks * 2 + 1);
                const index_a = index_b - 1;

                this.indices.push(index_d, index_c, index_a, index_b, index_d, index_a);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
