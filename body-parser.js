var formidable = require('formidable'),

const SUPPORTED_CONTENT_TYPES = ["application/json", "text/plain", "multipart/form-data"];

function parseBody(contentType, body) {
  if (!SUPPORTED_CONTENT_TYPES.includes(contentType.toLowercase())) {
    console.error("Content type not supported");
    return;
  }
  switch (contentType.toLowerCase()) {
    case "application/json":
      jsonParser(body);
      break;
    case "text/plain":
      plainTextParser(body);
      break;
    case "multipart/form-data":
      multiPartFormParser(body);
      break;
  }
}

function jsonParser(body) {
  try {
    const json = JSON.parse(body);
    return json;
  } catch {
    console.error("Improper Format");
  }
}

function multiPartFormParser(request) {
  // Formidable requires the entire request to parse multipart form data. 
  // TODO: Will need to figure out the structure of a request object.
  let form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    if (err) {
      console.error(err.message);
      return;
    }
    return {fields: fields, files: files}
  });
}

function plainTextParser(body) {
  return body;
}
