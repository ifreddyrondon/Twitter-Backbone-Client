var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ProfilePopupView = Backbone.View.extend({

	template: Handlebars.compile($("#profile-template").html()),
	model: null,

	initialize: function(options){
		var self = this;
		self.model = new com.apress.model.Profile({ id:options.user });
		self.render();
		self.model.fetch();
		self.listenTo(self.model, 'change', self.render);
	},

	render: function(){
		var self = this;

		if (self.model.get('screen_name')) {
			var output = self.template({user: self.model.toJSON()});

			BootstrapDialog.show({
	            title: '@'+self.model.get('screen_name') + 's Profile',
	            message: output,
	        });
 			
		}

		return self;
	}

});