import * as game from "./game.js";
import * as slideshow from "./slideshow.js";
import * as menu from "./menu.js";
import * as sound from "./sound.js";


sound.initVolumeButton();

const menuButton = document.querySelector('.menuButton');
menuButton.addEventListener('click', playGame);


function playGame () {
    menu.startMenuAnimation();

    setTimeout(function() {
        slideshow.removeSlides(5);
        document.body.classList.add('disable-scroll');
    }, 2250);

    setTimeout(function () {
        game.initGame();
    }, 3500);

    setTimeout(function () {
        slideshow.removeDivElement('menuBox');
        game.initMovement();
    }, 5500);
};
