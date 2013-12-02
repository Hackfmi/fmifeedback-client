(function(window, $, _, undefined) {
	FeedbackScoller = BaseView.extend({
		template : "#feedbackViewTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);
			this.collection = new Feedbacks();$(window).scroll

			this.model.bind("change", this.render, this);
			this.collection.bind("reset", this.renderFeedback, this);

			$(window).scroll($.proxy(this.checkScroll, this));
		},
		events : {
			"click a.button" : "loadFeedback"
		},
		render : function() {
			var compiledHtml = _.template( $(this.template).html(), {
				feedbackCount : this.model.get("feedbackCount"),
			} );
			this.$el.html( compiledHtml );

			return this;
		},
		renderFeedback : function() {
			var compiledHtml = _.template( $("#feedbackInfiniteScrollTemplate").html(), {
				collection : this.collection.toJSON()
			});

			this.$el.find("#feedbackInfiniteScroll").append(compiledHtml);
		},
		loadFeedback : function(event) {
			this.collection.fetch({
				reset : true
			});
		},
		checkScroll: function () {
			var
				triggerPoint = 100,
				that = this;
			if($(window).scrollTop() + triggerPoint >= $(document).height() - $(window).height()) {
				that.$el.find("div#loadmoreajaxloader").show();
				_.delay( function() { that.loadFeedback(null) }, 2000);
			}
		}
	});
}) (window, $, _);