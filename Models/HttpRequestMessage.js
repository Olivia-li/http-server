/** Model for parsing HTTP requests */
class HttpRequestMessage {
    /**
     * Define the parts of the HTTP request.
     * @param {String} method 
     * @param {String} requestTarget
     * @param {String} httpVersion 
     * @param {{}} headers
     * @param {String} body
     */
    constructor(method, requestTarget, httpVersion, headers, body) {
        this.method = method;
        this.requestTarget = requestTarget;
        this.httpVersion = httpVersion;
        this.headers = headers;
        this.body = body;
    }

}

module.exports = {HttpRequestMessage};
