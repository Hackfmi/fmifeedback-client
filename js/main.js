jQuery(document).ready(function($) {
	var router = new AppRouter();
	Backbone.history.start();



	var
		selectedCourse = new Course(),
		ci = new CoursesInput({
			el : "#feedbackForm",
			model : selectedCourse
		});

	selectedCourse.bind("change", function(model, data) {
		console.log(model, data);
	})
});