(function(window, Backbone) {
	Teachers = BaseCollection.extend({
		initialize : function() {
		},
		model : Teacher,
		url : function() {
			var parts = [this.urlRoot, "/teacher"];
			return parts.join("");
		}
	});

	FilteredTeachers = Teachers.extend({
		initialize : function() {
			this.courseModel = null;
		},
		setCourse : function(courseModel) {
			this.courseModel = courseModel;
		},
		url : function() {
			var parts = [this.urlRoot, "/teacherByCourse/", this.courseModel.get("uid")];
			return parts.join("");
		}
	});
})(window, Backbone);