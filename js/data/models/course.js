(function(window, Backbone) {
	Course = BaseModel.extend({
		defaults : {
			uid : -1,
			name : ""
		},
		valid : function() {
			return this.get("uid") !== -1;
		}
	});
})(window, Backbone);