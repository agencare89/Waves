var express = require("express"); 
var http = require("http");
var https = require("https");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express(); 
var port = process.env.PORT || 8080;

// Serve up the /public folder to the site
app.use(express.static(__dirname + '/public'));
app.use("/semantic", express.static(__dirname + '/semantic'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Set the views engine as html to render html files
app.set("views", __dirname + "/views"); 
app.engine("html", require("ejs").renderFile);
app.set('view engine', 'html'); 

// Require the necessary routes 
var index = require("./routes/index");

// Use the routes to render views
app.use("/" , index);

var httpServer = http.createServer(app).listen(port);
console.log("Magic happens on port " + port); 