class TraductionManager {
    constructor(){
        this.traductions = {}
        this.langue = "FR"
    }

    // Charge le fichier en mémoire
    // A ajouter dans le preloader
    loadFile(scene){
        scene.load.text('traductions', 'assets/traductions.csv');
    }

    // Récupère les info du fichier
    // A ajouter dans la scene presente partout (généralement UI)
    init(scene){
        // Lie le texte
        var data = scene.cache.text.get('traductions')
        console.log("data : ", data)

        // Créé la structure
        var arrayData = this.CSVToArray(data, ",")
        console.log("arrayData : ", arrayData)

        // Mise en forme : récupère les langues
        var langues = arrayData.shift()
        langues.shift() // on enelve la première valeur qui n'est pas utile, normalement le mot clé "key"
        for(var i = 0; i < langues.length; i++){
            var L =  langues[i]
            this.traductions[L] = {}
        }

        // Mise en forme : récupère les lots key/value pour chaque langue
        for(var i = 0; i < arrayData.length; i++){
            var line =  arrayData[i]
            const key = line.shift()

            for(var j = 0; j < line.length; j++){
                this.traductions[langues[j]][key] = line[j]
            }

        }

        console.log("structure traduite  : ", this.traductions)

    }

    // Permet de définir la langue du jeu
    // Peut potentiellement etre récupérée depuis un fichier de config
    setLangue(langue){
        this.langue = langue
    }

    // Permet de récupérer le text
    // Peut etre utilisé dans n'importe quelle scene
    getText(key){
        return this.traductions[this.langue][key]
    }

    CSVToArray( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
            );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[ 1 ];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
                ){

                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push( [] );

            }

            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[ 2 ]){

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[ 2 ].replace(
                    new RegExp( "\"\"", "g" ),
                    "\""
                    );

            } else {

                // We found a non-quoted value.
                strMatchedValue = arrMatches[ 3 ];

            }


            // Now that we have our value string, let's add
            // it to the data array.
            arrData[ arrData.length - 1 ].push( strMatchedValue );
        }

        // Return the parsed data.
        return( arrData );
    }

    
}

var tradManager = new TraductionManager()

export default tradManager