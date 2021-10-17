import {HttpMessage} from "../Models/HttpMessage";

var net = require("net");
var port = 8080;

var server = net.createServer((socketConnection) => {
    socketConnection.setEncoding('ascii');
    socketConnection.on("end", () => {
        console.log("Client disconnected, shutting down server");
        server.close();
    });
    socketConnection.on("data", (message) => readHttpRequestMessage(socketConnection, message.toString("ascii")));
});

server.listen(port, () => {
    console.log("server listening on port " + port);
});

function readHttpRequestMessage(socketConnection, message) {
    message = message.split(/\n\n(.+)/);
    if (message.length > 2 || message.length < 1) {
        //TODO return error code 400 Bad Request
        throw new BadRequestError("Malformed HTTP Request");
    }
    const requestInfo = message[0].split("\n");
    const body = message[1];

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
        headers[header[0]] = header[1].trim(); //TODO: check if trim returns string, or if it mutates variable containing string
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