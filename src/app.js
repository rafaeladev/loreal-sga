import Phaser from "phaser";

import "./css/style.css";

import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";
import TagTextPlugin from "phaser3-rex-plugins/plugins/tagtext-plugin.js";
import SliderPlugin from "phaser3-rex-plugins/plugins/slider-plugin.js";
import ScrollablePanelPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";

import Boot from "./js/scenes/Boot.js";
import Preloader from "./js/scenes/Preloader.js";
import Intro from "./js/scenes/Intro.js";
import Video from "./js/scenes/Video.js";
import Infographie from "./js/scenes/Infographie.js";
import Quiz from "./js/scenes/Quiz.js";
import End from "./js/scenes/End.js";

// Création du jeu
var game;

window.onload = function () {
  var isMobile =
    /Mobi|Android/i.test(navigator.userAgent) || Phaser.Input.Touch.enabled;
  var config = {
    autoResize: true,
    width: 1152,
    height: 953,
    backgroundColor: "#f2f0e2",
    type: Phaser.AUTO,
    parent: "game",
    scale: {
      mode: isMobile ? Phaser.Scale.FIT : Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    dom: {
      createContainer: true,
    },
    plugins: {
      global: [
        {
          key: "rexRoundRectanglePlugin",
          plugin: RoundRectanglePlugin,
          start: true,
        },
        {
          key: "rexTagTextPlugin",
          plugin: TagTextPlugin,
          start: true,
        },
        {
          key: "rexSlider",
          plugin: SliderPlugin,
          start: true,
        },
      ],
      scene: [
        {
          key: "rexScrollablePanel",
          plugin: ScrollablePanelPlugin,
          mapping: "rexUI",
        },
      ],
    },
    fps: {
      target: 30,
      forceSetTimeOut: true,
    },
    scene: [Boot, Preloader, Intro, Video, Infographie, Quiz, End],
  };

  game = new Phaser.Game(config);

  console.log("  __       __|  __  ");
  console.log("__)  (__| (__| (__) ");
  console.log("        |           ");

  game.scene.start("Boot");
};
