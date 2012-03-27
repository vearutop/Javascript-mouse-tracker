LoadResourceTest = AsyncTestCase("LoadResourceTest");
 
LoadResourceTest.prototype.setUp = function(){
  this.testUtils = new TestUtils();
};
 
LoadResourceTest.prototype.testLoadCss = function(queue){
  // define HTML and common variables
  /*:DOC += <div id='colored'>I am colored.</div> */
  var documentDiv = document.getElementById('colored');
  var callbackFunction = function() {
  };
  
  queue.call('Step 1: no css sheet available', function(callbacks) {
    // css sheet is not available yet 
    assertEquals('', documentDiv.style.color);
  });

  queue.call('Step 2: load css sheet', function(callbacks) {
  	// wrap the callback
    var callbackWrapper = callbacks.add(callbackFunction);

  	// asynchronously load css 
    this.link = this.testUtils.loadCss("/test/src-test/cssresource.css", callbackWrapper);
  });
  
  queue.call('Step 3: css is already applied', function() {
    // elements color should change to red
    var currentColor = this.testUtils.elementColor(documentDiv);
    assertEquals('#ff0000', currentColor);
  });
  
};
 
LoadResourceTest.prototype.tearDown = function(){
	//clean up
	var head = document.getElementsByTagName('head')[0];
	if (this.link) {
		head.removeChild(this.link);
	}
};