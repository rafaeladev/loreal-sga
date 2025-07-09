export default class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, params) {
        super(scene, x, y, []);

        this.scene = scene;
        scene.add.existing(this);

        this.isLocked = false

        this.addBody(params)        

        // Ajout intéractions
        this.setInteractive({useHandCursor: true});

        this.on('pointerover', () => {
            this.pointerOver()
        })

        this.on('pointerout', () => {
            this.pointerOut()
        })
    }

    setClickFunction( clickFunction ){
        this.on('pointerup', () => {
                clickFunction(this);
        }, this.scene);
    }

    // -- A completer dans les class enfants

    addBody(params){
        this.setSize(10, 10); // Sinon Pause problème sinon pour l'intéractivité car aucune dimension
        // Ajout des éléments du bouton
    }

    pointerOver(){
        // Ajout de l'animation du hover
    }

    pointerOut(){
        // Ajout de l'animation du hover        
    }

    setLocked(){
        // Ajout de l'état bloqué
        this.isLocked = true
    }

    setUnlocked(){
        // Ajout de l'état débloqué
        this.isLocked = false
    }
}