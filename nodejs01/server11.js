var fs = require("fs");

var http = require("http");
var server = http.createServer(function(req, res){
    if (req.url == "/index2.html") {
        fs.readFile("static/index2.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    }
    else if (req.url == "/second.html") {
        fs.readFile("static/second.html", function (error, data) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
            res.end();
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 - brak takiej strony</h1>");
        res.end();
    }
})

server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
});