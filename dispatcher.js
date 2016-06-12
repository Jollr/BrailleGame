var Dispatcher = function() {
	var subscriptions = new Immutable.Map();

	this.Subscribe = function(name, callback) {
		var added = subscriptions
			.get(name, new Immutable.List())
			.push(callback);
			
		subscriptions = subscriptions.merge(Immutable.Map([[name, added]]));
	};
	
	this.Publish = function(name, message) {
		console.log(name);
		console.log(message);
		subscriptions
			.get(name, new Immutable.List())
			.map(function (subscribedFunction) { subscribedFunction(message); });
	};
};