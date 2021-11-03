/** Model for parsing HTTP requests */
class HttpMessage {
    /**
     * Define the parts of the HTTP request.
     * @param {String} method 
     * @param {String} path 
     * @param {String} params 
     * @param {String} httpVersion 
     * @param {*[]} headers 
     * @param {*} body 
     */
    constructor(method, path, params, httpVersion, headers, body) {
        this.method = method;
        this.path = path;
        this.params = params;
        this.httpVersion = httpVersion;
        this.headers = headers;
        this.body = body;
    }

}

module.exports = {HttpMessage};
