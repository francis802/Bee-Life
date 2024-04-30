import {CGFtexture, CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import {MyTriangle} from './MyTriangle.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyLeaf extends CGFobject {
	constructor(scene, stemRadius=0.1) {
		super(scene);
		
		this.triagle = new MyTriangle(scene);
        this.leafStem = new MyCylinder(scene, 20, 20);
		this.rotation_angle = 30;
        this.stemRadius = stemRadius;

		this.leafMaterial = new CGFappearance(scene);
		this.leafTexture = new CGFtexture(scene, "images/leaf_texture.jpg");
		this.leafMaterial.setTexture(this.leafTexture);
		this.leafMaterial.setTextureWrap('MIRROR', 'MIRROR');

		this.stemMaterial = new CGFappearance(scene);
		this.stemTexture = new CGFtexture(scene, "images/stem_texture.jpg");
		this.stemMaterial.setTexture(this.stemTexture);
		this.stemMaterial.setTextureWrap('MIRROR', 'MIRROR');

	}

	display() {
		
		this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stemRadius*5);
		this.scene.rotate(-this.rotation_angle * Math.PI / 180, 1, 0, 0);
		this.leafMaterial.apply();
		this.triagle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stemRadius*5);
		this.scene.rotate(Math.PI, 1, 0, 0);
		this.leafMaterial.apply();
		this.triagle.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.stemRadius*5);
        this.scene.scale(this.stemRadius, this.stemRadius, this.stemRadius*5);
		this.stemMaterial.apply();
        this.leafStem.display();
        this.scene.popMatrix();

	}
	

}

