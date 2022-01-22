import * as movement from "./movement.js"
import { initEditorMenu, createTable, rotateMap } from "./map_editor.js"


export function initMovement() {
    document.addEventListener('keydown', startMovement
    );
}

function startMovement(event) {
    let allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (allowedKeys.includes(event.key)) {
        document.removeEventListener('keydown', startMovement);
        document.removeEventListener('keydown', rotateMap)
        movement.go(event.key, 1);
    }
}
