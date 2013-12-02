(function(window, Backbone) {
	Feedbacks = BaseCollection.extend({
		initialize : function() {
			this.pager = (function() {
				var start = 1;

				return function() {
					return start++;
				};
			} () );
		},
		model : Feedback,
		url : function() {
			var parts = [this.urlRoot, "/feedbacks/", this.pager()];
			return parts.join("");
		},
		parse : function(response, options) {
			return response.result;
		}
	});
})(window, Backbone);