$(function(){

	Handlebars.registerHelper('format', function(str){
		if (str) {

			// highliht the @part
			str = str.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                var username = u.replace("@","");
                return '<a href="#" data-user="' + username +'" class="profile">@'+username+'</a>';
            });

			// highliht email
			str = str.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, function(u) {
                return '<a href="mailto:'+ u +'" target="_blank">'+u+'</a>';
            });

			// highliht url
            str = str.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(u) {
                return '<a href="'+ u +'" target="_blank">'+u+'</a>';
            });

           return new Handlebars.SafeString(str);
		} else {
			return str;
		}
	});


});