var express = require('express'),
    path  = require('path'),
    http = require('http'),
    connectToTwitter = require('./connectToTwitter');

/*--------------------------------------------------------------------------------------------------------------*/
var app = express(),
    client = connectToTwitter.connect();

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.static(path.join(__dirname, 'public')));
  });

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
 
     client.get('users/show', {screen_name: request.params.id},  function (err, reply) {
    
      if(err){
        console.log('Error: ' + err);
        response.send(404);

      }
      if(reply){
       /// console.log('Reply: ' + reply);
        response.json(reply);
      }

  });
});

/**
 * Runs a search given a query  
 **/
app.get('/search/:query', function (request, response) {
    
    response.header('Access-Control-Allow-Origin', '*'); 
    //search term is 
    var searchTerm = request.params.query;

    client.get('search/tweets', { q: searchTerm, count: 100 }, function(err, reply) {

      if(err){
        console.log('Error: ' + err);
        response.send(404);

      }
      if(reply){
       // console.log('Reply: ' + reply);
        response.json(reply);
      }

  });


});



/**
 * Returns the twitter timeline for the current user 
 **/
app.get('/timeline', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*'); 
     client.get('statuses/home_timeline', { },  function (err, reply) {
    
      if(err){
        console.log('Error: ' + err);
        response.send(404);

      }
      if(reply){
        // console.log('Reply: ' + reply);
        response.json(reply);
      }

  });

    //response.json(books);

});

/*--------------------------------------------------------------------------------------------------------------*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});