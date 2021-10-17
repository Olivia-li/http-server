// HTTP 4XX Errors

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.errorCode = 400;
    }
}

class UnsupportedMethodError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnsupportedMethodError";
        this.errorCode = 405;
    }
}

class UnsupportedContentTypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnsupportedContentTypeError";
        this.errorCode = 415;
    }
}