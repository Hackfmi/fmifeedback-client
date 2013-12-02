(function(window, $, _, undefined) {
	CourseInput = BaseView.extend({
		template : "#coursesInputTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);

			this.model.bind("change:uid", this.renderDisabled, this);

			this.typeAhead = null;
			this.render();
		},
		events : {
			"click button" : "triggerPickCourse"
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {} );
			this.$el.html( compiledHtml );

			this.typeAhead = 
			this.$el.find("input[type=text]").typeahead({
				name : "dataset" + _.uniqueId(),
				valueKey : "name",
				template : $("#courseTypeaheadTemplate").html(),
				engine : {
                    // using underscore as a templating engine
                    compile : function(template) {
                    	var compiled = _.template(template);
                    	return {
                    		render : function(context) {
                    			return compiled(context);
                    		}
                    	};
                    }
                },
                remote : {
                	// don't worry should change
                	url : (new Courses).url() + "%QUERY",
                }
            });

			var that = this;
			this.typeAhead.on("typeahead:selected", function(evt, data) {
				that.updateCourseModel(data);
			});
		},
		renderDisabled : function() {
			// dont worry, should change
			var
				$input = this.$el.find("input[type=text]");

			this.$el.find("button.pickAnotherCourse").toggleClass("invisible");

			if(this.model.get("uid") === -1) {
				$input
					.removeAttr('disabled')
					.css("background-color", "#fff")
				this.typeAhead.typeahead("setQuery", "");
				return;
			}

			$input
				.attr("disabled", "disabled")
				.css("background-color", "#eee") // trigger disabled color
		},
		updateCourseModel : function(modelData) {
			this.model.set(modelData);
			this.eventBus.trigger("set:keyvalue", [{
				key : "course_id",
				value : this.model.get("uid")	
			}]);
		},
		triggerPickCourse : function(event) {
			event.preventDefault();
			this.updateCourseModel({ uid : -1});
		}
	});

}) (window, $, _);