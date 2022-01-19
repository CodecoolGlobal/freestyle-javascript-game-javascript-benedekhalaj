function rotate(){
    let button = document.getElementById("menuButton");
    let miniDisc = document.getElementById("miniDisc");
    const sound = new Audio("audio/menu audio/mixkit-record-player-vinyl-scratch-702.wav")
    button.classList.add("rotating");
    miniDisc.classList.add("hideDisc");
    setTimeout(function() {
        console.log('music')
        sound.play()
    }, 1400)
    setTimeout(function() {
        console.log('animation ended')
    }, 2300)
}


