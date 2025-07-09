import AbstractScene from './AbstractScene.js';

export default class UI extends AbstractScene {

    constructor() {
        super({
            key: "UI"
        })
    }
    init(data) {
    }

    preload() {
        this._preload();

        
    }

    pauseScene(){
        // Pause la scene
        var sceneRunning = this.game.data.sceneRunning
        this.scene.pause(sceneRunning);
    }

    restartScene(){
        // Restart la scene
        var sceneRunning = this.game.data.sceneRunning
        this.scene.wake (sceneRunning);
    }
}