/*var NullDigit = function(prev) {
	this.Pop = function() { return false; };
	this.PopBack = function() { return false; };
	this.Push = function(number) { return false; };
	this.GetLast = function() { return prev; }
	this.GetValues = function() {return Immutable.List(); }
	this.IsCodeCorrect = function(code) {return code.length == 0;}
};

var SafeDigit = function(prev, count) {
	var me = this;
	var value = null;
	var next = null;
	
	if (count > 1) { 
		next = new SafeDigit(this, count - 1);
	} else {
		next = new NullDigit(this);
	}
	
	this.Push = function(number) {
		if (value == null) {
			value = number;
			return true;
		} else {
			return next.Push(number);
		}
	};
	
	this.Pop = function() {
		return me.GetLast().PopBack();
	};
	
	this.PopBack = function() {
		if (value != null) {
			value = null;
			return true;
		} else {
			return prev.PopBack();
		}
	};
	
	this.GetLast = function() { return next.GetLast(); };
	
	this.GetValues = function() {
		if (value != null) {
			return next.GetValues().splice(0, 0, value);
		} else {
			return Immutable.List();
		}
	};

	this.IsCodeCorrect = function(code) {
		if (code.length == 0) { return false; }
		if (value == null) { return false; }
		if (value == code[0]) { return next.IsCodeCorrect(code.substring(1, code.length)); }
		return false;
	};
};*/

/*var Safe = function(dispatcher) {
	var digits;
	var code;
	
	var numberTyped = function(message) {
		if (digits.Push(message.number)) { dispatcher.Publish('SafeUpdate', {current: digits.GetValues()}); }
	};
	
	var backspace = function(message) {
		if (digits.Pop()) { dispatcher.Publish('SafeUpdate', { current: digits.GetValues()}); }
	};

	var onSubmit = function(message) {
		if (digits.IsCodeCorrect(code)) {
			dispatcher.Publish('Solved', {});
		} else {
			dispatcher.Publish('WrongSolution', {});
		}
	};
	
	var initialize = function(message) {
		digits = new SafeDigit(new NullDigit(null), message.code.length); 
		dispatcher.Subscribe('NumberTyped', numberTyped);
		dispatcher.Subscribe('Backspace', backspace);
		dispatcher.Subscribe('Submit', onSubmit);
		code = message.code;
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};*/

var BrailleGame = function(dispatcher, words) {
	var solutions = Immutable.List();

	var onLetterTyped = function() {};
	var onBackspace = function() {};
	var onSubmit = function() {};

	var initialize = function(message) {
		dispatcher.Subscribe('LetterTyped', onLetterTyped);
		dispatcher.Subscribe('Backspace', onBackspace);
		dispatcher.Subscribe('Submit', onSubmit);
		solutions = message.words;
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};