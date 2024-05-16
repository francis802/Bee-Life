import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import {MyFlower} from './MyFlower.js';
import { MyPanorama } from "./MyPanorama.js";
import { MyStem } from "./MyStem.js";
import { MyPetal} from "./MyPetal.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyGarden } from "./MyGarden.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyRock } from "./MyRock.js";
import { MySphere } from "./MySphere.js";
import { MyRockSet } from "./MyRockSet.js";

import { MyBee } from "./MyBee.js";

import { MyHive } from "./MyHive.js";
import { MyGrass } from "./MyGrass.js";
import { MyGrassField } from "./MyGrassField.js";

/**
 * getStringFromUrl(url)
 * Function to load a text file from a URL (used to display shader sources)
 */

function getStringFromUrl(url) {
	var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
    return xmlHttpReq.responseText;
}

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    this.setUpdatePeriod(50);

    //------ Textures
    this.hiveTexture = new CGFtexture(this, "images/bee_hive_texture.jpg");
    this.dirtTexture = new CGFtexture(this, "images/dirt_texture.jpg");
    this.petalTexture = new CGFtexture(this, "images/white_petal_texture.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this);
    this.flower = new MyFlower(this);
    this.leaf = new MyLeaf(this);
    this.rock = new MyRock(this, 1, 20, 20);
    this.triangle = new MyPetal(this);
    this.cylinder = new MyCylinder(this, 20, 20);
    this.garden = new MyGarden(this, 2);
    this.hiveRockBase = 7;
    this.rockPile = new MyRockSet(this, this.hiveRockBase);
    this.grass = new MyGrass(this)
    this.grassField = new MyGrassField(this);


    this.hive = new MyHive(this, 1, 20, 20);
    this.hive.setPosition([-51 + 1.5*this.hiveRockBase,-100 + 1.5*this.hiveRockBase,-51 + 1.5*this.hiveRockBase]);
    this.bee = new MyBee(this, this.garden.getFlowers(), this.hive);
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displaySphere = true;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  

    this.globalAmbientLight = 0.3;
    this.speedFactor = 0.1;
    this.scaleFactor = 1;



    // Update variables:
    this.counterTime = 0;
    this.runTime = 0;
    this.speed = 1;

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 100, 50),
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
  
    


    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    
    this.pushMatrix();
    this.grassField.display();
    this.popMatrix();
    
    this.pushMatrix();
    this.translate(this.hive.position[0], this.hive.position[1], this.hive.position[2])
    this.rotate(Math.PI, 0, 1, 0);
    this.hive.display();
    this.popMatrix();

    this.pushMatrix();
    this.garden.display();
    this.rockPile.display();
    
    this.popMatrix();

    
   

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.setGlobalAmbientLight(this.globalAmbientLight, this.globalAmbientLight, this.globalAmbientLight, 1.0);

   
    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

   
    //this.sphere.display();
    
    this.pushMatrix();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.popMatrix();
    //this.camera.setTarget(vec3.fromValues(this.bee.position[0], this.bee.position[1], this.bee.position[2]))


    // ---- END Primitive drawing section
  }

  checkKeys(){
    var output = [0,0,0,0,0,0];
    if (this.gui.isKeyPressed("KeyW")){
        output[0]=1;
    }
    if (this.gui.isKeyPressed("KeyS")){
        output[0]=-1;
    }
    if (this.gui.isKeyPressed("KeyA")){
        output[1]=1;
    }
    if (this.gui.isKeyPressed("KeyD")){
        output[1]=-1;
    }
    if (this.gui.isKeyPressed("KeyR")){
        output[2]=1;
    }
    if (this.gui.isKeyPressed("KeyF")){
      output[3]=1;
    }
    if (this.gui.isKeyPressed("KeyP")){
      output[4]=1;
    }
    if (this.gui.isKeyPressed("KeyO")){
      output[5]=1;
    }
    
    //console.log(output);
    
    return output;
  }

  update(time){
    this.counterTime = (this.counterTime + 1)%21;

    var movementInfo = this.checkKeys();

    if(this.counterTime % 2 == 0){
      this.bee.update(time, this.counterTime, movementInfo, this.speedFactor);
      
    }

    this.grassField.update(time);


    
    
    
  }

  
}
