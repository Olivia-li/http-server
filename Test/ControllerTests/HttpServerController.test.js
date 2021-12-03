const assert = require('assert');
const {HttpRequestMessage} = require('../../Models/HttpRequestMessage');
const {httpGet} = require('../../Controller/HttpServerController.js');
const {RequestURITooLongError, ForbiddenRequestError, NotFoundError} = require('../../Models/Errors/HttpClientErrors');
const {SocketMock} = require('../Mocks/SocketMock');

let long = new HttpRequestMessage('GET', '1'.repeat(256), 'HTTP/1.1', {}, '');
let forbidden = new HttpRequestMessage('GET', '..', 'HTTP/1.1', {}, '');
let fake = new HttpRequestMessage('GET', 'path', 'HTTP/1.1', {}, '');
let test = new HttpRequestMessage('GET', '', {}, '');
let socket = new SocketMock();

describe('HTTP controller tests', () => {
    describe('GET', () => {
        it('should throw RequestURITooLongError on target longer than 2048 characters total or with a filename longer than file system limits', () => {
            assert.throws(() => httpGet(long, null), RequestURITooLongError);
        });
        it('should throw ForbiddenRequestError on parent directory target', () => {
            assert.throws(() => httpGet(forbidden, null), ForbiddenRequestError);
        });
        it('should throw NotFoundError on target not found', () => {
            assert.throws(() => httpGet(fake, null), NotFoundError);
        });
        it('should write to socket and return nothing on success', () => {
            assert.strictEqual(httpGet(test, socket), undefined);
        });        
    });
});
