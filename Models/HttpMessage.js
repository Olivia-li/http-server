/** Model for parsing HTTP requests */
class HttpMessage {
    /**
     * Define the parts of the HTTP request.
     * @param {String} httpMethod 
     * @param {String} requestTarget 
     * @param {String} httpVersion 
     * @param {*[]} headers 
     * @param {*} body 
     */
    constructor(httpMethod, requestTarget, httpVersion, headers, body) {
        this.httpMethod = httpMethod;
        this.requestTarget = requestTarget;
        this.httpVersion = httpVersion;
        this.headers = headers;
        this.body = body;
    }

}

module.exports = {HttpMessage};
