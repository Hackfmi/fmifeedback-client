var AppConfig = {
	ApiEndpoint : "http://146.185.169.9/server",
	SERVER_API_KEY : "radorado"
};

var AppRouter = Backbone.Router.extend({
	routes : {
		"givefeedback" : "giveFeedback",
		"seefeedback" : "seeFeeback",
		"about" : "showAbout"
	},

	giveFeedback : function() {
		console.log("#givefeedback");
	},
	seeFeeback : function() {
		console.log("#seefeedback");
	},
	showAbout : function() {
		console.log("#about");
	}
});

var router = new AppRouter();
Backbone.history.start();