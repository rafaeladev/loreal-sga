import Button from "./Button";

export default class ButtonImage extends Button {
    constructor(scene,x, y, image) {
        var params = {
            image: image
        }

        super(scene, x, y, params);
    }

    addBody(params){
        // Ajout image de fond
        this.back = this.scene.add.sprite(0, 0, params.image)
        this.add(this.back)

        // Modification de la taille du container
        this.setSize(this.back.width, this.back.height);
    }
    
    pointerOver(){
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            scale: 1.1
        })
    }

    pointerOut(){
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            scale: 1
        })
    }

    flip(){
        this.back.setFlipX(true)
    }

    setTintColor(tintNormal, tintColor){
        this.tintNormal = tintNormal
        this.tintColor = tintColor

        this.back.setTint(this.tintNormal)
    }
}