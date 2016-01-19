var app = require('app'),
    BrowserWindow = require('browser-window'),
    Menu = require('menu');

global.__root = __dirname;

require('crash-reporter')
    .start();


var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

    console.log('request starting...');

    var filePath = __dirname + request.url;

    if (filePath == __dirname) {
        filePath = __dirname + 'dist/index.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.access(filePath, fs.F_OK, function (err) {

        if (!err) {
            fs.readFile(filePath, function (error, content) {
                if (error) {
                    console.log('...500 [' + filePath + ']');
                    response.writeHead(500);
                    response.end();
                }
                else {
                    console.log('...200 [' + filePath + ']');
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                }
            });
        } else {
            console.log('...404 [' + filePath + ']');
            response.writeHead(404);
            response.end();
        }
    });

}).listen(1308);
console.log('Server running at http://127.0.0.1:1308/');


app.on('ready', function () {

    var icon = __dirname + '/dist/assets/@/img/logo.png';

    app.main = new BrowserWindow({
        title: '...',
        width: 420,
        height: 600,
        center: true,
        icon: icon,
        show: false
    });

    console.log(icon);

    Menu.setApplicationMenu(null);


    app.main.loadUrl('http://127.0.0.1:1308/dist/index.html');
    //console.log(__dirname + '/dist/index.html');

    app.main.show();

    app.main.maximize();

    app.main.on('close', function () {
        app.exit();
    });

});
