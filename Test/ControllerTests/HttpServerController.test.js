const assert = require('assert');
const {HttpRequestMessage} = require('../../Models/HttpRequestMessage');
const {httpGet} = require('../../Controller/HttpServerController.js');

let request = new HttpRequestMessage('GET', '/one/two/three', 'HTTP/1.1', {}, '');
let response =  'HTTP/1.1 200 OK\n'+
                'Content-Type: text/plain\n'+
                'Content-Length: 44\n'+
                'Connection: close\n\n'+
                'GET request received on path: /one/two/three'

describe('HTTP controller tests', () => {
    describe('GET', () => {
        it('should return an HTTP GET response', () => {
            assert.strictEqual(httpGet(request), response);
        });
    })
});