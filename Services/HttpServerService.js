const net = require("net");
const {HttpRequestMessage} = require("../Models/HttpRequestMessage");
const {httpGet, httpPost, httpPut, httpDelete} = require("../Controller/HttpServerController");
const replaceAll = require('string.prototype.replaceall');

const port = 8080;
const server = net.createServer((socketConnection) => {
    socketConnection.setEncoding('ascii');
    socketConnection.on("data", (message) => readHttpRequestMessage(server, socketConnection, message.toString("ascii")));
});

server.listen(port, () => {
    console.log("server listening on port " + port);
});

function readHttpRequestMessage(server, socketConnection, message) {

    message = replaceAll(message, '\r', '');
    message = message.split(/\n\n(.+)/);
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
            socketConnection.write(httpGet(httpMessage));
            break;

        case "POST":
            return httpPost(httpMessage);

        case "DELETE":
            return httpDelete(httpMessage);

        case "PUT":
            return httpPut(httpMessage);

        default:
            throw new UnsupportedMethodError("HTTP Method not allowed");
    }
}

module.exports = {readHttpRequestMessage};