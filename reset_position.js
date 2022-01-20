const AXIS_X_START = 0;
const AXIS_Y_START = 0;

function resetPosition(){
    let player = document.querySelector(".player");
    player.classList.remove("player");
    let startingPoint = document.querySelector(`[data-row="${AXIS_Y_START}"][data-column="${AXIS_X_START}"]`);
    startingPoint.classList.add("player");
}

document.addEventListener('keyup', (event) => {
    var name = event.key;
    if (name === 'r' || name === 'R') {
      resetPosition()
    }
  }, false);
