// prevent adding the links multiple times
const addedLinks = document.querySelector(".show-me-urls");
if (!addedLinks) {
    fixGoogle();
}

/**
 * The main functionality.
 */
function fixGoogle() {
    const els = document.querySelectorAll("#search h2 + div [href]");
    els.forEach(el => {
        if (
            // remove empty elements
            el.innerText.trim() &&
            // remove internal links
            !el.href.match(/www\.google\.com\/(url|search)/) &&
            // don't append URLs to images
            !isImg(el)
        ) {
            const a = createLink(el);
            el.parentNode.insertBefore(a, el.nextSibling);
        }
    });
}

/**
 * See if the link is wrapped around an image.
 */
function isImg(el) {
    const childTags = [...el.childNodes].map(x => x.tagName);
    if (childTags.includes("G-IMG")) {
        return true;
    }
    return false;
}

/**
 * Create a link to display on the page.
 */
function createLink(el) {
    const div = document.createElement("div");
    div.classList.add("show-me-urls");
    const a = document.createElement("a");
    a.href = el.href;
    a.innerText = el.href;
    div.appendChild(a);
    a.style.backgroundColor = "#fffbd6";
    a.style.fontSize = "1.17rem";
    return div;
}
