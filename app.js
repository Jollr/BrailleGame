$(function() {
	var dispatcher = new Dispatcher();
	var input = new Input(dispatcher);
	var game = new BrailleGame(dispatcher);
	var gui = new Gui(dispatcher);

	dispatcher.Publish('Initialize', {
		words: Immutable.List("HARK", "JUIST", "GRIJNS", "HAGEDIS", "MOZAIEK", "BRUISBAL", "ACHTERAS")
	});

	dispatcher.Subscribe('MagicHotkey', function() {
		dispatcher.Publish('Started');
	});
});