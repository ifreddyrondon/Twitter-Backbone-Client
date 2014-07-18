var com = com || {};
com.apress = com.apress || {};
com.apress.router = com.apress.router || {};

com.apress.router.AppRouter = Backbone.Router.extend({

	searchModel: null,

	initialize: function(options){
		var self = this;
		self.searchModel = options.searchModel;
		self.listenTo(self.searchModel,'change:query', self.navigateToSearch);

		self.searchModel.on('app:error', function(error){
			alert(error.message);
		});
	},

	navigateToSearch: function(model, options){
		var url = 'search/' + model.get('query');
		this.navigate(url, {trigger: true});
	},

	routes: {
		'search/:query': 'search'
	},

	search: function(query){
		var self = this;

		console.log('search for ' + query);
		if (self.searchModel.get('query') !== query) {
			self.searchModel.set('query', query, {silent:true});
		}

		self.searchModel.fetch({
			success: function(model){
				var resultsView = new com.apress.view.ResultsView({model:model});
			}, 

			error: function(e){
				alert('No result available');
			}
		});
	}

});