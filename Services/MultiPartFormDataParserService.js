const formidable = require("formidable");

function multiPartFormParser(body) {
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

module.exports = {multiPartFormParser};
