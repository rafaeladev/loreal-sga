import { Colors } from "../consts/Colors";


// timeText : Temps affiché (ex: "1:30")
// duration : Durée du compte à rebours en secondes

export default class CountDown extends Phaser.GameObjects.Container {
    constructor(scene, x, y, timeText, duration) {
        super(scene, x, y, []);

        this.scene = scene;
        scene.add.existing(this);

        this.timeText = timeText
        this.duration = duration

        this.timerText = this.scene.add.text(0, 0, this.timeText, { fontSize: '48px', fill: '#fff' }).setOrigin(0.5)
        this.backChrono = this.scene.add.rectangle(0, 0, this.timerText.width + 60, this.timerText.height + 30, Colors.Elmt.BleuVert).setOrigin(0.5)
        this.add(this.backChrono)
        this.add(this.timerText)
    }
    // fonction à appeller pour lancer le compte à rebours
    startTimer() {
        this.timeLeft = this.duration;

        // Met à jour le texte du timer chaque seconde
        this.timerEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        // Diminue le temps restant
        // this.way === "up" ? this.timeLeft++ : this.timeLeft--;
        this.timeLeft--;

        // Calcule les minutes et les secondes restantes
        let minutes = Math.floor(this.timeLeft / 60);
        let seconds = this.timeLeft % 60;

        // Formate le texte du timer
        this.textChrono = `${minutes}:${seconds.toString().padStart(2, '0')}`
        this.timerText.setText(this.textChrono);

        // Si le temps est écoulé, arrête le timer
        if (this.timeLeft <= 0) {
            this.timerEvent.remove();
            this.onTimerComplete();
        }
    }
    // fonction à appeller quand le temps est écoulé
    onTimerComplete() {
        this.scene.scene.start('GameEnd');
    }
    // fonction à appeller pour arrêter le compte à rebours
    stopTimer() {
        this.timerEvent.remove();
    }
}