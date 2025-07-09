export default class Slider extends Phaser.GameObjects.Container {
    constructor(scene, x, y, delta) {
        super(scene, x, y, []);

        this.scene = scene;
        scene.add.existing(this);

        this.dot = this.scene.add.circle(0, 0, 20, 0x000000)
        this.add(this.dot)

        this.slider = this.scene.plugins.get('rexSlider').add(this.dot, {
            endPoints: [
                {x:-delta/2, y:0},
                {x:delta/2, y:0}
            ]
        });


    }

    // Découpe le slider
    // Place le point automatiquement sur une des zones
    slice(nb){
        // Permet de déterminer l'espace pour automatiquement mettre le slider sur les points
        this.delta = (Math.round(1 / (nb-1) * 100) / 100).toFixed(2);

        // Ajout fonction au relachement du slider pour glisser sur le point le plus proche
        this.dot.on('pointerup', ()=> {
            const pos = Math.round(this.getValue() / this.delta)
            console.log(this.getValue(), this.delta, pos)

            this.slider.value = pos * (Math.round(1 / (nb-1) * 100) / 100).toFixed(2);
        })
    }


    lock(){
        this.slider.setEnable(false)
    }

    unlock(){
        this.slider.setEnable(true)
    }

    getValue(){
        return this.slider.value
    }

    setValue(v){
        this.slider.value = v
    }
}