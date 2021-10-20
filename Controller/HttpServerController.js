import {parseBody} from "./HttpBodyParserController";
import {HttpMessage} from "../Models/HttpMessage"

/**
 * GET
 * Retrieve the requested resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
export function httpGet(httpMessage) {
    const target = httpMessage.requestTarget;
    // retrieve target from server

    // on bad request, return 4XX error

    // on server failure, return 5XX error

    // on success, return 200 Ok with resource in body

    return null;
}

/**
 * POST
 * Add given resource to target.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
export function httpPost(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return null;
}

/**
 * DELETE
 * Remove requested resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
export function httpDelete(httpMessage) {
    const target = httpMessage.requestTarget;
    // remove target from server

    // on bad request, return 4XX error

    // on server failure, return 5XX error

    // on success, return 200 Ok with resource in body

    return null;
}

/**
 * PUT
 * Replace target resource with given resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
export function httpPut(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return null;
}