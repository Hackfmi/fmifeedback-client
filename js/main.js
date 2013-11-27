jQuery(document).ready(function($) {
	var router = new AppRouter();
	Backbone.history.start();

	var
		appDataModel = new AppData(),
		selectedCourse = new Course(),
		ci = new CourseInput({
			el : "#feedbackForm",
			model : selectedCourse
		}),
		ti = new TeacherInput({
			el : $("<div></div>").appendTo("#feedbackForm"),
			model : selectedCourse,
			collection : new FilteredTeachers()
		}),
		fi = new FeedbackInput({
			el : $("<div></div>").appendTo("#feedbackForm")
		}),
		recaptha = new RecaptchaInput({
			el : $("<div></div>").appendTo("#feedbackForm"),
			model : appDataModel
		}),
		submitButton = new SubmitFormButton({
			el : $("<div></div>").appendTo("#feedbackForm")
		});

	// holds recaptcha public key
	// and feedback count
	appDataModel.fetch();
});