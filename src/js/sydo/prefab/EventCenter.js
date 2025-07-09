/**
 * ATTENTION : beaucoup de soucis avec les events oubliés.
 * Bien penser à supprimer les event en fin ou début de scene
 * eventsCenter.removeListener('....')
 */
const eventsCenter = new Phaser.Events.EventEmitter()

export default eventsCenter