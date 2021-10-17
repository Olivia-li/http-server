import {HttpMessage} from "../Models/HttpMessage";
import {httpDelete, httpGet, httpPost, httpPut} from "../Controller/HttpServerController";

var net = require("net");
var port = 8080;

var server = net.createServer((socketConnection) => {
    socketConnection.setEncoding('ascii');
    socketConnection.on("data", (message) => readHttpRequestMessage(socketConnection, message.toString("ascii")));
});

server.listen(port, () => {
    console.log("server listening on port " + port);
});

function readHttpRequestMessage(socketConnection, message) {
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
        var header = requestInfo[i].split(":");
        headers[header[0]] = header[1].trim();
    }

    const httpMessage = new HttpMessage(httpMethod, requestTarget, httpVersion, headers, body);

    switch (httpMethod) {
        case "GET":
            httpGet(httpMessage);
            break;

        case "POST":
            httpPost(httpMessage);
            break;

        case "DELETE":
            httpDelete(httpMessage);
            break;

        case "PUT":
            httpPut(httpMessage);
            break;

        default:
            throw new UnsupportedMethodError("HTTP Method not allowed");
    }
}