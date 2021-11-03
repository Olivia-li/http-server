var net = require("net");
var port = 8080;

var server = net.createServer((socketConnection) => {
    socketConnection.write("Hello World! Echo server connected to a client\r\n");
    socketConnection.on('data',data=>{
        const [firstLine, ...otherLines] = data.toString().split('\n');
        const [method, path, httpVersion] = firstLine.trim().split(' ');
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
            httpVersion,
            headers,
            body
        }
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