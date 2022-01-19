const playBtn = document.querySelector('.play-btn');

const compactDisk = document.querySelector('.fa-compact-disc');

const slides = document.querySelectorAll(".slide");

playBtn.addEventListener('click', function() {
    compactDisk.classList.add('rotate');
    scrollToPosition(0, 1500);
})


function removeSlides(slideCount) {
    for (let i = 0; i < slideCount; i++) {
        slides[i].remove();
    }
}

function createSlide6() {
    let div = document.createElement('div');
    let newCompactDisk = compactDisk;
    newCompactDisk.classList.add('fixed');
    div.className = 'slide';
    div.id = 'slide-6';
    div.appendChild(compactDisk);

    document.body.appendChild(div);
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