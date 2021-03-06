(function(window, $, _, undefined) {
	TeacherInput = BaseView.extend({
		template : "#selectTeacherTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			var that = this;

			// We wait for a course to be picked up
			// and after this, we fetch the coresponding teachers
			this.model.bind("change:uid", function(model) {
				if(!model.valid()) {
					that.collection.reset();
					return;
				}

				that.collection.setCourse(model);
				that.collection.fetch({
					reset : true
				});
			});

			this.collection.bind("reset", this.collectionReset, this);

			// show the default state
			this.render();
		},
		events : {
			"change select" : "selectedTeacherHandler"
		},
		collectionReset : function() {
			this.updateTeacherModel(_.first(this.collection.models));
			this.render();
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {
				collection : this.collection.toJSON(),
				model : this.model
			});
			this.$el.html( compiledHtml );
		},
		selectedTeacherHandler : function(event) {
			var
				selectedId = this.$(event.target).find("option:selected").val(),
				selectedModel = _.find(this.collection.models, function(m) {
					return parseInt(m.get("uid"), 10) === parseInt(selectedId, 10);
				});

			this.updateTeacherModel(selectedModel);
		},
		updateTeacherModel : function(model) {
			var teacherIdValue = _.isUndefined(model) ? -1 : model.get("uid");
			
			this.eventBus.trigger("set:keyvalue",[{
				key : "teacher_id",
				value : teacherIdValue
			}]);
		},
		classToString : function() {
			return "TeacherInput";
		}
	});
}) (window, $, _);