(function(window, Backbone) {
	Courses = BaseCollection.extend({
		initialize : function() {
			this.startsWith = "";
		},
		model : Course,
		setStartsWith : function(courseNamePart) {
			if(courseNamePart.trim() === "") {
				return false;
			}

			this.startsWith = courseNamePart;
			return true;
		},
		getStartsWith : function() {
			return this.startsWith;
		},
		fetchAll : function() {

		},
		url : function() {
			var parts = [this.urlRoot, "/startsWith", "/", this.startsWith];
			return parts.join("");
		}
	})
})(window, Backbone);