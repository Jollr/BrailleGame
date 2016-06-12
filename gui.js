var Gui = function(dispatcher) {
	var stateElements = Immutable.Map([['initialize', $('#stateInitialize')], ['gameStarted', $('#stateGameStarted')], ['gameFinished', $('#stateDisplayAnswers')]]);
	
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
		$('#currentGuess').html('');
	};

	var guessUpdate = function(m) {
		$('#currentGuess').html(m.updatedGuess);
	};

	var gameFinished = function(m) {
		show('gameFinished');
	};

	dispatcher.Subscribe('Initialize', initialize);
	dispatcher.Subscribe('Started', start);
	dispatcher.Subscribe('GuessUpdate', guessUpdate);
	dispatcher.Subscribe('GameFinished', gameFinished);
};