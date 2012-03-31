var AsyncEvent = function() {
};

AsyncEvent.prototype.constructor = AsyncEvent;

/**
 * Works asynchronously and calls the callback when everything is done.
 * 
 * @param callback called when the work is done 
 * @return nothing
 */
AsyncEvent.prototype.asynchronousFunction = function(callback) {
	//the timer simulates an asynchronous operation 
    window.setTimeout(callback, 2000);
};
