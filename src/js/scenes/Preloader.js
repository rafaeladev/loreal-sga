import { Colors } from "../consts/Colors.js";
import AbstractScene from "./AbstractScene.js";

export default class Preloader extends AbstractScene {
  constructor() {
    super({
      key: "Preloader",
    });
  }
  init(data) {
    this._init(data);
  }

  preload() {
    this._preload();

    // Ajout du texte de chargement
    this.loadingText = this.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: "Loading... 0%",
      style: {
        font: "32px Montserrat",
        fill: Colors.Text.BleuNovotel,
        stroke: "#f9f5ec",
        strokeThickness: 8,
      },
    });

    this.loadingText.setOrigin(0.5, 0.5);

    this.loadSprites();

    this.load.on("progress", (value) => {
      this.loadingText.text = "Chargement... " + Math.floor(value * 100) + "%";
    });

    this.load.on(
      "complete",
      function () {
        this.nextScene();
      },
      this
    );
  }

  loadSprites() {
    // intro
    // End
    // icones
  }
}
