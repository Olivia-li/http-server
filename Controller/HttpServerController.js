const {parseBody} = require( "./HttpBodyParserController");
const {HttpMessage} = require( "../Models/HttpMessage");
const {URLParse, URLPath} = require( "../Services/URLParserService");

/**
 * GET
 * Retrieve the requested resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
function httpGet(httpMessage) {
    const url = URLParse(httpMessage.requestTarget);
    const path = URLPath(url);
    // retrieve target from server

    // on bad request, return 4XX error

    // on server failure, return 5XX error

    // on success, return 200 Ok with resource in body

    return "HTTP/1.1 200 OK";
}

/**
 * POST
 * Add given resource to target.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
function httpPost(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return "HTTP/1.1 200 OK";
}

/**
 * DELETE
 * Remove requested resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
function httpDelete(httpMessage) {
    const url = URLParse(httpMessage.requestTarget);
    const path = URLPath(url);
    // remove target from server

    // on bad request, return 4XX error

    // on server failure, return 5XX error

    // on success, return 200 Ok with resource in body

    return "HTTP/1.1 200 OK";
}

/**
 * PUT
 * Replace target resource with given resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
function httpPut(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return "HTTP/1.1 200 OK";
}