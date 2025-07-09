// Comment utiliser le "Scorm" Sydo :

// Dans app.js

// - importer LmsProtocle dans app.js (import lmsProtocle from "./js/utils/LmsProtocle.js")

// - ajouter le code suivant dans app.js en dessous de var = game 
// const getUrlVars = () => {
//   var vars = {};
//   var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
//       vars[key] = value;
//   });
//   return vars;
// }
// const getUrlParam = (parameter, defaultvalue) => {
//   var urlparameter = defaultvalue;
//   if (window.location.href.indexOf(parameter) > -1) {
//       urlparameter = getUrlVars()[parameter];
//   }
//   return urlparameter;
// };
// var bubbleUid = getUrlParam('uid', 'Empty')
// let packData = {
//   bubbleId: bubbleUid,
//   bubbleGameData: undefined
// }

// - créer une function launchGame(packData) contenant la function anonyme crée pour le window.onload en gardant le contenu spécifique au jeu
// et remplacer game.scene.start("Boot") par game.scene.start("Boot", packData) à la fin de la dite fonction
// ex :
// function launchGame(packData) {
// var config = {
//   autoResize: true,
//   width: 1920,
//   height: 1080,
//   backgroundColor: '#fff',
//   type: Phaser.AUTO,
//   parent: "game",
//   dom: {
//       createContainer: true
//   },
// ...
// console.log('  __       __|  __  ');
// console.log('__)  (__| (__| (__) ');
// console.log('        |           ');
// game.scene.start("Boot", packData);
// }

// - ajouter le code suivant ensuite 
// if (bubbleUid != undefined && bubbleUid != null && bubbleUid != "" && bubbleUid != 'Empty') {
//   lmsProtocle.setVariables(bubbleUid, 'https://sydo-lms.bubbleapps.io/api/1.1/obj')
//   lmsProtocle.getBubbleData()
//       .then((data) => {
//               packData.bubbleGameData = data
//               launchGame(packData);
//       })
//       .catch((error) => {
//           console.error("Error during the request:", error.message);
//       });
// } else {
//   launchGame(packData);
// }


// Dans Boot.js

// - dans init(data) après l'expression suivante :
// if (value != undefined && value != null && value != "" && value != 'Empty') {
//   startScene = value
// }
// ajouter le code suivant en remplaçant le contenu de this.game.data ={} par le game.data du jeu en cours 

// if (data.bubbleGameData !== undefined && data.bubbleGameData.response.hasOwnProperty("dataUser")) {
//   this.game.data = JSON.parse(data.bubbleGameData.response.dataUser)
// } else {
//   this.game.data = {
//     sceneStopped: '',
//     sceneRunning: "",
//     'Preloader': {
//       next: startScene
//     },
//   ...
//   }
// }

// Dans les Scenes 

//  - importer LmsProtocle dans les scenes nécessaire (import lmsProtocle from "../utils/LmsProtocle.js";) 
//  - utiliser les fonction dans le jeu selon l'exemple suivant :
// pour stocker les data de jeu en cours :
//    lmsProtocle.sendUserData(this.game.data)
// pour signaler la fin du module :
//    lmsProtocle.gameCompleted(this.game.data)




class LmsProtocle {
  constructor() {
    this.uid = undefined;
    this.url = undefined
  }

  setVariables(uid, url) {
    this.uid = uid;
    this.url = url;
  }

  sendData(data) {
    const jsonData = JSON.stringify(data);
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", `https://sydo-lms.bubbleapps.io/api/1.1/obj/scormscore/${this.uid}`, true);
    xhr.setRequestHeader("Authorization", "Bearer c213433839291460f147ccb49d2555ee");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
        console.log("sendData Response:", xhr);
      } else {
        console.error("Erreur lors de la requête :", xhr.status);
      }
    };

    xhr.send(jsonData);
  }

  gameCompleted(gameData) {
    const data = {
      complete: true,
      dataUser: JSON.stringify(gameData)
    };
    this.sendData(data);
  }

  sendUserData(gameData) {
    const data = {
      dataUser: JSON.stringify(gameData)
    };
    this.sendData(data);
  }

  gameStarted() {
    var data = {
      started: true,
    }
    var jsonData = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", `https://sydo-lms.bubbleapps.io/api/1.1/obj/scormscore/${this.uid}`, true);
    xhr.setRequestHeader("Authorization", "Bearer c213433839291460f147ccb49d2555ee");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
      } else {
        console.error("Erreur lors de la requête :", xhr.status);
      }
    };
    xhr.send(jsonData);

  }

  getBubbleData(gameData) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", `https://sydo-lms.bubbleapps.io/api/1.1/obj/scormscore/${this.uid}`, true);
      xhr.setRequestHeader("Authorization", "Bearer c213433839291460f147ccb49d2555ee");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201 || xhr.status === 204) {
          const response = JSON.parse(xhr.responseText);
          console.log("getBubbleData response", response);
          if (!response.response.started) {
            resolve(response); 
          } else {
            console.log("response.response", response.response);
            const dataUser = JSON.parse(response.response.dataUser);
            console.log("dataUser", dataUser);
            resolve(dataUser);
          }
        } else {
          reject(new Error(`Erreur lors de la requête Boot : ${xhr.status}`));
        }
      };
      xhr.send();
    });
  }
}

var lmsProtocle = new LmsProtocle()
export default lmsProtocle