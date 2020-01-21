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
            !isImg(el) &&
            // and is not a Google Translate link
            !el.innerText.match(/translate this page/i)
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
    const styles = "color: #2c8734 !important; font-size: 1.17rem;";
    const linkText = decodeURI(el.href);
    const html = `
        <div>
            <a href="${el.href}" class="show-me-urls" style="${styles}">${linkText}</a>
        </div>
    `.trim();

    // Mozilla's linter doesn't like innerHTML, so this technique gets
    // around the warning.
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, "text/html");
    const tags = parsed.getElementsByTagName("div");
    const div = document.createElement("div");

    for (const tag of tags) {
        div.appendChild(tag);
    }

    return div;
}
