(function(window, $, _, undefined) {
	TeacherInput = Backbone.View.extend({
		template : "#selectTeacherTemplate",
		initialize : function() {
			this.model.bind("change", this.render, this);
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {} );
			this.$el.html( compiledHtml );
		}
	});
}) (window, $, _);