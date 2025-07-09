export default class Animation extends Phaser.GameObjects.Sprite {
    constructor(scene,x, y, sprite, nbSprite, loop) {
        super(scene, x, y, sprite);

        // Ajout à la scene
        this.scene = scene;
        scene.add.existing(this);

        // Variables de l'animation
        this.spriteAnim = sprite
        
        // Création de l'animation
        var configAnim = {
            key: this.spriteAnim,
            frames: this.scene.anims.generateFrameNumbers(this.spriteAnim, {start:0, end: nbSprite}),
            frameRate: 10,
            yoyo: false,
        }

        if(loop){
            configAnim.repeat = -1
        }

        // Lancement de l'animation
        this.animRunning = this.anims.create(configAnim);
        this.anims.load(this.spriteAnim);
        this.anims.play(this.spriteAnim , true);
    } 
    
    restart(){
        this.anims.stop()
        this.anims.play(this.spriteAnim , true);
    }

    pause(){
        this.anims.pause()
    }
}