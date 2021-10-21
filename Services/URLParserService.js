/**
 * Parse url string.
 * @param {String} target
 * @returns {URL} https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
export function URLparse(target) {
    try {
        return url = new URL(target);
    } catch {
        console.error("Invalid URL.");
    }
}

/**
 * Get path of url.
 * @param {URL} target 
 * @returns 
 */
export function URLpath(target) {
    return target.pathname.split('/');
}