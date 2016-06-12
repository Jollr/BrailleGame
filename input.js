var Input = function(dispatcher) {
	var initialize = function() {
		document.onkeydown = function(e) {

			if (e.ctrlKey && e.shiftKey && e.keyCode == 32) { // ctrl + shift + spatiebalk
				dispatcher.Publish('MagicHotkey');
			}

			if (e.keyCode >= 65 && e.keyCode <= 90) { 
				dispatcher.Publish('LetterTyped', { letter: e.key.toUpperCase() });
			}
			
			if (e.keyCode == 8) { // backspace
				dispatcher.Publish('Backspace', { });
			}

			if (e.keyCode == 13) { // enter
				dispatcher.Publish('Submit', { });
			}
			
			return false;
		};
	};
	
	dispatcher.Subscribe('Initialize', initialize);
};