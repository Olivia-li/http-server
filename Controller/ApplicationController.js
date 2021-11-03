let { httpGet, httpPost, httpDelete, httpPut } = require("./HttpServerController.js")

function getResponse(request) {
  switch (request.method) {
    case "GET":
      httpGet(request);
      break;
    case "POST":
      httpPost(request);
      break;
    case "DELETE":
      httpDelete(request);
      break;
    case "PUT":
      httpPut(request);
      break;
  }
}

module.exports = { getResponse };