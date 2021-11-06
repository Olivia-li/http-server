// HTTP 4XX Errors

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.errorCode = 400;
    }
}

class UnauthorizedRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedRequestError";
        this.errorCode = 401;
    }
}

class ForbiddenRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedRequestError";
        this.errorCode = 403;
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


module.exports = {BadRequestError, UnsupportedMethodError, UnsupportedContentTypeError, UnauthorizedRequestError, ForbiddenRequestError};
