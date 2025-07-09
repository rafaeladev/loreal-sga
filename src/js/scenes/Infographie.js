import { Colors } from "../consts/Colors.js";
import AbstractScene from "./AbstractScene.js";

export default class Infograpgie extends AbstractScene {
  constructor() {
    super({
      key: "Infographie",
    });
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
