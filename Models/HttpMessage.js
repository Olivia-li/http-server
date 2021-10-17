export class HttpMessage {


    constructor(httpMethod, requestTarget, httpVersion, headers, body) {
        this.httpMethod = httpMethod;
        this.requestTarget = requestTarget;
        this.httpVersion = httpVersion;
        this.headers = headers;
        this.body = body;
    }

}