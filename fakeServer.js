var express = require('express'),
    path  = require('path'),
    http = require('http'),
    fs = require('graceful-fs');

/*--------------------------------------------------------------------------------------------------------------*/
var app = express();

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.static(path.join(__dirname, 'public')));
  });


  var timeline = require(__dirname + '/public/data/timeline.json');
  var profile = require(__dirname + '/public/data/profile.json');
  var search = require(__dirname + '/public/data/search.json');

/*--------------------------------------------------------------------------------------------------------------*/
// Main page
app.get('/', function (req,res){
  res.sendfile(__dirname + '/index.html');
});

/** 
 * Get the account settings for the user with the id provided.
 **/
app.get('/profile/:id', function(request, response){
  response.header('Access-Control-Allow-Origin', '*'); 
  response.json(profile);
});

/**
 * Runs a search given a query  
 **/
app.get('/search/:query', function (request, response) {
    
  response.header('Access-Control-Allow-Origin', '*'); 
  response.json(search);
});

/**
 * Returns the twitter timeline for the current user 
 **/
app.get('/timeline', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*'); 
    response.json(timeline);
});

/*--------------------------------------------------------------------------------------------------------------*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});