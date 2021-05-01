require("colors");
function kolorki(req, res){
    console.log(req.url)
    if (req.url == "/A"){
        console.log("kolorowe".rainbow)
    } else if (req.url == "/B"){
        console.log("kolorowe".red)
    } else if (req.url == "/C"){
        console.log("kolorowe".brightMagenta)
    } else {
        console.log("nie kolorowe")
    }
}

var http = require("http");
var server = http.createServer(kolorki)

server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
});