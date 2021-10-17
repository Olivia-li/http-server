class UnsupportedMethodError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnsupportedMethodError";
        this.errorCode = 405;
    }
}