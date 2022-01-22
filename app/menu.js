import * as sound from "./sound.js";


export function startMenuAnimation() {
    const disk = document.querySelector('.fa-compact-disc');
    startDiskRotation(disk);

    setTimeout(function () {
        continueDiskRotation(disk);
        rotateButton();
    }, 900);
    
    setTimeout(function () {
        rotateDisk(disk);
    }, 2250);
}


function rotateButton() {
    const button = document.getElementById("menuButton");
    const miniDisc = document.getElementById("miniDisc");
    button.classList.add("rotating");
    miniDisc.classList.add("hideDisc");
    sound.playSoundForMenu();
}


function startDiskRotation (disk) {
    disk.classList.add('start-spin');
}


function continueDiskRotation (disk) {
    disk.classList.remove('start-spin');
    disk.classList.add('continue-spin');
}


function rotateDisk(disk) {
    disk.classList.remove('continue-spin');
    disk.classList.add('spin');
}



