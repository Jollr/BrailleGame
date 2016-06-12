$(function() {
	var dispatcher = new Dispatcher();
	var input = new Input(dispatcher);

	dispatcher.Publish('Initialize');
});