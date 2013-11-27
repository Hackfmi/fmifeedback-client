(function(window, $, _, undefined) {
	CourseInput = Backbone.View.extend({
		template : "#coursesInputTemplate",
		initialize : function() {
			this.typeAhead = null;
			this.render();
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
		updateCourseModel : function(modelData) {
			this.model.set(modelData);
		}
	});

}) (window, $, _);