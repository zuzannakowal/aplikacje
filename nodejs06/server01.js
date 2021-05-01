var http = require("http");
var qs = require("querystring");
var fs = require("fs");

var autka = require("./dane.json")

console.log(autka)

function servResponse(req,res){
    var allData = "";
    // kiedy przychodzą dane POSTEM, w postaci pakietów,
    // łącza się po kolei do jednej zmiennej "allData"
    // w poniższym zdarzeniu req.on nic nie modyfikujemy!

    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })
    // kiedy przyjdą już wszystkie dane
    // parsujemy je do obiektu "finish"
    // i odsyłamy do przeglądarki

    req.on("end", function (data) {
      console.log(allData)
        var finish = JSON.parse(allData)
        console.log("odsyłam: ", finish)
        setTimeout(function(){
          res.end(JSON.stringify(finish));
        }, 5000)
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
                case "/api":
                    res.writeHead(200, {'content-type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(autka))
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
