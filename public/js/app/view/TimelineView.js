var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.TimelineView = Backbone.View.extend({

	el: '#timeline',
	
	template: Handlebars.compile($("#timeline-template").html()),

	timeline: null,

	initialize: function(options){
		var self = this;
		self.timeline = new com.apress.collection.Timeline();
		self.render();
		self.timeline.fetch({reset : true});
		self.listenTo(self.timeline, 'reset', self.render);	
	},

	render: function(){
		var self = this;
		if (self.timeline.models.length > 0) {
			var output = self.template({tweet: self.timeline.toJSON()});
			self.$el.append(output);
		}
		return self;
	},

	events: {
		'click .profile' : 'showDialog'
	},

	showDialog: function(options){
		var self = this,
			$target = $(options.currentTarget),
			username = $target.data('user');

		var profileView = new com.apress.view.ProfilePopupView({user: username});
	}

});