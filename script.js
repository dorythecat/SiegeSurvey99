const text_ids = [
    "instructions",
    "title",
    "start",
    "climb_start",
    "climb_middle",
    "almost_there",
    "the_sign",
    "aaaaalmost_there",
    "neon_sign",
    "entrance",
    "interior1"
];

const texts = [];

for (let i = 0; i < text_ids.length; i++) texts.push(document.getElementById(text_ids[i]));

let current_text = 0;
let active_h1 = null;

function showText(index) {
    if (index === 0) {
        // Do not fade instructions
        texts[index].style.display = 'block';
        return;
    }

    const element = texts[index];
    if (element.tagName === 'H1') {
        if (active_h1) active_h1.style.display = 'none';
        active_h1 = element;
    }

    // Unfade function
    let op = 0.1;  // initial opacity
    element.style.opacity = op; // Prevent flashing
    element.style.display = 'block';
    const timer = setInterval(() => {
        if (op >= 1) clearInterval(timer);
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

function hideText(index) {
    if (index === 0) {
        // Do not fade instructions
        texts[index].style.display = 'none';
        return;
    }

    const element = texts[index];
    if (element.tagName === 'H1') {
        if (active_h1 === element) return;
        active_h1.style.display = 'none';
        active_h1 = element;
    }

    // Fade function
    let op = 1;  // initial opacity
    const timer = setInterval(() => {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function nextText() {
    if (current_text >= texts.length - 1) return;
    hideText(current_text++);
    showText(current_text);
}

function previousText() {
    if (current_text <= 1) return; // Prevent going back to instructions
    hideText(current_text--);
    showText(current_text);
}

document.addEventListener("pointerdown", nextText);
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") nextText();
    else if (event.key === "ArrowLeft") previousText();
});

// Initialize by showing the first text
showText(current_text);