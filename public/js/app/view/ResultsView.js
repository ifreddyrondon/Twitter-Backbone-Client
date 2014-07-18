var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ResultsView = Backbone.View.extend({

	el: '#results',
	model: null,
	template: Handlebars.compile($("#timeline-template").html()),

	initialize: function(options){
		var self = this;
		self.model = options.model;
		self.render();
	},

	render: function(){
		var self = this,
			output = self.template({tweet: self.model.get('statuses')});

		BootstrapDialog.show({
            title: 'Search Results',
            message: output,
        });
	}

});