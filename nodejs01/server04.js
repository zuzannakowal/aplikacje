/*
var http = require("http");
var browser = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1: return "MS Edge (EdgeHtml)";
        case agent.indexOf("edg") > -1: return "MS Edge Chromium";
        case agent.indexOf("opr") > -1 && !!opr: return "opera";
        case agent.indexOf("chrome") > -1 && !!chrome: return "chrome";
        case agent.indexOf("trident") > -1: return "Internet Explorer";
        case agent.indexOf("firefox") > -1: return "firefox";
        case agent.indexOf("safari") > -1: return "safari";
        default: return "other";
    }
})(userAgent.toLowerCase());
document.body.innerHTML =  "This is " + browser + " browser." + "<br><br>" + userAgent.toLowerCase();
*/

function browserType(agent){
    const ag = agent.toLowerCase()
    console.log("agent: ", ag)
    let browser = 'unknown'
    if (ag.indexOf("edge") > -1){
        browser = "MS Edge (EdgeHtml)"
    } else if (ag.indexOf("edg") > -1){
        browser = "MS Edge Chromium"
    } else if (ag.indexOf("opr") > -1){
        browser = "opera"
    } else if (ag.indexOf("chrome") > -1){
        browser = "chrome"
    } else if (ag.indexOf("trident") > -1){
        browser = "internet explorer"
    } else if (ag.indexOf("firefox") > -1){
        browser = "firefox"
    } else if (ag.indexOf("safari") > -1){
        browser = "safari"
    } else {
        browser = "inna"
    }
    return browser;
}

var http = require("http");
var server = http.createServer(function(req,res){        
        console.log("nagłowki żądania:")
        console.log(req['url'])        
        console.log(req.headers['user-agent'])
        //console.log(JSON.stringify(req.rawHeaders, null,5))
        //console.log(JSON.stringify(req.headers, null,5))
        //console.log(JSON.stringify(req.user-agent, null, 5))
        //res.writeHead(200,{"content-type":"application/json;charset=utf-8"})

        let browserAgent = browserType(req.headers['user-agent'])
        res.end("<h1>typ: "+ browserAgent + "</h1>")
})

server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});