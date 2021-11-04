const assert = require('assert');
const {readHttpRequestMessage} = require('../../Services/HttpServerService');
const {BadRequestError, UnsupportedMethodError} = require('../../Models/Errors/HttpClientErrors');
const {SocketMock} = require('../Mocks/SocketMock');

describe("readHttpRequestMessage", function() {
    it('should throw BadRequestError on empty message', function () {
        assert.throws(() => {readHttpRequestMessage(null, '')}, BadRequestError);
    });

    it('should throw BadRequestError on malformed start line', function () {
        assert.throws(() => {readHttpRequestMessage(null, 'GET / HTTP/1.1 ERROR')}, BadRequestError);
    });

    it('should throw UnsupportedMethodError on unsupported method', function () {
        assert.throws(() => {readHttpRequestMessage(null, 'NOT-GET / HTTP/1.1')}, UnsupportedMethodError);
    });

    it('should write to socket and return nothing on success', function () {
        const socketMock = new SocketMock();
        assert.strictEqual(socketMock.written, false);
        assert.strictEqual(readHttpRequestMessage(socketMock,'GET / HTTP/1.1'), undefined);
        assert.strictEqual(socketMock.written, true);
    });

    it('should remove newline chars, write to socket, and success', function () {
        const socketMock = new SocketMock();
        assert.strictEqual(socketMock.written, false);
        assert.strictEqual(readHttpRequestMessage(socketMock,'GET / HTTP/1.1\nContent-Type: text/plain'), undefined);
        assert.strictEqual(socketMock.written, true);
    });

    it('should remove CRLF char, write to socket, and success', function () {
        const socketMock = new SocketMock();
        assert.strictEqual(socketMock.written, false);
        assert.strictEqual(readHttpRequestMessage(socketMock,'GET / HTTP/1.1\r\nContent-Type: text/plain'), undefined);
        assert.strictEqual(socketMock.written, true);
    });
});