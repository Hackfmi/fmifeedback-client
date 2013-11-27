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
		}),
		feedbackModel = new Feedback();

	// holds recaptcha public key
	// and feedback count
	appDataModel.fetch();

	// the dependency is here
	eventBus.on("set:keyvalue", function(eventPayload) {
		_.each(eventPayload, function(keyValueItem) {
			feedbackModel.set(keyValueItem.key, keyValueItem.value);
		});

		console.log(feedbackModel.toJSON());
	});

	eventBus.on("feedback:submit", function(eventPayload) {
		console.log("Submitting feedback");
		feedbackModel.set("recaptcha_response_field", Recaptcha.get_response());
		feedbackModel.set("recaptcha_challenge_field", Recaptcha.get_challenge());

		feedbackModel.save({
			apiKey : window.AppConfig.SERVER_API_KEY
		});
	});
});