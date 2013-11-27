(function(window, $, _, undefined) {
	CoursesInput = Backbone.View.extend({
		initialize : function() {
			this.typeAhead = null;
			this.collection.bind("reset", this.render, this);
			this.render();
		},
		events : {
			"keyup input.autocomplete" : "fetchCoursesSuggestions"
		},
		render : function() {
			if(!_.isNull(this.typeAhead)) {
				console.log("rendering second time, should change dataset");
				var localData = _.map(this.collection.models, function(model) {
					return model.toJSON();
				});
				this.typeAhead.typeahead({
					local : localData
				});
				return this;
			}

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
                local : []
			});
		},
		fetchCoursesSuggestions : function(event) {
			console.log(this.$(event.target).val());
			this.collection.setStartsWith(this.$(event.target).val());
			this.collection.fetch({
				reset : true
			});
		}
	});

}) (window, $, _);