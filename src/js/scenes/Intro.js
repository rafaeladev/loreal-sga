import { Colors } from "../consts/Colors.js";
import AbstractScene from "./AbstractScene.js";
import ButtonRounded from "../prefabs/ButtonRounded.js";
import { Sizes } from "../consts/Sizes.js";
import introJS from "../data/Intro.js";

export default class Intro extends AbstractScene {
  constructor() {
    super({ key: "Intro" });
  }

  init(data) {
    this._init(data);
  }

  preload() {
    this._preload();
  }

  update() {
    super.update();
  }

  create() {
    this.cameras.main.setBackgroundColor(Colors.Elmt.PaleWhite);
  }
}
