var net = require("net");
var port = 8080;

var server = net.createServer((socketConnection) => {
    socketConnection.write("Hello World! Echo server connected to a client\r\n");
    socketConnection.on("end", () => {
        console.log("Client disconnected, shutting down server");
        server.close();
    });
    socketConnection.pipe(socketConnection); //pipe (echo) everything received on the socket back to the client
});

server.listen(port, () => {
    console.log("server listening on port " + port);
});