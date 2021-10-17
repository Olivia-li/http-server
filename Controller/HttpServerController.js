import {parseBody} from "./HttpBodyParserController";

export function httpGet(httpMessage) {
    return null;
}

export function httpPost(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return null;
}

export function httpDelete(httpMessage) {
    return null;
}

export function httpPut(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return null;
}