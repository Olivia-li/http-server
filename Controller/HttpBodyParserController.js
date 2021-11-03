const {multiPartFormParser} = require("../Services/MultiPartFormDataParserService");
const {jsonParser} = require("../Services/JSONParserService");
const {plainTextParser} = require("../Services/PlainTextParserService");
const {CONTENT_TYPE_HEADER} = require("../Constants/HttpHeaders");

const SUPPORTED_CONTENT_TYPES = ["application/json", "text/plain", "multipart/form-data"];

function parseBody(httpRequest) {
    if (!(CONTENT_TYPE_HEADER in httpRequest.headers)) {
        throw new UnsupportedContentTypeError("Missing Content-Type Header");
    }
    const contentType = httpRequest.headers[CONTENT_TYPE_HEADER];

    if (!SUPPORTED_CONTENT_TYPES.includes(contentType.toLowerCase())) {
        throw new UnsupportedContentTypeError("Content Type not supported");
    }
    switch (contentType.toLowerCase()) {
        case "application/json":
            return jsonParser(httpRequest.body);
        case "text/plain":
            return plainTextParser(httpRequest.body);
        case "multipart/form-data":
            return multiPartFormParser(httpRequest.body);
    }
}

module.exports = {parseBody};
