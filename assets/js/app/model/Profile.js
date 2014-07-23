var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Profile = Backbone.Model.extend({

	urlRoot: '/profile',

	parse: function(model){
		return model;
	}
	
});