import { getOriginCoordinates } from "./movement.js"


function resetPosition(){
  let [axisX, axisY] = getOriginCoordinates();
    let player = document.querySelector(".player");
    player.classList.remove("player");
    let startingPoint = document.querySelector(`[data-row="${axisX}"][data-column="${axisY}"]`);
    startingPoint.classList.add("player");
}

document.addEventListener('keyup', (event) => {
    var name = event.key;
    if (name === 'r' || name === 'R') {
      resetPosition()
    }
  }, false);
