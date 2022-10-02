import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const path = require("path")
import * as d3 from "d3";

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(__dirname+'/static'));

app.get('/index', function(req, res){
    res.sendFile(path.resolve(__dirname+"/html-docs/landing.html"));
})

app.get('/',function(req, res) {
    res.sendFile(path.resolve(__dirname+"/html-docs/landing.html"))
})

app.get('/process_get',function(req, res){
    res.sendFile(path.resolve(__dirname+"/html-docs/forms.html"));
})

app.post('/process_post', function(req, res){
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }
    res.end(JSON.stringify(response));
})

app.get('/html-docs/helper.mjs', function (req, res) {
    res.sendFile(path.join(__dirname, 'html-docs', 'helper.mjs'));
  });

app.get('/node_modules/d3/dist/d3.min.js', function(req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/d3/dist', 'd3.min.js'));
})

var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("App hosted on ", host, " at port", port);
})