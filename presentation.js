const playBtn = document.querySelector('.play-btn');
const stopBtn = document.querySelector('.stop-btn');
const compactDisk = document.querySelector('.fa-compact-disc');
const audio = document.getElementById("myAudio");

playBtn.addEventListener('click', function() {
    compactDisk.classList.add('rotate');
    audio.play();
})

stopBtn.addEventListener('click', function() {
    compactDisk.classList.remove('rotate');
    audio.pause();
})
