// Simple REST API Handler (in memory)
// Built by Yaron Biton misterBIT.co.il?en


var delay = 0;
// Some Fancy console logging
require('colors');

var express = require('express'),
  http = require('http'),
  utils = require('./lib/utils.js');


var app = express()
  .use(express.bodyParser())
  .use(express.static('public'));


function outputJSON(res, obj) {
    setTimeout(function () {
        res.json(obj);
    }, delay)

}

// Handle GET List
app.get('/api/:objType', function  (req, res) {
	var objs = utils.getObjList(req.params.objType);
	cl("Returning list of ".yellow + objs.length + " " + req.params.objType + "s");
    outputJSON(res, objs);
});

// Handle GET Single
app.get('/api/:objType/:id', function  (req, res) {
	var objs = utils.getObjList(req.params.objType);
	var index = utils.findIndexForId(objs, req.params.id);
	cl("GET for single ".yellow + req.params.objType);
    outputJSON(res, objs[index]);
});

// Handle UPDATE
app.put('/api/:objType/:id', function  (req, res) {
	var objs = utils.getObjList(req.params.objType);
	var updatedObj = req.body;

    updatedObj = utils.updateObj(objs, updatedObj);
	cl("PUT for single ".yellow + req.params.objType);
    outputJSON(res, updatedObj);
});

// Handle CREATE
app.post('/api/:objType', function  (req, res) {
    cl("POST for single ".yellow + req.params.objType);
	var objs = utils.getObjList(req.params.objType);
	var newObj = req.body;
    newObj.id = utils.findNextId(objs);
    utils.addObj(objs, newObj);
    outputJSON(res, newObj);
});

// Handle DELETE
app.delete('/api/:objType/:id', function  (req, res) {
	var objs = utils.getObjList(req.params.objType);
	utils.deleteObj(objs, req.params.id);
    outputJSON(res, {});
});


// Handle LOGIN
app.post('/login', function  (req, res) {
    var user = req.body;
    if (user.name === 'baba' && user.pass === 'kama') {
        outputJSON(res, user);
    } else {
        res.status(401).send('Wrong user/password');
    }
});



//app.get('/', function  (req, res) {
//	  res.json(404, {status: 'not found'});
//	});


app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});

http.createServer(app).listen(3000, function () {
  cl('My server is ready at '.yellow + 'http://localhost:3000'.green);
});
