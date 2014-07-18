var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.SearchView = Backbone.View.extend({

	el: '#search',
	model: null,

	initialize: function(options){
		var self = this;
		self.model = options.model;
	},

	events: {
		'click #searchbutton' : 'runSearch'
	},

	runSearch: function(e){
		var self = this,
			query = $('#searchbox').val();

		// prevent the entire page from refreshing
		e.preventDefault();

		console.log('Run search against ' + query);
		// a trick to force a reset of the attribute
		self.model.set('query', '', {silent: true});
		self.model.set('query',query);
	}

});