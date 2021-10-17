import {multiPartFormParser} from "../Services/MultiPartFormDataParserService";
import {jsonParser} from "../Services/JSONParserService";
import {plainTextParser} from "../Services/PlainTextParserService";
import {CONTENT_TYPE_HEADER} from "../Constants/HttpHeaders";

const SUPPORTED_CONTENT_TYPES = ["application/json", "text/plain", "multipart/form-data"];


export function parseBody(httpRequest) {
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