const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');

const compactDisk = document.querySelector('.fa-compact-disc');
const audio = document.getElementById("myAudio");

const slides = document.querySelectorAll(".slide");

playBtn.addEventListener('click', function() {
    compactDisk.classList.add('rotate');
    audio.play();
    removeSlides(4);
    document.body.classList.add('disable-scroll');

    setTimeout(function () {
        
        createFillerElement();
        createSlide6();
        createSlides();
        const slideElement = document.getElementById("slide-6");
        setTimeout(function () {
            scrollToElement(slideElement); 
        }, 1000);
        
    }, 2000);

})

stopBtn.addEventListener('click', function() {
    compactDisk.classList.remove('rotate');
    audio.pause();
    audio.currentTime = 0;
})


function scrollToElement(element) {
    element.scrollIntoView({behavior: 'smooth'});
}

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