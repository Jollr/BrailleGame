var AnswerQueue = function(dispatcher) {
	var queue = Immutable.List();

	var onAnswerSubmitted = function(m) {
		queue = queue.push(m.answer);
	};

	dispatcher.Subscribe('AnswerSubmitted', onAnswerSubmitted);
};

var InitalizedState = function(dispatcher) {
	this.onLetterTyped = function(letter) {
		return this;
	};

	this.onBackspace = function() {
		return this;
	};

	this.onSubmit = function() {
		return this;
	};
};

var GuessingState = function(dispatcher) {
	var currentGuess = '';

	var publishGuessUpdate = function() {
		dispatcher.Publish('GuessUpdate', {updatedGuess: currentGuess});
	}

	this.onLetterTyped = function(letter) {
		currentGuess = currentGuess + letter;
		publishGuessUpdate();
		return this;
	};

	this.onBackspace = function() {
		if (currentGuess.length > 0) {
			currentGuess = currentGuess.substring(0, currentGuess.length - 1);
			publishGuessUpdate();
		}
		return this;
	}

	this.onSubmit = function() {
		if (currentGuess.length > 0) {
			dispatcher.Publish('AnswerSubmitted', {answer: currentGuess});

			currentGuess = "";
			publishGuessUpdate();
		}

		return this;
	};
};

var BrailleGame = function(dispatcher, words) {
	var answerQueue = new AnswerQueue(dispatcher);
	var solutions = Immutable.List();
	var wordCounter = 0;
	var state = new InitalizedState(dispatcher);

	var onLetterTyped = function(m) { state = state.onLetterTyped(m.letter); };
	var onBackspace = function() { state = state.onBackspace();	};
	var onSubmit = function() { state = state.onSubmit(); };

	var initialize = function(m) {
		solutions = m.words;
	};

	var start = function() {
		state = new GuessingState(dispatcher);
		dispatcher.Subscribe('LetterTyped', onLetterTyped);
		dispatcher.Subscribe('Backspace', onBackspace);
		dispatcher.Subscribe('Submit', onSubmit);
	};
	
	dispatcher.Subscribe('Initialize', initialize);
	dispatcher.Subscribe('Started', start);
};