var http = require("http");
var qs = require("querystring");
var fs = require("fs");
//const { runInNewContext } = require("node:vm");


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
        var finish = qs.parse(allData)
        console.log(finish)
        var sum = parseInt(finish.txt1, 10) + parseInt(finish.txt2, 10)
        console.log(sum)
        var multiplication = parseInt(finish.txt1, 10) * parseInt(finish.txt2, 10)
        finish['suma'] = sum;
        finish['iloczyn'] = multiplication
        console.log("odsyłam: ", finish)
        res.end(JSON.stringify(finish));
    })
}

function suwakResponse(req,res){
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
        console.log(finish)
        var retval = {}
        retval['val'] = 10 - parseFloat(finish.val)
        console.log("odsyłam: ", retval)
        res.end(JSON.stringify(retval));
    })
}

function squareResponse(req,res){
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
        console.log(finish)
        var retval = finish
        console.log("odsyłam: ", retval)
        res.end(JSON.stringify(retval));
    })
}

function moveResponse(req,res){
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
        console.log(finish)
        var retval = finish
        console.log("odsyłam: ", retval)
        res.end(JSON.stringify(retval));
    })
}

function rectResponse(req,res){
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
        console.log(finish)
        var retval = finish
        console.log("odsyłam: ", retval)
        res.end(JSON.stringify(retval));
    })
}

var server = http.createServer(function(req,res){
    console.log(req.method, req.url) // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST

    switch (req.method) {
        case "GET":
            switch (req.url){
                case "/":
                    // tu wykonaj załadowanie statycznej strony z formularzem
                    fs.readFile("static/index3.html", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/suwak":
                    fs.readFile("static/index4.html", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/squares":
                    fs.readFile("static/index5.html", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/style.css":
                    console.log("style")
                    fs.readFile("static/style.css", function(error, data){
                        console.log("style2")
                        res.writeHead(200, { 'Content-Type' : 'text/css'})
                        res.write(data)
                        res.end()
                    })
                    break;
                case "/moves":
                    fs.readFile("static/index6.html", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    })
                    break;
                case "/rect":
                    fs.readFile("static/index7.html", function(error, data){
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                        res.write(data);
                        res.end();
                    })
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
                case "/obliczenia":
                    servResponse(req,res)
                    break;
                case "/suwaki":
                    suwakResponse(req,res)
                    break;
                case "/square":
                    squareResponse(req, res)
                    break;
                case "/move":
                    moveResponse(req, res)
                    break;
                case "/rectangle":
                    rectResponse(req, res)
                    break;
                default:
                    res.writeHead(404)
                    res.write("to nie istnieje")
                    res.end()
            }
            break;
            
    }
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});
