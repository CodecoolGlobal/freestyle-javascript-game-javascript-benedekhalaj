function rotate(){
    let button = document.getElementById("menuButton");
    let miniDisc = document.getElementById("miniDisc");
    button.classList.add("rotating");
    miniDisc.classList.add("hideDisc");
    playSoundForMenu()
}