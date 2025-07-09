// import SoundManager from './SoundManager.js';

export default class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'Boot',
        });
    }
    init(data) {
        console.log('Start :', this.scene.key, data);

        var startScene = 'Intro';
        var value = this.getUrlParam('scene', 'Empty');
        if (value != undefined && value != null && value != '' && value != 'Empty') {
            startScene = value;
        }

        var isMobile = /Mobi|Android/i.test(navigator.userAgent) || Phaser.Input.Touch.enabled;

        this.game.data = {
            sceneStopped: '',
            sceneRunning: '',
            Preloader: {
                next: startScene,
                sound: '',
            },
            isMobile: isMobile,
            level: 0, //0 debutant, 1 expert
            lang: 'fr',
            currentImage: '',
        };
    }

    preload() {
        // Preloader
        // Charge les fichiers pour le preloader

        this.scene.start('Preloader');
    }

    getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(
            /[?&]+([^=&]+)=([^&]*)/gi,
            function (m, key, value) {
                vars[key] = value;
            }
        );
        return vars;
    }

    getUrlParam(parameter, defaultvalue) {
        var urlparameter = defaultvalue;
        if (window.location.href.indexOf(parameter) > -1) {
            urlparameter = this.getUrlVars()[parameter];
        }
        return urlparameter;
    }
}
