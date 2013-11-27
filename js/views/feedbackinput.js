(function(window, $, _, undefined) {
	FeedbackInput = Backbone.View.extend({
		template : "#feedbackInputTemplate",
		initialize : function() {
			this.render();
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {});
			this.$el.html( compiledHtml );
		}
	})
}) (window, $, _);