// A changer avec les couleurs du jeu
var Colors = {
    WhiteElmt : 0xFFFFFF,
}

// Origin du container en 0,0
export default class ZoomContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, W, H, body) {  // Body doit avoir origin en (0.5, 0.5)
        super(scene, x, y, []);

        this.scene = scene;
        scene.add.existing(this);

        this.scene.input.setTopOnly(false);
        this.limitX = W
        this.limitY = H
        this.limitZoom = 1

        // Ajout du mask cachant les élément scrollé
        this.zone = this.scene.add.graphics().setPosition(this.x, this.y)
        this.zone.fillStyle(Colors.WhiteElmt, 0)

        // Ajout élément scrollé
        this.bodyScroll = body
        this.bodyScroll.x = W/2
        this.bodyScroll.y = H/2
        this.bodyScroll.setMask(this.zone.createGeometryMask(this.zone.fillRect(0, 0, W, H)))
        this.add(this.bodyScroll)

        this.bodyScroll.setInteractive()

        this.scene.input.setDraggable(this.bodyScroll);
        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.scene.input.on('dragstart', ()=> {
            console.log( this.bodyScroll.x, this.bodyScroll.y)
        })
        this.scene.input.on('dragend', (pointer, gameObject)=> {
            if(gameObject == undefined || gameObject == null){
                return
            }

            this.checkBodyPosition()
        })

        this.canZoom = true
        this.scene.input.on('wheel', (pointer, currentlyOver, deltaX, deltaY, deltaZ)=>{ 
            // Bloque le zoom
            if(!this.canZoom || !currentlyOver){
                return
            }

            // Calcul du scale à ajouter
            var deltaScale = 0.1
            if(deltaY > 0){
                deltaScale = -deltaScale
            }   

            var S = this.bodyScroll.scale + deltaScale

            // Limite du scale
            if(S > this.limitZoom){
                S = this.limitZoom
            }

            if(S < 0.2){
                S = 0.2
            }

            // Animation du zoom
            this.canZoom = false
            this.scene.tweens.add({
                targets: this.bodyScroll,
                duration: 200,
                scale: S,
                onComplete:()=> {
                    this.checkBodyPosition()
                    this.canZoom = true
                }
            })
        })

    }

    unzoom(){
        this.scene.tweens.add({
            targets: this.bodyScroll,
            duration: 200,
            scale: 0.2,
            onComplete:()=> {
                this.checkBodyPosition()
            }
        })
    }

    lockZoom(){
        this.canZoom = false
    }

    unlockZoom(){
        this.canZoom = true
    }

    // Maj position du mask
    updateMaskPosition(){
        var X = this.x
        var Y = this.y

        if(this.parentContainer != undefined){
            X += this.parentContainer.x
            Y += this.parentContainer.y
        }

        this.zone.x = X
        this.zone.y = Y
    }

    addMaskPosition(X, Y){
        this.zone.x += X
        this.zone.y += Y
    }

    checkBodyPosition(){
        const W = this.bodyScroll.width/2
        const H = this.bodyScroll.height/2
        const S = this.bodyScroll.scale
        const X = this.bodyScroll.x
        const Y = this.bodyScroll.y

        const xMin = X - W * S
        if(xMin > 0){
            this.bodyScroll.x = W * S
        }

        const yMin = Y - H * S
        if(yMin > 0){
            this.bodyScroll.y = H * S
        }

        const xMax = X + W * S
        if(xMax < this.limitX){
            this.bodyScroll.x = this.limitX - W * S
        }

        const yMax = Y + H * S
        if(yMax < this.limitY){
            this.bodyScroll.y = this.limitY - H * S
        }
    }
}