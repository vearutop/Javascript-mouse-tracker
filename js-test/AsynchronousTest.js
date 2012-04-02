AsynchronousTest = AsyncTestCase("AsynchronousTest");
 
AsynchronousTest.prototype.setUp = function(){
  this.testUtils = new TestUtils();
};
 
AsynchronousTest.prototype.testSteps = function(queue){
	//define common variables here
	var something = 'hello';
	
	queue.call('Step 1: initialization', function(callbacks) {
		//all first step code goes here
	});

	queue.call('Step 2: do something', function(callbacks) {
		//all second step code goes here
	});

	// ... 
	
	queue.call('Step n: final checks', function(callbacks) {
		//all last step code goes here
	});

	
};

AsynchronousTest.prototype.testCallback = function(queue){
	//define common variables here
	var callback = function() {};
	
	queue.call('Step 1: run for 1 second', function(callbacks) {
		//register callback function
	    var callbackWrapper = callbacks.add(callback);
	    //set one second timer on the wrapper
	    window.setTimeout(callbackWrapper, 1000);
	});

	queue.call('Step 2: whatever', function(callbacks) {
		//this will run 1 second after first step
	});

};

AsynchronousTest.prototype.testAsynchronousFunction = function(queue){
	//create our callback function
	var callbackFinished = false,
	callbackFunction = function() {
		callbackFinished = true;
	};

	//set up asynchronous test 
	queue.call('Step 1: set up asynchronous function.', function(callbacks) {
		// js-test-driver wraps our callback and creates a 'real' callback
	    var callbackWrapper = callbacks.add(callbackFunction);
	    
	    // pass wrapped callback to the function under test
	    var testee = new AsyncEvent();
	    testee.asynchronousFunction(callbackWrapper);
	 });

	queue.call('Step 2: assert callback function call', function() {
	    assertEquals(true, callbackFinished);
  });

};
 
AsynchronousTest.prototype.tearDown = function(){
};