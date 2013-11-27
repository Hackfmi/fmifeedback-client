jQuery(document).ready(function($) {
	var router = new AppRouter();
	Backbone.history.start();



	var
		selectedCourse = new Course(),
		ci = new CourseInput({
			el : "#feedbackForm",
			model : selectedCourse
		}),
		ti = new TeacherInput({
			el : $("<div></div>").appendTo("#feedbackForm"),
			model : selectedCourse,
			collection : new FilteredTeachers()
		});

		ti.render();
});