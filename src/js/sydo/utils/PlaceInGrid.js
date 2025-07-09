function placeInGridFromTopLeft(arrayElements, nbColumn, x, y, deltaX, deltaY){
    var line = 0
    for(var i =0; i < arrayElements.length; i++){
        // Increment le nombre de ligne
        if(i% nbColumn == 0 && i != 0){
            line++
        }

        // Positionne l'élément
        var pos = i - line * nbColumn

        arrayElements[i].x = x + pos * deltaX
        arrayElements[i].y = y + line * deltaY
    }
}

function placeInGridFromTopCenter(arrayElements, nbColumn, x, y, deltaX, deltaY){
    var line = 0
    for(var i =0; i < arrayElements.length; i++){
        // Increment le nombre de ligne
        if(i% nbColumn == 0 && i != 0){
            line++
        }

        // Positionne l'élément
        var pos = i - line * nbColumn

        arrayElements[i].x = x + pos * deltaX - (nbColumn-1) / 2 * deltaX
        arrayElements[i].y = y + line * deltaY
    }
}

function placeInGridFromCenter(arrayElements, nbColumn, x, y, deltaX, deltaY){
    var line = Math.ceil(arrayElements.length / nbColumn);
    line = -(line-1)/2

    var posInLine = 0
    for(var i =0; i < arrayElements.length; i++){
        // Increment le nombre de ligne
        if(i% nbColumn == 0 && i != 0){
            line++
            posInLine++
        }

        // Positionne l'élément
        var pos = i - posInLine * nbColumn

        arrayElements[i].x = x + pos * deltaX - (nbColumn-1) / 2 * deltaX
        arrayElements[i].y = y + line * deltaY
    }
}

export{
    placeInGridFromTopLeft,
    placeInGridFromTopCenter,
    placeInGridFromCenter
}