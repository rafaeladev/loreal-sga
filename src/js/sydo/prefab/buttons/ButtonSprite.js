import ButtonImage from "./ButtonImage";

export default class ButtonSprite extends ButtonImage {
    constructor(scene,x, y, image) {
        super(scene, x, y, image);
    }

    pointerOver(){
        this.back.setFrame(1)
    }

    pointerOut(){
        this.back.setFrame(0)
    }
}