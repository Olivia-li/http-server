// HTTP 5XX Errors

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.errorCode = 500;
    }
}

module.exports = {InternalServerError};