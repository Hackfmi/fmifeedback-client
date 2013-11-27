(function(window, $, _, undefined) {
	BaseView = Backbone.View.extend({
		initialize : function(options) {
			this.eventBus = options.eventBus;
		}
	});
}) (window, $, _);