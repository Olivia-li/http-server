/** Model for parsing HTTP response */
class HttpResponseMessageNoBody {
    /**
     * Define the parts of the HTTP response.
     * @param {String} httpVersion
     * @param {String} status
     * @param {{}} headers
     */
    constructor(httpVersion, status, headers) {
        this.httpVersion = httpVersion;
        this.status = status;
        this.headers = headers;
    }

    toString() {
        var response = `${this.httpVersion} ${this.status}\n`;
        for (let header in this.headers) {
            response += `${header}: ${this.headers[header]}\n`;
        }
        return response;
    }
}

module.exports = {HttpResponseMessageNoBody};
