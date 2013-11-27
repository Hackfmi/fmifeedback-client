(function(window, Backbone) {
	BaseModel = Backbone.Model.extend({
		urlRoot : window.AppConfig.ApiEndpoint
	});
})(window, Backbone);