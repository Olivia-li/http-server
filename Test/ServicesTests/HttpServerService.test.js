const assert = require('assert');
const {readHttpRequestMessage} = require('../../Services/HttpServerService');
const {BadRequestError, UnsupportedMethodError} = require('../../Models/Errors/HttpClientErrors');

describe("readHttpRequestMessage", function() {
    it('should BadRequestError on empty message', function () {
        assert.throws(() => {readHttpRequestMessage(null, '')}, BadRequestError);
    });

    it('should BadRequestError on malformed start line', function () {
        assert.throws(() => {readHttpRequestMessage(null, 'GET / HTTP/1.1 ERROR')}, BadRequestError);
    });

    it('should UnsupportedMethodError on unsupported method', function () {
        assert.throws(() => {readHttpRequestMessage(null, 'NOT-GET / HTTP/1.1')}, UnsupportedMethodError);
    });

    it('should return 200 OK on success', function () {
        assert.strictEqual(readHttpRequestMessage(null, 'GET / HTTP/1.1'), "HTTP/1.1 200 OK");
    });
});