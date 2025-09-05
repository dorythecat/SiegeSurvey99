const text_ids = [
    "title",
    "start",
    "climb_start",
    "climb_middle",
    "almost_there",
    "the_sign",
    "aaaaalmost_there"
];

const texts = [];

for (let i = 0; i < text_ids.length; i++) texts.push(document.getElementById(text_ids[i]));

let current_text = 0;

function showText(index) {
    texts[index].style.display = "block";
}

function hideText(index) {
    texts[index].style.display = "none";
}

function nextText() {
    if (current_text >= texts.length - 1) return;
    hideText(current_text++);
    showText(current_text);
}

function previousText() {
    if (current_text <= 0) return;
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