// Permet d'ajuster la taille d'un texte
function autoSizeFont(textElement, width, height, minFontSize){
    var defaultFontSize = parseInt(textElement.style.fontSize.replace("px", ""))
    if (width > 0 && height > 0)
    {
        var size = defaultFontSize;
        while ((textElement.width > width || textElement.height > height) && defaultFontSize > minFontSize)
        {
            --size;
            textElement.setFontSize(size);
            defaultFontSize = parseInt(textElement.style.fontSize.replace("px", ""))
        }
    }

}

export {
    autoSizeFont
}