import Button from './Button'

export default class ButtonRounded extends Button {
    constructor(scene, x, y, w, h, text, box_color) {
        var params = {
            width: w,
            height: h,
            text: text,
            box_color: box_color
        }

        super(scene, x, y, params);
    }

    addBody(params){
        // Ajout fond
        this.back = this.scene.add.rexRoundRectangle(0, 0, params.width, params.height, params.height/2, params.box_color)
        this.back.setOrigin(0.5)
        this.add(this.back)

        // Ajout text
        this.text = this.scene.add.rexTagText(0, 0, params.text, {
            fontSize: "33px",
            fontFamily: "CardenioBold",
            align: "center",
            color: "#000000",
        }).setOrigin(0.5)
        this.add(this.text)

        if(this.text.height > params.height){
            this.back.height = this.text.height + 10
        }

        // Ajout interaction
        this.setSize(this.back.width, this.back.height)
    }

    pointerOut(){
        this.back.setStrokeStyle(0, 0x000000)
    }

    pointerOver(){
        this.back.setStrokeStyle(2, 0x000000)
    }

    setLocked(){
        this.isLocked = true
        this.setAlpha(0.5)
        this.disableInteractive()
    }

    setUnlocked(){
        this.isLocked = false
        this.setAlpha(1)
        this.setInteractive()
    }

    // -- Modif du text
    setText(txt){
        this.text.setText(txt)
    }

    setTextColor(color){
        this.text.color = color
    }

    setTextFont(fontFamily){
        this.text.fontFamily = fontFamily
    }

    setTextSize(fontSize){
        this.text.fontSize = fontSize
    }

}