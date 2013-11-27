(function(window, $, _, undefined) {
	TeacherInput = BaseView.extend({
		template : "#selectTeacherTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			var that = this;

			// We wait for a course to be picked up
			// and after this, we fetch the coresponding teachers
			this.model.bind("change", function(model) {
				that.collection.setCourse(model);
				that.collection.fetch({
					reset : true
				});
			});
			this.collection.bind("reset", this.render, this);

			// show the default state
			this.render();
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {
				collection : this.collection.toJSON(),
				model : this.model
			});
			this.$el.html( compiledHtml );
		}
	});
}) (window, $, _);