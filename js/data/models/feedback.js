(function(window, Backbone) {
	Feedback = BaseModel.extend({
		defaults : {
			teacher_id : -1,
			course_id : -1,
			positive : "",
			negative: "",
			course_rating:  0,
			teacher_rating: 0,
			recaptcha_response_field : "",
			recaptcha_challenge_field : ""
		}
	});
})(window, Backbone);