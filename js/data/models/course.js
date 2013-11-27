(function(window, Backbone) {
	Course = BaseModel.extend({
		defaults : {
			uid : -1,
			name : ""
		}
	});
})(window, Backbone);