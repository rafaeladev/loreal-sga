// IMPORTANT // Rajouter le SliderPlugin dans le app.js avec "key" : rexSlider
// If body's width is > to W given in zone parameters then the zone will adapt it's size
// If given body is text it will be better if the Wrap parameter is set to the same W given as zone's width

/**
 * Input :
 * - scene : scene d'affichage
 *  - position : x,y
 *  - dimension : W, H
 *  - body : élément à scroller
 *  - scrollerColor : couleur du le barre de scroll
 *  - maskColor : couleur du recetangle de masquage
 *  - scrollerBgColor : couleur derriere la barre de scroll
 */

// Origin du container en 0,0

export default class ScrollContainer extends Phaser.GameObjects.Container {
  constructor(
    scene,
    x,
    y,
    W,
    H,
    body,
    scrollerColor,
    maskColor,
    scrollerBgColor,
    isList = false
  ) {
    super(scene, x, y, [], isList);

    this.scene = scene;
    this.active = true;
    scene.add.existing(this);
    const topPadding = 40;

    this.rectangle = this.scene.add
      .rexRoundRectangle(
        0,
        0,
        isList ? 653 : 628.5,
        isList ? 390 : 824 + 40,
        isList ? 0 : 20,
        0xffffff
      )
      .setOrigin(0)
      .setDepth(0);

    this.add(this.rectangle);

    // Ajout du mask cachant les élément scrollé
    this.zone = this.scene.add.graphics().setPosition(0, 0);
    this.zone.fillStyle(maskColor, 0);

    // Ajout élément scrollé
    this.bodyScroll = body;
    this.bodyScroll.setDepth(3);
    this.bodyScroll.x = 40;
    this.bodyScroll.y = topPadding;

    this.bodyScroll.setOrigin(0);

    if (this.bodyScroll.width <= W) {
      this.zone.fillRect(0, 0, W, H);
      this.bodyScroll.setMask(this.zone.createGeometryMask());
      this.zoneWidth = W;
    } else {
      this.zone.fillRect(0, 0, this.bodyScroll.width, H);

      this.zoneWidth = this.bodyScroll.width;
    }
    this.add(this.bodyScroll);

    // Ajout barre de scroll
    this.fondBarreScroll = this.scene.add.rexRoundRectangle(
      this.zoneWidth - 25,
      0,
      0,
      isList ? H : H + 40,
      4,
      scrollerBgColor
    );
    this.fondBarreScroll.setOrigin(0);
    this.fondBarreScroll.setDepth(0);
    this.add(this.fondBarreScroll);

    var ratio = H * (H / this.bodyScroll.height) * 0.5;
    this.barreScroll = this.scene.add
      .rexRoundRectangle(
        this.fondBarreScroll.x,
        this.fondBarreScroll.y,
        this.fondBarreScroll.width,
        ratio,
        5,
        scrollerColor
      )
      .setOrigin(0);
    this.add(this.barreScroll);

    if (this.bodyScroll.height < H) {
      this.fondBarreScroll.setAlpha(0);
      this.barreScroll.setAlpha(0);
      this.active = false;
    }

    // Ajout règles pour le scroll
    this.scroller = this.scene.plugins.get("rexSlider").add(this.barreScroll, {
      endPoints: [
        { x: this.fondBarreScroll.x, y: 0 },
        {
          x: this.fondBarreScroll.x,
          y: this.fondBarreScroll.height - this.barreScroll.height,
        },
      ],
      enable: true,
      value: 0,
      valuechangeCallback: (value) => {
        this.bodyScroll.y =
          -((this.bodyScroll.height - H) * value) + topPadding;
      },
    });

    // Ajour listener roulette souris
    this.scene.input.on(
      "wheel",
      (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
        if (this.active && this.alpha == 1) {
          this.scroller.value += deltaY / 1000;
          if (this.scroller.value > 1) {
            this.scroller.value = 1;
          }
          if (this.scroller.value <= 0) {
            this.scroller.value = 0;
          }
        }
      }
    );
  }

  setScrollBarColor(backColor, barreColor) {
    this.fondBarreScroll.setFillStyle(backColor, 1);
    this.barreScroll.setFillStyle(barreColor, 1);
  }

  // A ajouter lors de la creation du container parent pour positionner correctement le mask
  updateMaskPosition() {
    var X = this.x;
    var Y = this.y;

    if (this.parentContainer != undefined) {
      X += this.parentContainer.x;
      Y += this.parentContainer.y;
    }

    this.zone.x = X;
    this.zone.y = Y;
  }

  // A ajouter lors de la creation du container parent pour positionner correctement le mask
  addMaskPosition(X, Y) {
    this.zone.x += X;
    this.zone.y += Y;
  }

  setMaskAlpha(maskColor, alpha) {
    this.zone.fillStyle(maskColor, alpha);
  }

  adjustY(offset) {
    this.y += offset;
    this.updateMaskPosition();
  }
}
