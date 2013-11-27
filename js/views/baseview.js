(function(window, $, _, undefined) {
	BaseView = Backbone.View.extend({
		initialize : function(options) {
			this.eventBus = options.eventBus;
		},
		classToString : function() {
			throw new Error("View should implement classToString() method");
		},
		trigger : function(eventName, data) {
			this.eventBus.trigger(eventName, data);
		}
	});
}) (window, $, _);