var Twit = require('twit');

exports.connect = function (){
   	client = new Twit({
      	consumer_key:         '...',
    	consumer_secret:      '...',
    	access_token:         '...',
    	access_token_secret:  '...'
  	});

  	return client;
};