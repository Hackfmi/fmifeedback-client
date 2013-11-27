(function(window, $, _, undefined) {
	FeedbackInput = BaseView.extend({
		template : "#feedbackInputTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.render();
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {});
			this.$el.html( compiledHtml );
		}
	})
}) (window, $, _);