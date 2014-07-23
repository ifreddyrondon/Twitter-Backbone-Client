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
var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ProfileView = Backbone.View.extend({

	el: '#profile',
	template: Handlebars.compile($("#profile-template").html()),
	model: null,

	initialize: function(options){
		var self = this;
		self.model = new com.apress.model.Profile({id:options.user});

		self.model.fetch();
		self.listenTo(self.model, 'change', self.render);
	},

	render: function(){
		var self = this;
		var output = self.template({user: self.model.toJSON()});
		self.$el.html(output);

		return self;
	}

});
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