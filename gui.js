var Gui = function(dispatcher) {
	var stateElements = Immutable.Map([['initialize', $('#stateInitialize')], ['gameStarted', $('#stateGameStarted')]]);
	
	var hideAll = function() {
		stateElements.map(function(x) {x.hide();});
	};

	var show = function(elem) {
		hideAll();
		stateElements.get(elem).show();
	};

	var initialize = function() {
		hideAll();
	};

	var start = function() {
		show('gameStarted');
	};

	dispatcher.Subscribe('Initialize', initialize);
	dispatcher.Subscribe('Started', start);
};