(function(window, $, _, undefined) {
	FeedbackScoller = BaseView.extend({
		template : "#feedbackViewTemplate",
		initialize : function(options) {
			BaseView.prototype.initialize.call(this, options);

			this.shouldInfiniteScroll = false;
			this.isLoading = true;
			this.$ajaxLoaderIndicator = null;
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

			this.$ajaxLoaderIndicator = this.$el.find("div#loadmoreajaxloader");

			return this;
		},
		renderFeedback : function() {
			this.$ajaxLoaderIndicator.hide();
			this.isLoading = false;

			var compiledHtml = _.template( $("#feedbackInfiniteScrollTemplate").html(), {
				collection : this.collection.toJSON()
			});

			this.$el.find("#feedbackInfiniteScroll").append(compiledHtml);
		},
		loadFeedback : function(event) {
			this.shouldInfiniteScroll = true;

			this.collection.fetch({
				reset : true
			});
		},
		checkScroll: function () {
			if(!this.shouldInfiniteScroll) {
				return false;
			}

			var
				triggerPoint = 100,
				that = this;
			if(
				!this.isLoading && 
				(
					$(window).scrollTop() + triggerPoint 
					>= 
					$(document).height() - $(window).height()
				)) {
				that.$ajaxLoaderIndicator.show();
				that.isLoading = true;
				_.delay( function() { that.loadFeedback(null) }, 2000);
			}
		}
	});
}) (window, $, _);