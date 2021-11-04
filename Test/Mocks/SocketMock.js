class SocketMock {
    constructor() {
        this.written = false;
    }
    write(){
        this.written = true;
    }
}

module.exports = {SocketMock};