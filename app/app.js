const menuButton = document.querySelector('.menuButton');
const slides = document.querySelectorAll(".slide");
const body = document.body;
const menu = document.querySelector('.menuBox');
const disk = document.querySelector('.fa-compact-disc');
const volumeIcon = document.getElementsByClassName('fa-volume-up')[0];
const mutedVolumeIcon = document.getElementsByClassName("fa-volume-mute")[0];
const sound = new Audio("audio/menu audio/sample5.ogg");


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
        removeSlides(5);
        createDivElement('level', 'level-1');
    }, 2250);

    setTimeout(function () {
        const html = document.querySelector('html');
        html.classList.add('init-game');
        const gameArea = document.getElementById('level-1');
        gameArea.innerHTML = '<h1>Level 1</h1><p>by Benedek</p><div id="display"></div>';
        gameArea.children[2].innerHTML = getLevelOne();
        scrollToPosition($(document).height() - gameArea.clientHeight, 2000)
    }, 3500);

    setTimeout(function () {
        removeDivElement('menuBox');
        initMovement();
        const volumeButton = document.querySelector('.volumeButton');
        volumeButton.style.color = 'darkcyan';
        volumeButton.classList.add('show-volumeButton');
    }, 5500);

    playBtn.addEventListener('click', function () {
        scrollToPosition($(document).height() - menu.clientHeight, 2000);
    })
})
