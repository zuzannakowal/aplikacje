require("colors");
function kolorki(req, res){
    console.log(req.url)
    let letter = req['url'].toLowerCase()
    let color = 'unknown'
    if (letter == "/a"){
        color = "yellow"
    } else if (letter == "/b"){
        color = "red"
    } else if (letter == "/c"){
        color = "blue"
    }
    res.end(`<h1 style="color:${color};">kolorowe</h1>`)
};

const { disable } = require("colors");
var http = require("http");
var server = http.createServer(kolorki)

server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
});