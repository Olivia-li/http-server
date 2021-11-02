/**
 * Parse url string.
 * @param {String} target
 * @returns {URL} https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
function URLParse(target) {
    try {
        return new URL(target);
    } catch {
        console.error("Invalid URL.");
    }
}

/**
 * Get path of url.
 * @param {URL} target 
 * @returns 
 */
function URLPath(target) {
    return target.pathname.split('/');
}

module.exports = {URLParse, URLPath};
