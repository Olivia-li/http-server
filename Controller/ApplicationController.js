let { httpGet, httpPost, httpDelete, httpPut } = require("./HttpServerController.js")

function getResponse(request) {
  switch (request.method) {
    case "GET":
      return httpGet(request);
    case "POST":
      return httpPost(request);
    case "DELETE":
      return httpDelete(request);
    case "PUT":
      return httpPut(request);
  }
}

module.exports = { getResponse };