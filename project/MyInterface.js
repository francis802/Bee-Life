import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');

        this.gui.add(this.scene, 'globalAmbientLight', 0.3, 1.0).name('Global Ambient Light');

        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui=this;
        // disable the processKeyboard function
        this.processKeyboard=function(){};
        // create a named array to store which keys are being pressed
        this.activeKeys={};
    }

    // called when a key is pressed down and mark it as active in the array
    processKeyDown(event) {
        
        this.activeKeys[event.code]=true;
        
    };
    
    // returns true if a key is marked as pressed, false otherwise
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    // called when a key is released, mark it as inactive in the array
    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };
}