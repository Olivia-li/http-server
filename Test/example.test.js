const assert = require('assert');
const HttpMessage = require("../Models/HttpMessage");
const {httpGet} = require("../Controller/HttpServerController.js");

describe('Simple Math Test', () => {
  it('should return 2', () => {
         assert.equal(1 + 1, 2);
     });
  it('should return 9', () => {
         assert.equal(3 * 3, 9);
     });
 });

 describe('Simple http tests', () => {
    describe('GET', () => {
        it('should return HTTP/1.1 200 OK', () => {
        assert.equal("HTTP/1.1 200 OK", httpGet(new HttpMessage('','http://test.com','',{},'')));
        });
    });
 });
 