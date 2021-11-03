const net = require("net");
const port = 8080;
const {getResponse} = require("./Controller/ApplicationController.js")

let server = net.createServer((socketConnection) => {
    socketConnection.write("Hello World! Echo server connected to a client\r\n");

    socketConnection.on('data',data=>{
        const [firstLine, ...otherLines] = data.toString().split('\n');
        const [method, pathParams, httpVersion] = firstLine.trim().split(' ');
        path = pathParams.split('?')[0];
        const params = JSON.parse('{"' + decodeURI(pathParams.split('?')[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        const headers = Object.fromEntries(otherLines.filter(_=>_)
            .map(line=>line.split(':').map(part=>part.trim()))
            .map(([name, ...rest]) => [name, rest.join(' ')]));
        let body;
            try {
                body = JSON.parse(bodyContent);
            } catch(err){/* ignore */}
        const request = {
            method,
            path,
            params,
            httpVersion,
            headers,
            body
        }
        // getResponse(request)
        console.log(request);
    })
    socketConnection.on("end", () => {
        console.log("Client disconnected, shutting down server");
        server.close();
    });
    socketConnection.pipe(socketConnection); //pipe (echo) everything received on the socket back to the client
});

server.listen(port, () => {
    console.log("server listening on port " + port);
});