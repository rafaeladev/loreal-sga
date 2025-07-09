//Class qui contient les fontions par défaut des scènes.

import { tags } from '../consts/Tags.js';
import { Colors } from '../consts/Colors.js';
import { Sizes } from '../consts/Sizes.js';

export default class AbstractScene extends Phaser.Scene {
    //Initialisation par défaut, à ajouter dans tous les initialisation
    //Data contient les info des transitions (cf onCompleteHandlerTransitionOUT)
    _init(data) {
        console.log('Start :', this.scene.key, data);
        this.data = {};

        this.game.data.sceneRunning = this.scene.key;

        if (data) {
            // Data à faire passer au besoin
        }
    }

    //Preload de la scene par défaut, initialise les variables utiles
    _preload() {
        this.width = this.cameras.main.width; //Largeur de l'écran
        this.height = this.cameras.main.height; //Hauter de l'écran

        this.scaleX = 2.8;
        this.scaleY = 2;
        this.dim = this.height * 0.05; //Variable pour adapter les images à la hauteur
        this.ratio = Math.min(this.width / 1920, this.height / 1080); //Ratio de l'écran

        this.preTarget = () => {
            console.warn("preTarget() n'est pas défini dans cette scène.");
        };

        this.postTarget = () => {
            console.warn("postTarget() n'est pas défini dans cette scène.");
        };

        if (this.sound && this.sound.stopAll) {
            this.sound.stopAll();
        }
    }

    update() {
        if (!this.video) return;
        if (!this.videoControlsActive) return;

        if (this.isPlaying && !this.isDraging) {
            this.currentTiming = this.video.getCurrentTime();
            this.totalDuration = this.video.getDuration();
            this.slider.value = this.currentTiming / this.totalDuration;
            const progress = this.video.getProgress();
            this.barFill.width = progress * this.barWidth;
        } else if (this.isDraging) {
            const progress = this.video.getProgress();
            const duration = this.video.getDuration();
            const current = progress * duration;
            if (this.currentTimeText) {
                this.currentTimeText.setText(this.formatTime(current));
            }
            this.barFill.width = this.slider.value * this.barWidth;
        }

        if (this.isPlaying) {
            const duration = this.video.getDuration();
            const progress = this.video.getProgress();
            const current = progress * duration;
            if (this.currentTimeText) {
                this.currentTimeText.setText(this.formatTime(current));
            }
            if (this.durationText) {
                this.durationText.setText(this.formatTime(duration));
            }
        }
    }

    getMissionData(data) {
        const lang = this.game.data.lang || 'fr';
        return data.find((entry) => entry.lang === lang) || data[0]; // fallback 'fr'
    }

    nextScene() {
        var sceneInfo = this.game.data[this.game.data.sceneRunning];
        this.scene.start(sceneInfo.next, this.data);
    }

    clone(element) {
        var clone = Phaser.Utils.Objects.Clone(element);
        this.add.existing(clone);
        return clone;
    }

    createTextElement(x, y, element) {
        let txt = this.add
            .rexTagText(x, y, element.text, {
                fontSize: element.config.size,
                fontFamily: element.config.fontFamily,
                align: element.config.align,
                color: element.config.color,
                backgroundColor: element.config.backColor,
                wordWrap: { width: element.config.width },
                tags: tags,
            })
            .setOrigin(element.config.origin.x, element.config.origin.y);
        return txt;
    }

    showVideoLoading(videoKey, callback = () => {}) {
        // Crée un écran noir semi-transparent de fond
        const blocker = this.add
            .rectangle(this.width / 2, this.height / 2, this.width, this.height, Colors.Elmt.Black)
            .setAlpha(0.6)
            .setDepth(10);

        // Texte de chargement
        const loadingText = this.add
            .text(this.width / 2, this.height / 2, 'Préparation de la vidéo...', {
                fontSize: Sizes.Text.h3,
                color: Colors.Text.BleuNovotel,
                fontFamily: 'Montserrat',
            })
            .setOrigin(0.5)
            .setDepth(11);

        // Ajout de la vidéo (ne la joue pas tout de suite)
        const tempVideo = this.add
            .video(this.width / 2, this.height / 2, videoKey)
            .setOrigin(0.5)
            .setDepth(9)
            .setAlpha(0); // on la cache

        // Une fois que la vidéo est prête à jouer
        tempVideo.video.addEventListener('canplaythrough', () => {
            console.log('Video ready');
            loadingText.destroy();
            blocker.destroy();
            tempVideo.destroy();

            // Lancer le callback pour ensuite appeler `showVideo(videoKey)`
            callback();
        });

        // Lance le chargement réel (sans affichage pour l'instant)
        tempVideo.setPaused(true);
        tempVideo.setMute(true); // on mute pour éviter tout souci de lecture bloquée
        tempVideo.play(); // nécessaire pour déclencher le buffering
        tempVideo.pause();
    }

    showVideo(videoKey) {
        this.videoControlsActive = true;
        this.isDraging = false;
        this.isPlaying = false;
        this.isPaused = false; // On démarre en pause
        this.allControls = [];

        this.barWidth = 392 * this.scaleX;
        this.barY = 272 * this.scaleY + 32;
        this.barX = 88 * this.scaleX;

        const blocker = this.add.rectangle(
            this.width / 2,
            this.height / 2,
            this.width,
            this.height,
            Colors.Elmt.Black
        );

        // 📹 1. Ajoute la vidéo
        this.video = this.add.video(0, 0, videoKey).setOrigin(0.5).setDepth(1);

        // 2. On centre la vidéo au milieu du canvas
        this.video.setPosition(this.width / 2, this.height / 2);
        this.video.setScale(0.9);
        this.video.setPosition(this.width / 2, this.height / 2);
        this.video.setPaused(true);

        // ▶️ 3. Bouton Play au centre
        this.startButton = this.add
            .image(this.width / 2, this.height / 2, 'video-start')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .setDepth(3);
        this.startButton.setAlpha(1);
        this.allControls.push(this.startButton);

        // 🕹️ Animation au survol du bouton Play
        this.startButton.on('pointerover', () => {
            this.tweens.add({
                targets: this.startButton,
                scale: 1.1,
                duration: 200,
                ease: 'Sine.easeInOut',
            });
        });

        this.startButton.on('pointerout', () => {
            this.tweens.add({
                targets: this.startButton,
                scale: 1,
                duration: 200,
                ease: 'Sine.easeInOut',
            });
        });

        // Clique sur le bouton Play pour démarrer la vidéo
        this.startButton.on('pointerdown', () => {
            console.log('Play video');
            console.log(this.video);

            this.video.play();
            this.isPlaying = true;
            this.video.setMute(false);
            this.video.setVolume(1); // au cas où
            this.startButton.setAlpha(0); // Cache le bouton play
            this.startButton.setDepth(-1);
            this.allControls.forEach((control) => control.setVisible(true));

            this.video.once('play', () => {
                const duration = this.video.getDuration();
                this.durationText.setText(this.formatTime(duration));
            });
        });

        // ⏱️ Texte durée
        this.currentTimeText = this.add
            .text(473 * this.scaleX - 65, 273 * this.scaleY - 20, '0:00', {
                fontSize: Sizes.Text.p,
                color: '#fff',
                fontFamily: 'Monteserrat',
            })
            .setOrigin(0.5)
            .setDepth(20)
            .setVisible(false);
        this.allControls.push(this.currentTimeText);

        this.barretime = this.add
            .text(473 * this.scaleX - 30, 273 * this.scaleY - 20, '/', {
                fontSize: Sizes.Text.p,
                color: '#fff',
                fontFamily: 'Monteserrat',
            })
            .setOrigin(0.5)
            .setDepth(20)
            .setVisible(false);
        this.allControls.push(this.barretime);

        this.durationText = this.add
            .text(473 * this.scaleX, 273 * this.scaleY - 20, '0:00', {
                fontSize: Sizes.Text.p,
                color: '#fff',
                fontFamily: 'Monteserrat',
            })
            .setOrigin(0.5)
            .setDepth(20)
            .setVisible(false);
        this.allControls.push(this.durationText);

        this.sliderLine = this.add
            .rexRoundRectangle(this.width / 2, this.barY, this.barWidth, 8, 4, Colors.Elmt.White)
            .setAlpha(0.5)
            .setDepth(20)
            .setVisible(false);
        this.allControls.push(this.sliderLine);
        this.barFill = this.add
            .rexRoundRectangle(this.barX, this.barY, 0, 8, 4, Colors.Elmt.White)
            .setOrigin(0, 0.5)
            .setDepth(20)
            .setVisible(false);
        this.allControls.push(this.barFill);
        this.sliderLine.setSize(this.barWidth, this.sliderLine.height);
        this.sliderLine.setInteractive({ useHandCursor: true });
        this.sliderLine.on('pointerdown', (event) => {
            let a = event.x;
            let b = this.sliderLine.x;
            let c = a - b;
            let value = (c + this.barWidth / 2) / this.barWidth;
            this.barFill.width = value * this.barWidth;
            this.slider.value = value;
            this.video.seekTo(value);
        });
        this.sliderButton = this.add
            .circle(this.width / 2 - this.barWidth / 2, this.barY, 30, Colors.Elmt.White)
            .setInteractive({ useHandCursor: true })
            .setAlpha(1)
            .setDepth(20)
            .setVisible(false);
        this.allControls.push(this.sliderButton);
        this.sliderButton.setStrokeStyle(4, Colors.Elmt.White);
        this.sliderButton.on('pointerdown', () => {
            this.isDraging = true;
            this.isPlaying = false;
            this.video.setPaused(true);
        });
        /* this.sliderButton.on("pointerup", () => {
      this.isDraging = false;
      if (this.video.isPaused()) {
        this.isPlaying = false;
        this.video.setPaused(true);
      } else {
        this.isPlaying = true;
        this.video.setPaused(false);
      }
    }); */

        this.sliderButton.on('pointerup', () => {
            this.isDraging = false;
            this.isPlaying = true;
            this.video.setPaused(false); // 🔧 on force la reprise
        });

        /* this.input.on("pointerup", () => {
      if (this.isDraging) {
        this.isDraging = false;
        this.isPlaying = true;
        this.video.setPaused(false);
      }
    }); */

        this.input.on('pointerup', () => {
            if (this.isDraging) {
                this.isDraging = false;
                this.isPlaying = true;
                this.video.setPaused(false);
            }
        });

        this.slider = this.plugins.get('rexSlider').add(this.sliderButton, {
            endPoints: [
                { x: this.sliderLine.x - this.barWidth / 2, y: this.sliderLine.y },
                { x: this.sliderLine.x + this.barWidth / 2, y: this.sliderLine.y },
            ],
            value: 0,
            enable: true,
            valuechangeCallback: (value) => {
                if (this.isDraging) {
                    this.video.seekTo(value);
                }
            },
        });

        // 📥 Sur fin de la vidéo
        let hasEnded = false;

        this.video.once('complete', () => {
            hasEnded = true;
            this.postTarget(this);
            this.videoControlsActive = false;
            this.video?.destroy();
            this.startButton?.destroy();
            this.allControls.forEach((control) => control?.destroy());
        });

        // Clique sur la vidéo pour la mettre en pause ou reprendre
        this.video.setInteractive();
        this.video.on('pointerdown', () => {
            if (hasEnded) return;
            // Si la vidéo est en pause, la reprendre
            if (this.video.isPaused()) {
                this.video.resume();
                this.startButton.setAlpha(0); // Cacher le bouton Play
            } else {
                // Sinon, mettre la vidéo en pause
                this.video.pause();
                this.startButton.setAlpha(1); // Montrer le bouton Play
            }
        });

        this.buttonReculer = this.add
            .image(32 + 32, this.height - 32 - 32, 'video-reculer')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.preTarget(this);
            })
            .setVisible(false)
            .setDepth(20);
        this.allControls.push(this.buttonReculer);

        this.buttonAvancer = this.add
            .image(this.width - 32 - 32, this.height - 32 - 32, 'video-avancer')
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.videoControlsActive = false;
                this.video.destroy();
                this.startButton.destroy();
                this.allControls.forEach((control) => control.destroy());
                this.postTarget(this);
            })
            .setVisible(false)
            .setDepth(20);
        this.allControls.push(this.buttonAvancer);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}
