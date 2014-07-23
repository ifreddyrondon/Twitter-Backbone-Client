var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Profile = Backbone.Model.extend({

	urlRoot: '/profile',

	parse: function(model){
		return model;
	}
	
});
var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Search = Backbone.Model.extend({

	url: '/search',

	sync: function(method, model, options){
		if (this.get('query')) {
			this.url = this.url + '/' + this.get('query');
		}
		
		Backbone.sync.call(this,method,model,options);
	},

	parse: function(model){
		return model;
	}

});
var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Tweet = Backbone.Model.extend({

	parse: function(model){
		// model.created_at "Web Aug 28 06:32:07 +0000 2013"
		var friendly = moment(model.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY").fromNow();
		model.friendlyDate = friendly;
		return model;
	}

});