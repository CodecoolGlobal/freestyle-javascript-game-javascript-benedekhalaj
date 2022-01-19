import * as movement from "./movement.js"
import { initEditorMenu, createTable } from "./map_editor.js"


export function initMovement() {
    document.addEventListener('keydown', function(event) {
        let allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        if (allowedKeys.includes(event.key)) {
            movement.go(event.key);
        }
    });
}

// createTable();
// initMovement();
// initEditorMenu();
