jQuery(document).ready(function($) {
	var router = new AppRouter();
	Backbone.history.start();



	var
		coursesData = new Courses(),
		ci = new CoursesInput({
			el : "#feedbackForm",
			collection : coursesData
		});
});