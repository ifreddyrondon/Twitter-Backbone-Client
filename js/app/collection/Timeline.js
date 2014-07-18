var com = com || {};
com.apress = com.apress || {};
com.apress.collection = com.apress.collection || {};

com.apress.collection.Timeline = Backbone.Collection.extend({

	model: com.apress.model.Tweet,
	url: 'http://localhost:3000/timeline',

	initialize: function(){

	}

});
