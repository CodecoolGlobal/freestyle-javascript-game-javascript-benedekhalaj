export function getStepSound(pitch) {
    console.log(pitch);
    let checkpitch = console.log(String(pitch))
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