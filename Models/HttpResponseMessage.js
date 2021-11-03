/** Model for parsing HTTP response */
class HttpResponseMessage {
    /**
     * Define the parts of the HTTP response.
     * @param {String} httpVersion
     * @param {String} status
     * @param {{}} headers
     * @param {*} body
     */
    constructor(httpVersion, status, headers, body) {
        this.httpVersion = httpVersion;
        this.status = status;
        this.headers = headers;
        this.body = body;
    }

    toString() {
        var response = `${this.httpVersion} ${this.status}\n`;
        for (let header in this.headers) {
            response += `${header}: ${this.headers[header]}\n`;
        }
        response += `\n${this.body}`;
        return response;
    }
}

module.exports = {HttpResponseMessage};
