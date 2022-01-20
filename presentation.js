import { getLevelOne } from "./levels.js";
import { initMovement } from "./game.js";

const menuButton = document.querySelector('.menuButton');
const slides = document.querySelectorAll(".slide");
const body = document.body;
const menu = document.querySelector('.menuBox');
const disk = document.querySelector('.fa-compact-disc');
const volumeIcon = document.getElementsByClassName('fa-volume-up')[0];
const mutedVolumeIcon = document.getElementsByClassName("fa-volume-mute")[0];
const sound = new Audio("audio/menu audio/sample5.ogg");

const playBtn = document.querySelector('.play-btn');

menuButton.addEventListener('click', function() {
    disk.classList.add('start-spin');

    setTimeout(function () {
        disk.classList.remove('start-spin');
        disk.classList.add('continue-spin');
        rotate();
    }, 900);
    
    setTimeout(function () {
        disk.classList.remove('continue-spin');
        disk.classList.add('spin');
        body.classList.add('disable-scroll');
        removeSlides(4);
        createDivElement('level', 'level-1');
    }, 2250);
    setTimeout(function () {
        const html = document.querySelector('html');
        html.classList.add('init-game');
        const gameArea = document.getElementById('level-1');
        gameArea.innerHTML = '<h1>Level 1</h1><div id="display"></div>';
        gameArea.children[1].innerHTML = getLevelOne();
        scrollToPosition($(document).height() - gameArea.clientHeight, 2000)
    }, 3500);
    setTimeout(function () {
        removeDivElement('menuBox');
        initMovement();
    }, 5500);

playBtn.addEventListener('click', function () {
    scrollToPosition($(document).height() - menu.clientHeight, 2000);
})


function removeSlides(slideCount) {
    for (let i = 0; i < slideCount; i++) {
        slides[i].remove();
    }
}

function createDivElement(className, id) {
    let div = document.createElement('div');
    div.id = id;
    div.className = className;
    document.body.appendChild(div);
}

function removeDivElement(id) {
    const div = document.getElementById(id);
    div.remove();
}


function scrollToPosition(position, duration) {
    document.querySelector('html').style.scrollSnapType = 'none';

    $('html, body').animate({
        scrollTop: position
    }, duration, function(){
    });

    setTimeout(function () {
        document.querySelector('html').style.scrollSnapType = 'y mandatory';
    }, duration)
}})


function rotate(){
    let button = document.getElementById("menuButton");
    let miniDisc = document.getElementById("miniDisc");
    // const sound = new Audio("audio/menu audio/mixkit-record-player-vinyl-scratch-702.wav")
    button.classList.add("rotating");
    miniDisc.classList.add("hideDisc");
    playSoundForMenu()
}


function playSoundForMenu(){
    setTimeout(function() {
        sound.play()
    }, 1200)
}


function playSound(){
    mutedVolumeIcon.style.display="none";
    mutedVolumeIcon.style.visibility="hidden";
    volumeIcon.style.display="block";
    volumeIcon.style.visibility="visible";
    sound.play()
}

function muteSound(){
    volumeIcon.style.display="none";
    volumeIcon.style.visibility="hidden";
    mutedVolumeIcon.style.display="block";
    mutedVolumeIcon.style.visibility="visible";
    sound.pause()
}

volumeIcon.addEventListener("click",muteSound)
mutedVolumeIcon.addEventListener("click",playSound)
