import * as movement from "./movement.js"
import { initEditorMenu, createTable } from "./map_editor.js"


const GAME_AREA_HEIGHT = 15;
const GAME_AREA_WIDTH = 30;


function initMovement() {
    document.addEventListener('keydown', function(event) {
        movement.go(event.key)
    });
}

createTable();
initMovement();
initEditorMenu();
