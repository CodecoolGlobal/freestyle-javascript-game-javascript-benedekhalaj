import * as movement from "./movement.js"
import { initEditorMenu, createTable } from "./map_editor.js"


function initMovement() {
    document.addEventListener('keydown', function(event) {
        movement.go(event.key)
    });
}

createTable();
initMovement();
initEditorMenu();
