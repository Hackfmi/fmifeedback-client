(function(window, $, _, undefined) {
	SubmitFormButton = Backbone.View.extend({
		template : "#submitButtonTemplate",
		initialize : function() {
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
		}
	});
}) (window, $, _);