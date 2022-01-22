import * as movement from "./movement.js"
import { initEditorMenu, createTable, addRotateEventListener } from "./map_editor.js"


export function initMovement() {
    document.addEventListener('keydown', startMovement
    );
}

function startMovement(event) {
    let allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (allowedKeys.includes(event.key)) {
        let startingPitch = 1;
        document.removeEventListener('keydown', startMovement);
        movement.go(event.key, startingPitch);
    }
}

createTable();
initMovement();
initEditorMenu();
addRotateEventListener();
