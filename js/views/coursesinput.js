(function(window, $, _, undefined) {
	CoursesInput = Backbone.View.extend({
		initialize : function() {
			this.typeAhead = null;
			this.render();
		},
		events : {
		},
		render : function() {

			var template = _.template( $("#coursesInputTemplate").html(), {} );
			this.$el.html( template );

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