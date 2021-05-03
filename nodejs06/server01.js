var http = require("http");
var qs = require("querystring");
var fs = require("fs");
const formidable = require('formidable');

var autka = require("./dane.json")

console.log(autka)

function servResponse(req,res){
        let form = formidable({})
        form.uploadDir = "static/upload/"
        form.parse(req, function(err, fields, files){
        console.log(err)
        console.log(files.file.name)
          res.writeHead(200, {'content-type': 'application/json'})
          res.end(JSON.stringify({
            title: "file uploaded",
            name: files.file.name,
            date: files.file.lastModifiedDate}));
        })
}

var server = http.createServer(function(req,res){
    console.log(req.method, req.url) // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST

    switch (req.method) {
        case "GET":
            switch (req.url){
                case "/":
                    // tu wykonaj załadowanie statycznej strony z formularzem
                    fs.readFile("static/index.html", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/default":
                    fs.readFile("static/pieski.jpeg", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/pieskia":
                    fs.readFile("static/kicia.jpeg", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/api":
                    res.writeHead(200, {'content-type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(autka))
                    break;
                case "/all":
                    res.writeHead(200, {'content-type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(autka))
                    break;
                case "/first":
                    res.writeHead(200, {'content-type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify([autka[0]]))
                    break;
                case "/honda":
                    res.writeHead(200, {'content-type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify([autka[0], autka[1]]))
                    break;
                default:
                    res.writeHead(404);
                    console.log("nie ma takiej stony")
                    res.write("nie ma takiej strony")
                    res.end()
            }
            break;
        case "POST":
            switch(req.url){
                case "/api":
                    servResponse(req,res)
                    break;
                default:
                    res.writeHead(404)
                    res.write("to nie istnieje")
                    res.end()
                    console.log("404")
            }
            break;

    }
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});
