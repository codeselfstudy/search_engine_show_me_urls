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
    const template = document.createElement("template");
    // const styles = "background-color: #fffbd6; font-size: 1.17 rem";
    const styles = "color: #2c8734 !important; font-size: 1.17rem;";
    const html = `
        <div>
            <a href="${el.href}" class="show-me-urls" style="${styles}">${el.href}</a>
        </div>
    `.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}
