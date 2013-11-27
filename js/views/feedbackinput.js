(function(window, $, _, undefined) {
	FeedbackInput = BaseView.extend({
		template : "#feedbackInputTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.render();
		},
		events : {
			"change textarea" : "textAreaChangeHandler"
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {});
			this.$el.html( compiledHtml );
		},
		textAreaChangeHandler : function(event) {
			var
				areaId = this.$(event.target).attr("id");

			switch(areaId) {
				case "positiveFeedback" :

				break;
				case "negativeFeedback" :

				break;
			}
		}
	})
}) (window, $, _);