(function(window, $, _, undefined) {
	FeedbackInput = BaseView.extend({
		template : "#feedbackInputTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.render();
		},
		events : {
			"keyup textarea" : "textAreaChangeHandler"
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {});
			this.$el.html( compiledHtml );
		},
		textAreaChangeHandler : function(event) {
			var
				$area = this.$(event.target)
				areaId = $area.attr("id"),
				payload = {
					key : "",
					value : $area.val()
				};

			switch(areaId) {
				case "positiveFeedback" :
					payload.key = "positive";
				break;
				case "negativeFeedback" :
					payload.key = "negative"
				break;
			}

			this.eventBus.trigger("set:keyvalue", [payload]);
		}
	})
}) (window, $, _);