class SoundManager {
    constructor(){
        // Variables pour mettre en pause/reprendre les audios
        this.videoMute = false
        this.muted = false
        this.audioPlayed = '',
        this.audioPlayer = undefined,

        // Pour regler le volume et effectuer une transition entre 2 audios
        this.currentVolume = 1
        this.delta = 0.1

        // Scene où est joué l'audio
        this.scene = undefined,
    
        // Info des audio à charger
        this.audioInfos= [
            {key: 'Menu' , files: ["assets/audios/Menu.wav"], player: undefined, volume: 1},
            {key: 'Level_1' , files: ["assets/audios/Level_1.wav"], player: undefined, volume: 1}
        ]
    }

    // Charge les fichiers audio (a mettre dans le load du preloader)
    loadAudios(scene){
        this.audioInfos.forEach((audioFile)=> {
            scene.load.audio(audioFile.key, audioFile.files)
        })
    }

    // Défini la scene dans laquelle se lance les audios (généralement UI car tout le temps présente)
    setScene(scene){
        this.scene = scene
    }

    // Play an audio once, without changing musique
    playOnce(key){
        if(this.muted){
            return
        }

        // Récupère les info de l'audio
        var info = this.findAudioInfo(key)

        var audioPlayerEffect = this.scene.sound.add(key)
        audioPlayerEffect.play({ volume: info.volume})
    }

    // Joue le son choisi
    // Peu etre appelé dans n'importe quelle scene, si la scene où se joue l'audio à bien été défini (généralement l'UI car tout le temps présente)
    playAudio(key){
        // Si c'est la meme musique on ne fait rien
        if(this.audioPlayed == key){
            return
        }

        // On stop l'audio existant
        this.stopAudio()

        // On lance le nouvel audio
        var info = this.findAudioInfo(key)

        this.audioPlayed = key
        this.audioPlayer = this.scene.sound.add(key)

        this.audioPlayer.play({volume: info.volume,loop: true})

        // Si le son est muté on coupe le player
        if(this.muted){
            this.audioPlayer.pause()
        }
    }

    // Stop l'audio en cours
    // Peut etre appelé dans n'importe quelle scene
    stopAudio(){
        if(this.audioPlayed != ''){
            this.audioPlayer.stop()
            this.audioPlayer = undefined
            this.audioPlayed = ''
        }
    }

    // Pause l'audio en cours
    // Peut etre appelé dans n'importe quelle scene
    pauseAudio(){
        if(this.muted){
            return
        }

        this.muted = true
        this.audioPlayer.pause()
    }

    // Reprend l'audio en cours
    // Peut etre appelé dans n'importe quelle scene
    resumeAudio(){
        if(!this.muted){
            return
        }

        this.muted = false

        if(this.audioPlayer != undefined && this.audioPlayed != ''){
            this.audioPlayer.resume()
        }
    }

    // Transition progressive entre 2 volumes
    setAudioVolume(desiredVolume){

        if(this.audioPlayer != undefined){
            this.currentVolume = desiredVolume
            var delta = this.delta
            if(this.currentVolume < this.audioPlayer.volume){
                delta = -this.delta
            }
            this.updateAudioVolume(delta)
        }
    }

    // Fonction récursive de transition du volume
    updateAudioVolume(delta){
        this.audioPlayer.volume += delta

        // On s'arrete si le volume est le meme
        if(this.audioPlayer.volume.toFixed(1) == this.currentVolume){
            this.audioPlayer.volume = this.currentVolume
            return
        }

        // On s'arrete si le volume est inférieur à ce qu'on souhaitait
        if(delta < 0 && this.audioPlayer.volume.toFixed(1) <= this.currentVolume){
            this.audioPlayer.volume = this.currentVolume
            return
        }

        // On s'arrete si le volume est supérieur à ce qu'on souhaitait
        if(delta > 0 && this.audioPlayer.volume.toFixed(1) >= this.currentVolume){
            this.audioPlayer.volume = this.currentVolume
            return
        }

        // On continue notre transition sinon
        this.scene.time.addEvent({
            delay: 75,
            callback:()=> {
                this.updateAudioVolume(delta)
            }
        })
    }

    // Retourn la structure contenant les informations de l'audio en fonction de la key en entrée
    findAudioInfo(key){
        var infoTmp = {}
        this.audioInfos.forEach(info => {
            if(info.key == key){
                infoTmp = info
            }
        })
        return infoTmp
    }

    isMuted(){
        return this.muted
    }

    // -- Coupe l'audio lors d'une video
    pauseAudioFromVideo(){
        if(this.muted){
            return
        }
        
        this.videoMute = true

        this.pauseAudio()
    }

    resumeAudioFromVideo(){
        if(!this.videoMute){
            return
        }

        this.resumeAudio()
        this.videoMute = false
    }
}

var soundManager = new SoundManager()

export default soundManager