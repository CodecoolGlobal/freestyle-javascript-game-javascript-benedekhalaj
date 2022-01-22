export function removeSlides(slideCount) {
    const slides = document.querySelectorAll(".slide");
    for (let i = 0; i < slideCount; i++) {
        slides[i].remove();
    }
}

export function createDivElement(className, id) {
    let div = document.createElement('div');
    div.id = id;
    div.className = className;
    document.body.appendChild(div);
}

export function removeDivElement(id) {
    const div = document.getElementById(id);
    div.remove();
}


export function scrollToPosition(position, duration) {
    document.querySelector('html').style.scrollSnapType = 'none';

    $('html, body').animate({
        scrollTop: position
    }, duration, function(){
    });

    setTimeout(function () {
        document.querySelector('html').style.scrollSnapType = 'y mandatory';
    }, duration);
}