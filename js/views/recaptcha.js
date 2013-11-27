(function(window, $, _, Recaptcha, undefined) {
	RecaptchaInput = BaseView.extend({
		template : "#recaptchaContainer",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.model.bind("change", this.render, this);
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {});
			this.$el.html( compiledHtml );

			var recaptchaContainerId = this.$el.find("div").attr("id");
			console.log(recaptchaContainerId)

			Recaptcha.create(this.model.get("recaptchaPublicKey"), recaptchaContainerId, {
				theme: "clean",
				callback: Recaptcha.focus_response_field
			});
		}
	});
}) (window, $, _, Recaptcha);