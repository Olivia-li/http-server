const {parseBody} = require( "./HttpBodyParserController");
const {HttpRequestMessage} = require( "../Models/HttpRequestMessage");
const {HttpResponseMessage} = require( "../Models/HttpResponseMessage");
const {URLParse, URLPath} = require( "../Services/URLParserService");
const {CONTENT_TYPE_HEADER, CONTENT_LENGTH_HEADER, CONNECTION_HEADER} = require("../Constants/HttpHeaders")

/**
 * GET
 * Retrieve the requested resource.
 * @param {HttpRequestMessage} httpMessage
 * @returns 
 */
function httpGet(httpMessage) {
    const body = `GET request received on path: ${httpMessage.requestTarget}`;
    const headers = {};
    headers[CONTENT_TYPE_HEADER] = "text/plain";
    headers[CONTENT_LENGTH_HEADER] = `${body.length}`;
    headers[CONNECTION_HEADER] = "close";
    const status = "200 OK";

    const httpResponse = new HttpResponseMessage(httpMessage.httpVersion, status, headers, body);


    return httpResponse.toString();

    // return "HTTP/1.1 200 OK";
}

/**
 * POST
 * Add given resource to target.
 * @param {HttpRequestMessage} httpMessage
 * @returns 
 */
function httpPost(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return "HTTP/1.1 200 OK";
}

/**
 * DELETE
 * Remove requested resource.
 * @param {HttpRequestMessage} httpMessage
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
 * @param {HttpRequestMessage} httpMessage
 * @returns 
 */
function httpPut(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return "HTTP/1.1 200 OK";
}

module.exports = {httpGet, httpPost, httpDelete, httpPut};
