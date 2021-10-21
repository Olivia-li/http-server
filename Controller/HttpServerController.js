import { parseBody } from "./HttpBodyParserController";
import { HttpMessage } from "../Models/HttpMessage"
import { URLparse, URLpath } from "../Services/URLParserService";

/**
 * GET
 * Retrieve the requested resource.
 * @param {HttpMessage} httpMessage 
 * @returns 
 */
export function httpGet(httpMessage) {
    const url = URLparse(httpMessage.requestTarget);
    const path = URLpath(url);
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
    const url = URLparse(httpMessage.requestTarget);
    const path = URLpath(url);
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