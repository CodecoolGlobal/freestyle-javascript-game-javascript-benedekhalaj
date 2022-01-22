import * as game from "./game.js";
import * as slideshow from "./slideshow.js";
import * as menu from "./menu.js";


const menuButton = document.querySelector('.menuButton');

const body = document.body;
const menuBox = document.querySelector('.menuBox');
const disk = document.querySelector('.fa-compact-disc');



menuButton.addEventListener('click', playGame);


function playGame () {
    disk.classList.add('start-spin');

    setTimeout(function () {
        disk.classList.remove('start-spin');
        disk.classList.add('continue-spin');
        menu.rotate();
    }, 900);
    
    setTimeout(function () {
        disk.classList.remove('continue-spin');
        disk.classList.add('spin');
        body.classList.add('disable-scroll');
        slideshow.removeSlides(5);
        slideshow.createDivElement('level', 'level-1');
    }, 2250);

    setTimeout(function () {
        const gameArea = document.getElementById('level-1');
        game.initLevelOne();
        slideshow.scrollToPosition($(document).height() - gameArea.clientHeight, 2000);
    }, 3500);

    setTimeout(function () {
        slideshow.removeDivElement('menuBox');
        game.initMovement();
        const volumeButton = document.querySelector('.volumeButton');
        volumeButton.style.color = 'darkcyan';
        volumeButton.classList.add('show-volumeButton');
    }, 5500);
};