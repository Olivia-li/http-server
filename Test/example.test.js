const assert = require('assert');
const {HttpRequestMessage} = require("../Models/HttpRequestMessage");
const {httpGet} = require("../Controller/HttpServerController.js");

describe('Simple Math Test', () => {
  it('should return 2', () => {
         assert.strictEqual(1 + 1, 2);
     });
  it('should return 9', () => {
         assert.strictEqual(3 * 3, 9);
     });
 });

 describe('Simple http tests', () => {
    describe('GET', () => {
        it('should return HTTP/1.1 200 OK', () => {
        assert.strictEqual("HTTP/1.1 200 OK", httpGet(new HttpRequestMessage('','http://test.com','',{},'')));
        });
    });
 });
