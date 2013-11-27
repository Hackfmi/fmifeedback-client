jQuery(document).ready(function($) {
	var router = new AppRouter();
	Backbone.history.start();

	var
		eventBus = _.extend({}, Backbone.Events),
		appDataModel = new AppData(),
		selectedCourse = new Course(),
		ci = new CourseInput({
			el : "#feedbackForm",
			model : selectedCourse,
			eventBus : eventBus
		}),
		ti = new TeacherInput({
			el : $("<div></div>").appendTo("#feedbackForm"),
			model : selectedCourse,
			collection : new FilteredTeachers(),
			eventBus : eventBus
		}),
		fi = new FeedbackInput({
			el : $("<div></div>").appendTo("#feedbackForm"),
			eventBus : eventBus
		}),
		recaptha = new RecaptchaInput({
			el : $("<div></div>").appendTo("#feedbackForm"),
			model : appDataModel,
			eventBus : eventBus
		}),
		submitButton = new SubmitFormButton({
			el : $("<div></div>").appendTo("#feedbackForm"),
			eventBus : eventBus
		});

	// holds recaptcha public key
	// and feedback count
	appDataModel.fetch();
});