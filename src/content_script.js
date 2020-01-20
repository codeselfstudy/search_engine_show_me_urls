document.addEventListener("DOMContentLoaded", () => {
    fixGoogle();
});

function fixGoogle() {
    const els = document.querySelectorAll("#search h2 + div [href]");
    els.forEach(el => {
        if (el.innerText.trim() && !el.href.match(/google\.com/)) {
            const a = createLink(el);
            el.parentNode.insertBefore(a, el.nextSibling);
        }
    });
}

function createLink(el) {
    const div = document.createElement("div");
    const a = document.createElement("a");
    a.href = el.href;
    a.innerText = el.href;
    div.appendChild(a);
    a.style.backgroundColor = "#fffbd6";
    return div;
}
