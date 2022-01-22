export function playSoundForMenu(){
    setTimeout(function() {
        sound.play()
    }, 1200)
}


const volumeIcon = document.getElementsByClassName('fa-volume-up')[0];
const mutedVolumeIcon = document.getElementsByClassName("fa-volume-mute")[0];
const sound = new Audio("audio/menu audio/sample5.ogg");



export function getStepSound(pitch) {
    console.log(pitch);
    const stepSoundBank = {
        "1": new Audio("audio/soundFX/pitch_1.ogg"),
        "2": new Audio("audio/soundFX/pitch_2.ogg"),
        "3": new Audio("audio/soundFX/pitch_3.ogg"),
        "4": new Audio("audio/soundFX/pitch_4.ogg"),
        "5": new Audio("audio/soundFX/pitch_5.ogg"),
        "6": new Audio("audio/soundFX/pitch_6.ogg"),
        "7": new Audio("audio/soundFX/pitch_7.ogg"),
        "8": new Audio("audio/soundFX/pitch_8.ogg"),
        "9": new Audio("audio/soundFX/pitch_9.ogg"),
        "10": new Audio("audio/soundFX/pitch_10.ogg"),
        "11": new Audio("audio/soundFX/pitch_11.ogg"),
    }
    console.log(stepSoundBank[String(pitch)])
    return stepSoundBank[String(pitch)]
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function fadeOut(audio){
    for(var i=1;i>0;i-=0.1){
        await sleep(100);
        audio.volume = i
    }
}

async function fadeIn(audio){
    for(var i=0;i<1;i+=0.1){
        await sleep(100);
        audio.volume = i
    }
}


function playSound(){
    mutedVolumeIcon.style.display="none";
    mutedVolumeIcon.style.visibility="hidden";
    volumeIcon.style.display="block";
    volumeIcon.style.visibility="visible";
    fadeIn(sound)
    sound.play()
}

async function muteSound(){
    volumeIcon.style.display="none";
    volumeIcon.style.visibility="hidden";
    mutedVolumeIcon.style.display="block";
    mutedVolumeIcon.style.visibility="visible";
    fadeOut(sound);
    await sleep(1000);
    sound.pause();
}


volumeIcon.addEventListener("click", muteSound);
mutedVolumeIcon.addEventListener("click", playSound);