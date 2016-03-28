var express = require("express");
var app = express();
var opn = require("opn");
var ip = require("ip");
var argv = require("yargs").argv;

app.use(express.static(__dirname + '/'));

app.get("/", function (req, res){
	res.send("hello word");
})


var port = argv.p || 8000;
var url = "http://" + ip.address() + ":" + port;
app.listen(port);
opn(url);

// app.js 暂且废除，因为用了  browser-sync 