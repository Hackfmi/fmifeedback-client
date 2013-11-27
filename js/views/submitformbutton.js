(function(window, $, _, undefined) {
	SubmitFormButton = BaseView.extend({
		template : "#submitButtonTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.render();
		},
		events : {
			"click button" : "submitFeedback"
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {});
			this.$el.html( compiledHtml );
		},
		submitFeedback : function(event) {
			event.preventDefault();
			this.eventBus.trigger("feedback:submit", { key : "value"});
		}
	});
}) (window, $, _);