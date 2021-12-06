const {parseBody} = require( "./HttpBodyParserController");
const {HttpRequestMessage} = require( "../Models/HttpRequestMessage");
const {HttpResponseMessage} = require( "../Models/HttpResponseMessage");
const {URLParse, URLPath} = require( "../Services/URLParserService");
const {CONTENT_TYPE_HEADER, CONTENT_LENGTH_HEADER, CONNECTION_HEADER, TRANSFER_ENCODING, CONTENT_DISPOSITION,
    CONTENT_ENCODING, ACCEPT_ENCODING
} = require("../Constants/HttpHeaders");
const {NotFoundError, ForbiddenRequestError, RequestURITooLongError, UnsupportedContentTypeError} = require("../Models/Errors/HttpClientErrors");
const {InternalServerError} = require("../Models/Errors/HttpServerErrors");

const fs = require("fs");
const path = require("path");
const net = require("net");
const zlib = require("zlib");
const stream = require("stream");
const http = require('http');
const {HttpResponseMessageNoBody} = require("../Models/HttpResponseMessageNoBody");

/**
 * GET
 * Retrieve the requested resource.
 * @param {HttpRequestMessage} httpMessage
 * @param {net.Socket} socketConnection
 * @returns 
 */
function httpGet(httpMessage, socketConnection) {

    if (httpMessage.requestTarget.length > 2048) {
        throw new RequestURITooLongError('Request-URI Too Long');
    }

    if (httpMessage.requestTarget.includes('..')) {
        throw new ForbiddenRequestError('Forbidden request target');
    }

    const filepath = path.resolve(__dirname, "../ServerFiles", decodeURIComponent(httpMessage.requestTarget.replace("/", "")));

    let fileStats;
    try {
        fileStats = fs.lstatSync(filepath);
    } catch (e) {
        if(e.code === 'ENOENT'){
            throw new NotFoundError('Request target not found');
        } else if(e.code === 'ENAMETOOLONG'){
            throw new RequestURITooLongError('Request-URI Too Long');
        } else if (e.code === 'EACCES') {
            throw new ForbiddenRequestError('Forbidden request target');
        } else {
            throw new InternalServerError('Internal Server Error');
        }
    }

    if (fileStats.isDirectory()) {
        const httpResponse = createDirHTMLPage(filepath, httpMessage.requestTarget, httpMessage.httpVersion, false);
        socketConnection.write(httpResponse.toString());
    } else if (fileStats.isFile()) {
        if (filepath.includes('.html')) {
            socketConnection.write(createHttpResponseFromHtmlFile(filepath, httpMessage.httpVersion).toString());
        }
        // else {
        //     //TODO: This does not work
        //     createHttpResponseFromFile(filepath, httpMessage.httpVersion, socketConnection);
        // }
    } else {
        throw new UnsupportedContentTypeError('Requested Content Type Not Supported');
    }

}

/**
 * POST
 * Add given resource to target.
 * @param {HttpRequestMessage} httpMessage
 * @returns 
 */
function httpPost(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return "HTTP/1.1 200 OK";
}

/**
 * DELETE
 * Remove requested resource.
 * @param {HttpRequestMessage} httpMessage
 * @returns 
 */
function httpDelete(httpMessage) {
    const url = URLParse(httpMessage.requestTarget);
    const path = URLPath(url);
    // remove target from server

    // on bad request, return 4XX error

    // on server failure, return 5XX error

    // on success, return 200 Ok with resource in body

    return "HTTP/1.1 200 OK";
}

/**
 * PUT
 * Replace target resource with given resource.
 * @param {HttpRequestMessage} httpMessage
 * @returns 
 */
function httpPut(httpMessage) {
    const parsedBody = parseBody(httpMessage);
    return "HTTP/1.1 200 OK";
}

// Helpers
function createPlainTextHttpResponseMessage(httpMessage) {
    const body = `GET request received on path: ${httpMessage.requestTarget}`;
    const headers = {};
    headers[CONTENT_TYPE_HEADER] = "text/plain";
    headers[CONTENT_LENGTH_HEADER] = `${body.length}`;
    headers[CONNECTION_HEADER] = "close";
    const status = "200 OK";

    return new HttpResponseMessage(httpMessage.httpVersion, status, headers, body);
}

function createDirHTMLPage(filepath, requestTarget, httpVersion, showAllFiles) {
    var directoryElementsAsHTML = '';

    const fileNames = fs.readdirSync(filepath);
    fileNames.forEach(file => {
        if (showAllFiles || file.includes('.html') || !file.includes('.')) {
            directoryElementsAsHTML += `<li><a href="${(requestTarget + '/' + encodeURIComponent(file)).replace('//', '/')}">${file}</a></li>\n`;
        }
    })
    directoryElementsAsHTML = directoryElementsAsHTML.slice(0, -1);
    var responseBody = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Directory: ${filepath}</title>
            </head>
            <body>
                <p>Directory Elements:</p>
                <ul>
                    ${directoryElementsAsHTML}
                </ul>
            </body>
        </html> 
    `;

    const headers = {};
    headers[CONTENT_TYPE_HEADER] = "text/html";
    headers[CONTENT_LENGTH_HEADER] = `${responseBody.length}`;
    headers[CONNECTION_HEADER] = "close";
    const status = "200 OK";

    return new HttpResponseMessage(httpVersion, status, headers, responseBody);
}

function createHttpResponseFromFile(filepath, httpVersion, socketConnection) {
    const filename = path.basename(filepath);

    // TODO: Attempt 1 - Chunked and Compressed Streamed File Transfer
    const headers = {};
    headers[CONTENT_TYPE_HEADER] = "application/octet-stream";
    headers[TRANSFER_ENCODING] = 'chunked';
    headers[CONTENT_ENCODING] = 'gzip';
    headers[CONTENT_DISPOSITION] = `attachment; filename="${filename}"`;
    headers[CONNECTION_HEADER] = "keep-alive";
    const status = "200 OK";
    const httpResponse = new HttpResponseMessage(httpVersion, status, headers, '');
    socketConnection.write(httpResponse.toString());

    const fileReadStream = fs.createReadStream(filepath, {highWaterMark: 50});
    const gzipFile = zlib.createGzip();
    fileReadStream.pipe(gzipFile);
    stream.pipeline(fileReadStream, zlib.createGzip(), err => {console.log(err);});
    gzipFile.on('data', function (chunk) {
            socketConnection.setEncoding('hex');
            socketConnection.write(`${chunk.length.toString(16)}\r\n`);
            socketConnection.write(`${chunk}\r\n`);
            // TODO: This makes the browser throw an error for some reason - "Error: Parse Error: Invalid character in chunk size"
    });

    gzipFile.on('end', function () {
        socketConnection.setEncoding('hex');
        socketConnection.write('0\r\n');
        socketConnection.write('\r\n');
        gzipFile.close();
        socketConnection.setEncoding('utf-8');
    });


    // TODO: Attempt 2 - File Transfer in one go
    // let fileBuffer = fs.readFileSync(filepath);
    //
    // let fileHex = '';
    // for (let i = 0; i < fileBuffer.length; i++) {
    //     let data = fileBuffer[i].toString(16); //toString(16) converts number to hex
    //
    //     if (data.length === 1) {
    //         data = '0' + data;
    //     }
    //
    //     if (i%16 === 0 && i !== 0) {
    //         fileHex += `\n${data}`;
    //     } else if (i%2 === 0 && i !== 0) {
    //         fileHex += ` ${data}`;
    //     } else {
    //         fileHex += data;
    //     }
    // }
    //
    // const headers = {};
    // headers[CONTENT_TYPE_HEADER] = "application/octet-stream; charset=utf-8";
    // headers[CONTENT_LENGTH_HEADER] = fileHex.length;
    // headers[CONTENT_DISPOSITION] = `attachment; filename="${filename}"`;
    // headers[CONNECTION_HEADER] = "close";
    // const status = "200 OK";
    // const httpResponse = new HttpResponseMessage(httpVersion, status, headers, fileHex);
    // socketConnection.write(httpResponse.toString());
}

function createHttpResponseFromHtmlFile(filepath, httpVersion) {

    const responseBody = fs.readFileSync(filepath);

    const headers = {};
    headers[CONTENT_TYPE_HEADER] = "text/html";
    headers[CONTENT_LENGTH_HEADER] = `${responseBody.length}`;
    headers[CONNECTION_HEADER] = "close";
    const status = "200 OK";

    return new HttpResponseMessage(httpVersion, status, headers, responseBody);
}

module.exports = {httpGet, httpPost, httpDelete, httpPut};
