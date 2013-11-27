(function(window, Backbone) {
	AppData = BaseModel.extend({
		defaults : {
			apiKey : window.AppConfig.SERVER_API_KEY,
			recaptchaPublicKey : "",
			feedbackCount : -1
		},
		url : function() {
			var parts = [ this.urlRoot, "/feedback", "?key=", this.get("apiKey") ];
			return parts.join("");
		},
		parse : function(response, options) {
			var attrHash = {
				recaptchaPublicKey : response.recaptcha_public_key,
				feedbackCount : response.count_all
			};

			return attrHash;
		}
	});
})(window, Backbone);