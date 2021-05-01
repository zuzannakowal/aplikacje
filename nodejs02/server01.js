var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var server = http.createServer(function(req,res){
    console.log(req.method) // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST

    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            fs.readFile("static/index1.html", function(error, data){
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.write(data);
                res.end();
            })
            break;
        case "POST":
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
                var finish = qs.parse(allData)
                console.log(finish.bt1)
                res.end("odsyłam do przeglądarki" + JSON.stringify(finish));
            })
            break;
    }
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});
