const assert = require('assert');
const {HttpRequestMessage} = require('../../Models/HttpRequestMessage');
const {httpGet} = require('../../Controller/HttpServerController.js');
const {UnauthorizedRequestError, ForbiddenRequestError} = require('../../Models/Errors/HttpClientErrors');

let request = new HttpRequestMessage('GET', '/one/two/three', 'HTTP/1.1', {}, '');
let response =  'HTTP/1.1 200 OK\n'+
                'Content-Type: text/plain\n'+
                'Content-Length: 44\n'+
                'Connection: close\n\n'+
                'GET request received on path: /one/two/three'
let unauthorized = new HttpRequestMessage('GET', 'unauthorized', 'HTTP/1.1', {}, '');
let forbidden = new HttpRequestMessage('GET', 'forbidden', 'HTTP/1.1', {}, '');

describe('HTTP controller tests', () => {
    describe('GET', () => {
        it('should return an HTTP GET response on successful request', () => {
            assert.strictEqual(httpGet(request), response);
        });
        it('should throw UnauthorizedRequestError on unauthorized request', () => {
            assert.throws(() => httpGet(unauthorized), UnauthorizedRequestError);
        });
        it('should throw ForbiddenRequestError on forbidden request', () => {
            assert.throws(() => httpGet(forbidden), ForbiddenRequestError);
        });
    });
});
