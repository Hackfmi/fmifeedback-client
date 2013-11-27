(function(window, $, _, undefined) {
	CoursesInput = Backbone.View.extend({
		initialize : function() {
			this.render();
		},
		events : {
			"keyup input[type=text]" : "fetchCoursesSuggestions"
		},
		render : function() {
			var template = _.template( $("#coursesInputTemplate").html(), {} );
			this.$el.html( template );

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
                local : [
                	{
                		name : "Rado"
                	},
                	{
                		name : "Ivan"
                	}
                ]
			});
		},
		fetchCoursesSuggestions : function(event) {
			console.log(event);
		}
	});

}) (window, $, _);