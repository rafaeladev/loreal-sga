import eventsCenter from "../prefab/EventCenter"

// Permet d'ajouter le texte lettre par lettre. Comme si on tapait au clavier
function typeText(scene, elmt, text, typeDelay){
    if(text.length != 0){
        scene.time.addEvent({
            delay: typeDelay,
            callback: ()=>{
                var letter = text[0]
                text = text.slice(1)
                elmt.text += letter
                typeText(scene, elmt, text, typeDelay)
            }
        })
    }else{
        eventsCenter.emit('typingended')
    }
}

export {
    typeText
}