JSDefinedHtml = TestCase("JSDefinedHtml");
 
JSDefinedHtml.prototype.setUp = function() {
 //create a new div and store it in objects variable
 this.mainDiv = document.createElement('div');
 this.mainDiv.id = 'main';
     
 //create inner div
 var innerDiv = document.createElement('div');
 this.mainDiv.appendChild(innerDiv);
 innerDiv.className = 'text';
 innerDiv.innerHTML = "Hello word.";
 
 //add whole thing to document body
 document.body.appendChild(this.mainDiv);
};
 
JSDefinedHtml.prototype.testHtml = function() {
 var mainDiv = document.getElementById('main');
 var child = mainDiv.childNodes[0];
  
 //stored object is the same as the one found in the document
 assertEquals(this.mainDiv, mainDiv);
 assertEquals("text", child.className);
 assertEquals("Hello word.", child.innerHTML);
};
 
JSDefinedHtml.prototype.tearDown = function() {
 //clean up document
 var mainDiv = document.getElementById('main');
 document.body.removeChild(mainDiv);
};