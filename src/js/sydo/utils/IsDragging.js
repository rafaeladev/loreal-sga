// Permet de savoir si on déplace le fond sur les jeux.
// Ajouter isDragging à true dans l'event 'drag' du input manager.
// Dans les boutons du jeu vérifier que isDragging est false pour les activer
var IsDragging = false

export default IsDragging


// --- Exemple
// this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
//     if(!gameObject.scene.isZoomed){
//         return
//     }

//     gameObject.x = dragX;
//     gameObject.y = dragY;
//  --->   IsDragging = true
// });

// this.input.on('dragstart', ()=> {
//     console.log( this.zoomContainer.x, this.zoomContainer.y)
// })

// this.input.on('dragend', (pointer, gameObject)=> {
//     if(gameObject == undefined || gameObject == null){
//         return
//     }
//     gameObject.scene.time.addEvent({
//         delay: 50,
//  --->       callback : ()=> {IsDragging = false}
//     })
// })