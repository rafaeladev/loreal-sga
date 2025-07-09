import ButtonImage from './ButtonImage';

import * as Colors from '../../consts/Colors'
import {tags} from '../../consts/Tags'

export default class ButtonImageText extends ButtonImage {
    constructor(scene, x, y, text, image) {
        super(scene, x, y, image);

        // Ajout texte du bouton
        this.text = this.scene.add.rexTagText(0, 0, text, {
            fontSize: "25px",
            fontFamily: "DIN_Bold",
            align: "center",
            color: Colors.BlackText,
            tags:tags
        }).setOrigin(0.5)
        this.add(this.text)

    }

    // -- Modif du text
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