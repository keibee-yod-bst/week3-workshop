var express = require('express');
var formidable = require('formidable');
var app = express();
app.get('/', function (req, res) { // endpoint for root level of the site with a GET request
        res.sendFile(__dirname + 'www/index.html');
});
app.post('/', function (req, res) { // endpoint for root level of the site with a POST request
        var form = new formidable.IncomingForm();
        form.parse(req);
        form.on('fileBegin', function (name, file) { //when a fileBegin event is triggered use callback
                file.path = __dirname + '/uploads/' + file.name; // need to create directory "/uploads"
        });
        form.on('file', function (name, file) { // when a file has been received
                console.log('Uploaded ' + file.name);
        });
        res.sendFile(__dirname + 'www/index.html'); // send back the same file (index.html) so that another upload can happen.
});
app.listen(3000);