import Button from '../sydo/prefab/buttons/Button.js';
import { Colors } from '../consts/Colors.js';
import { Sizes } from '../consts/Sizes.js';

export default class ButtonRounded extends Button {
    constructor(
        scene,
        x,
        y,
        w,
        h,
        text,
        text_color,
        box_color,
        hasAnStroke = false,
        stroke_color,
        hasAnIcon = false,
        alignLeft = false,
        icon = null,
        url
    ) {
        var params = {
            width: w * 1.25,
            height: h * 1.25,
            text: text,
            text_color: text_color,
            box_color: box_color,
            hasAnStroke: hasAnStroke,
            stroke_color: stroke_color,
            hasAnIcon: hasAnIcon,
            alignLeft: alignLeft,
            icon: icon,
            Url: url,
        };

        super(scene, x, y, params);

        this.defaultBoxColor = box_color;
        this.defaultTextColor = text_color;
    }

    addBody(params) {
        // Ajout fond
        this.back = this.scene.add.rexRoundRectangle(
            0,
            0,
            params.width,
            params.height,
            params.height / 2,
            0xffffff // n'importe quelle couleur, car on va la rendre invisible
        );
        this.back.setOrigin(0.5);

        if (params.box_color === 'transparent') {
            this.back.setFillStyle(0xffffff, 0); // alpha 0 => fond invisible
        } else {
            this.back.setFillStyle(params.box_color, 1);
        }
        this.add(this.back);

        if (params.hasAnStroke) {
            this.back.setStrokeStyle(2, params.stroke_color);
        }

        if (params.hasAnIcon) {
            if (params.alignLeft) {
                // Icone à gauche
                this.icon = this.scene.add
                    .image(-params.width / 2 + 60, 0, params.icon)
                    .setOrigin(0.5);
                this.add(this.icon);

                // Texte centré après l’icône
                this.text = this.scene.add
                    .rexTagText(-params.width / 2 + 100, 0, params.text, {
                        fontSize: Sizes.Text.h4,
                        fontFamily: 'Monteserrat',
                        align: 'left',
                        color: params.text_color,
                        backgroundColor: 'transparent',
                    })
                    .setOrigin(0, 0.5); // ← aligné à gauche
                this.add(this.text);
            } else {
                // Cas normal
                this.icon = this.scene.add
                    .image(params.width / 2 - 30, 0, params.icon)
                    .setOrigin(0.5);
                this.add(this.icon);

                this.text = this.scene.add
                    .rexTagText(-20, 0, params.text, {
                        fontSize: Sizes.Text.h4,
                        fontFamily: 'Monteserrat',
                        align: 'center',
                        color: params.text_color,
                        backgroundColor: 'transparent',
                    })
                    .setOrigin(0.5);
                this.add(this.text);
            }
        } else {
            // Ajout text
            this.text = this.scene.add
                .rexTagText(0, 0, params.text, {
                    fontSize: Sizes.Text.p,
                    fontFamily: 'Monteserrat',
                    align: 'center',
                    color: params.text_color,
                    backgroundColor: 'transparent',
                })
                .setOrigin(0.5);
            this.add(this.text);

            if (this.text.height > params.height) {
                this.back.height = this.text.height + 10;
            }
        }

        // Ajout interaction
        this.setSize(this.back.width, this.back.height);

        this.setInteractive({ useHandCursor: true });
        this.on('pointerover', this.pointerOver, this);
        this.on('pointerout', this.pointerOut, this);
    }

    pointerOut() {
        /*  if (this.glowTween) {
      this.glowTween.stop();
    }
    this.glowTween = this.scene.tweens.add({
      targets: this.back,
      alpha: { from: 0.5, to: 1 },
      duration: 100,
      yoyo: false,
      repeat: 0,
      ease: "linear",
    }); */

        /*  if (this.defaultBoxColor !== "transparent") {
      this.back.setFillStyle(this.defaultBoxColor, 1);
    } else {
      this.back.setFillStyle(0xffffff, 0); // garder fond invisible
    } */

        this.text.setColor(this.defaultTextColor);
    }

    pointerOver() {
        /*   if (this.glowTween) {
      this.glowTween.stop();
    }
    // Resume the glow tween when the pointer leaves
    this.glowTween = this.scene.tweens.add({
      targets: this.back,
      alpha: { from: 0.5, to: 1 },
      duration: 100,
      yoyo: false,
      repeat: 0,
      ease: "linear",
    }); */

        /*   if (this.defaultBoxColor !== "transparent") {
      this.back.setFillStyle(Colors.Elmt.Beige, 1);
    } else {
      this.back.setFillStyle(0xffffff, 0); // toujours transparent au hover
    } */

        this.text.setColor(Colors.Text.Red);
    }

    setLocked() {
        this.isLocked = true;
        this.setAlpha(0.6);
        this.disableInteractive();
        this.back.setFillStyle(Colors.Elmt.White);
        this.text.setColor(Colors.Text.BleuNovotel);
    }

    setUnlocked() {
        this.isLocked = false;
        this.setAlpha(1);
        this.setInteractive();
        this.back.setFillStyle(this.defaultBoxColor);
        this.text.setColor(this.defaultTextColor);
    }

    // -- Modif du text
    setText(txt) {
        this.text.setText(txt);
    }

    setTextColor(color) {
        this.text.color = color;
    }

    setTextFont(fontFamily) {
        this.text.fontFamily = fontFamily;
    }

    setTextSize(fontSize) {
        this.text.fontSize = fontSize;
    }
}
