/**
 * Parse url string.
 * @param {String} target
 * @returns {URL} https://developer.mozilla.org/en-US/docs/Web/API/URL
 */
export function URLparse(target) {
    try {
        return new URL(target);
    } catch {
        console.error("Invalid URL.");
    }
}

/**
 * Get path of url.
 * @param {URL} target 
 * @returns {String[]}
 */
export function URLpath(target) {
    return target.pathname.split('/');
}

/**
 * Get URLSearchParams object for working with query strings.
 * @param {URL} target 
 * @returns {URLSearchParams} https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 */
export function URLparams(target) {
    return target.searchParams;
}
