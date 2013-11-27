(function(window, Backbone) {
	Courses = BaseCollection.extend({
		initialize : function() {
			this.startsWith = "";
		},
		model : Course,
		setStartsWith : function(courseNamePart) {
			this.startsWith = courseNamePart;
		},
		url : function() {
			var parts = [this.urlRoot, "/startsWith", "/", this.startsWith];
			return parts.join("");
		}
	})
})(window, Backbone);