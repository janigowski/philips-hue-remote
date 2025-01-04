// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

import Popup from "./Popup.svelte";

function render() {
    const target = document.getElementById("app");

    if (target) {
        new Popup({
            target,
        });

    }
}

document.addEventListener("DOMContentLoaded", render);
