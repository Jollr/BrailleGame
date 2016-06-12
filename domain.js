var AnswerQueue = function(dispatcher) {
	var queue = Immutable.List();

	var onAnswerSubmitted = function(m) {
		queue = queue.push(m.answer);
	};

	dispatcher.Subscribe('AnswerSubmitted', onAnswerSubmitted);
};

var BrailleGame = function(dispatcher, words) {
	var answerQueue = new AnswerQueue(dispatcher);
	var solutions = Immutable.List();
	var currentGuess = "";

	var publishGuessUpdate = function() {
		dispatcher.Publish('GuessUpdate', {updatedGuess: currentGuess});
	}

	var onLetterTyped = function(m) {
		currentGuess = currentGuess + m.letter;
		publishGuessUpdate();
	};

	var onBackspace = function() {
		if (currentGuess.length > 0) {
			currentGuess = currentGuess.substring(0, currentGuess.length - 1);
			publishGuessUpdate();
		}
	};

	var onSubmit = function() {
		if (currentGuess.length > 0) {
			dispatcher.Publish('AnswerSubmitted', {answer: currentGuess});

			currentGuess = "";
			publishGuessUpdate();
		}
	};

	var initialize = function(message) {
		solutions = message.words;
	}

	var start = function() {
		dispatcher.Subscribe('LetterTyped', onLetterTyped);
		dispatcher.Subscribe('Backspace', onBackspace);
		dispatcher.Subscribe('Submit', onSubmit);
	};
	
	dispatcher.Subscribe('Initialize', initialize);
	dispatcher.Subscribe('Started', start);
};