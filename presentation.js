const menuButton = document.querySelector('.menuButton');
const slides = document.querySelectorAll(".slide");
const body = document.body;
const menu = document.querySelector('.menuBox');

const playBtn = document.querySelector('.play-btn');

menuButton.addEventListener('click', function() {
    console.log(menu);
    // scrollToPosition(0, 1000);
    // setTimeout(function () {
    //     body.classList.add('disable-scroll');
    //     removeSlides(4);
    //     createSlides;
    // }, 1000)
})

playBtn.addEventListener('click', function () {
    scrollToPosition($(document).height() - menu.clientHeight, 2000);
})


function removeSlides(slideCount) {
    for (let i = 0; i < slideCount; i++) {
        slides[i].remove();
    }
}


function createSlides() {
    for (let i = 0; i < 5; i++) {
        let div = document.createElement('div');
        let id = i + 7
        div.id = `slide-${id}`;
        div.className = 'slide';
        document.body.appendChild(div);
    }
}

function createFillerElement() {
    let slide4 = document.getElementById('slide-5');
    let div = document.createElement('div');
    div.className = 'filler';
    slide4.insertAdjacentElement('afterbegin', div);
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
}
