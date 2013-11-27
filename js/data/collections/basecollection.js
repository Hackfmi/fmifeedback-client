(function(window, Backbone) {
	BaseCollection = Backbone.Collection.extend({
		urlRoot : window.AppConfig.ApiEndpoint 
	});
})(window, Backbone);