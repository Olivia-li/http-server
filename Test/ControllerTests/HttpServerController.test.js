const assert = require('assert');
const {HttpRequestMessage} = require('../../Models/HttpRequestMessage');
const {httpGet} = require('../../Controller/HttpServerController.js');
const {RequestURITooLongError, ForbiddenRequestError, NotFoundError} = require('../../Models/Errors/HttpClientErrors');
const {SocketMock} = require('../Mocks/SocketMock');

let long = new HttpRequestMessage('GET', '/'+'1'.repeat(2048), 'HTTP/1.1', {}, '');
let forbidden = new HttpRequestMessage('GET', '..', 'HTTP/1.1', {}, '');
let fake = new HttpRequestMessage('GET', 'path', 'HTTP/1.1', {}, '');
let root = new HttpRequestMessage('GET', '/', {}, '');
let folder = new HttpRequestMessage('GET', '/New%20folder', {}, '');
let file = new HttpRequestMessage('GET', '/New%20folder/sample.html', {}, '');

describe('HTTP controller tests', () => {
    describe('httpGET', () => {
        it('should throw RequestURITooLongError on path longer than 2048 characters', () => {
            let socket = new SocketMock();
            assert.throws(() => httpGet(long, socket), RequestURITooLongError);
            
        });
        it('should throw ForbiddenRequestError on parent directory target', () => {
            let socket = new SocketMock();
            assert.throws(() => httpGet(forbidden, socket), ForbiddenRequestError);
            
        });
        it('should throw NotFoundError on target not found', () => {
            let socket = new SocketMock();
            assert.throws(() => httpGet(fake, socket), NotFoundError);
        });
        it('should write root folder to socket and return nothing on success', () => {
            let socket = new SocketMock();
            assert.strictEqual(socket.written, false);
            assert.strictEqual(httpGet(root, socket), undefined);
            assert.strictEqual(socket.written, true);
        });
        it('should write subfolder to socket and return nothing on success', () => {
            let socket = new SocketMock();
            assert.strictEqual(socket.written, false);
            assert.strictEqual(httpGet(folder, socket), undefined);
            assert.strictEqual(socket.written, true);
        });
        it('should write file to socket and return nothing on success', () => {
            let socket = new SocketMock();
            assert.strictEqual(socket.written, false);
            assert.strictEqual(httpGet(file, socket), undefined);
            assert.strictEqual(socket.written, true);
        });     
    });
});
