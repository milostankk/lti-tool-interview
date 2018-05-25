const express = require('express');
const app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'))
});

app.post('/', function (request, response) {
    fs.readFile(path.join(__dirname + '/index.html'), 'utf8', function read(err, data) {
        if(err) {
            console.log(err);
        }
        data = data.replace('<p id="user"></p>', '<p id="first">' + request.body.custom_user_id + '</p>');
        data = data.replace('<p id="course"></p>', '<p id="course">' + request.body.custom_canvas_courseid + '</p>');
        data = data.replace('<p id="title"></p>', '<p id="title">' + request.body.context_title + '</p>');


        response.send(data);
        console.log(data);
    });
});
const https = require('https');
const options = {
    key: fs.readFileSync(path.join(__dirname, '/myapp/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/myapp/server.crt')),
    requestCert: false,
    rejectUnauthorized: false
};
const server = https.createServer(options, app);
server.listen(1024);
console.log('Https server listening: 443');

app.listen(3000, console.log('Example app listening on port 3000!'));

