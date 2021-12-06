const net = require("net");
const {HttpRequestMessage} = require("../Models/HttpRequestMessage");
const {httpGet, httpPost, httpPut, httpDelete} = require("../Controller/HttpServerController");
const replaceAll = require('string.prototype.replaceall');
const {BadRequestError, UnauthorizedRequestError, ForbiddenRequestError, NotFoundError, UnsupportedMethodError, RequestURITooLongError, UnsupportedContentTypeError} = require('../Models/Errors/HttpClientErrors');
const {CONTENT_TYPE_HEADER, CONTENT_LENGTH_HEADER, CONNECTION_HEADER} = require("../Constants/HttpHeaders");
const {HttpResponseMessage} = require("../Models/HttpResponseMessage");
const {InternalServerError} = require("../Models/Errors/HttpServerErrors");

const port = 8080;

const server = net.createServer((socketConnection) => {
    socketConnection.setEncoding('utf-8');
    socketConnection.on('error', function (e) {
       console.log(e);
    });
    socketConnection.on("data", (message) => {
        try {
            readHttpRequestMessage(socketConnection, message.toString("utf-8"))
        } catch (e) {
            if (e instanceof  BadRequestError
                || e instanceof  UnauthorizedRequestError
                || e instanceof  ForbiddenRequestError
                || e instanceof  NotFoundError
                || e instanceof  UnsupportedMethodError
                || e instanceof  RequestURITooLongError
                || e instanceof  UnsupportedContentTypeError
                || e instanceof  InternalServerError) {
                socketConnection.write(createHttpErrorResponse(e).toString());
            } else {
                socketConnection.write(createHttpErrorResponse(new InternalServerError(e.toString())).toString());
            }
        }
    });
});

server.listen(port, () => {
    console.log("server listening on port " + port);
});

function readHttpRequestMessage(socketConnection, message) {

    message = replaceAll(message, '\r', '');
    message = [message.split('\n\n')[0], message.split('\n\n').splice(1).join('\n\n')];
    if (message.length > 2 || message.length < 1) {
        throw new BadRequestError("Malformed HTTP Request");
    }
    const requestInfo = message[0].split("\n");
    const body = message.length === 2 ? message[1] : '';

    const startLine = requestInfo[0].split(" ");
    if (startLine.length !== 3) {
        throw new BadRequestError("Malformed Start Line in HTTP Request")
    }
    const httpMethod = startLine[0];
    const requestTarget = startLine[1];
    const httpVersion = startLine[2];

    var headers = {};
    for (let i = 1; i < requestInfo.length; i++) {
        var header = requestInfo[i].split(/:(.+)/);
        if (header.length < 2) {
            continue;
        }
        headers[header[0]] = header[1].trim();
    }

    const httpMessage = new HttpRequestMessage(httpMethod, requestTarget, httpVersion, headers, body);

    switch (httpMethod) {
        case "GET":
            httpGet(httpMessage, socketConnection);
            break;

        default:
            throw new UnsupportedMethodError("HTTP Method not allowed");
    }
}

function createHttpErrorResponse(error) {
    const responseBody = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Error</title>
            </head>
            <body>
                <h1>${error.errorCode}: ${error.name}</h1>
            </body>
        </html> 
    `;

    const headers = {};
    headers[CONTENT_TYPE_HEADER] = "text/html";
    headers[CONTENT_LENGTH_HEADER] = `${responseBody.length}`;
    headers[CONNECTION_HEADER] = "close";

    return new HttpResponseMessage('HTTP/1.1', error.errorCode, headers, responseBody);
}

module.exports = {readHttpRequestMessage};