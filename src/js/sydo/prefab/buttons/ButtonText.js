import Button from "./Button";
import { Colors } from "../../consts/Colors";
import { tags } from "../../consts/Tags";

export default class ButtonText extends Button {
    constructor(scene, x, y, txt) {
        var params = {
            txt: txt
        }

        super(scene, x, y, params);
    }

    addBody(params) {
        // Ajout image de fond
        this.text = this.scene.add.rexTagText(0, 0, params.txt, {
            fontSize: "40px",
            fontFamily: "Cardenio",
            align: "center",
            color: Colors.Text.Black,
            backgroundColor: "transparent",
            tags: tags
        }).setOrigin(0.5)
        this.back = this.scene.add.rectangle(0, 0, this.text.width + 60, this.text.height + 30, Colors.Elmt.Violet).setOrigin(0.5)
        this.add(this.back)
        this.add(this.text)

        // Modification de la taille du container
        this.setSize(this.back.width, this.back.height);
    }

    pointerOver() {
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            scale: 1.1
        })
    }

    pointerOut() {
        this.scene.tweens.add({
            targets: this,
            duration: 200,
            scale: 1
        })
    }
}