HtmlDeclaredInSetUp = TestCase("HtmlDeclaredInSetUp");
 
HtmlDeclaredInSetUp.prototype.setUp = function() {
 //create a new div and store it in objects variable
 /*:DOC mainDiv = <div id='main'><div class='text'>Hello word.</div></div>*/
 
 //create a new div and append it to document
 /*:DOC += <div id='attached'><div class='text'>Attached to document.</div></div>*/

  this.testUtils = new TestUtils();
};
 
HtmlDeclaredInSetUp.prototype.testVariableHtml = function() {
 var child = this.testUtils.findFirstDiv(this.mainDiv);
  
 assertEquals("text", child.className);
 assertEquals("Hello word.", child.innerHTML);
 assertNull("Variable-only DOM", document.getElementById('main'));
};
 
HtmlDeclaredInSetUp.prototype.testDocumentHtml = function() {
 var attachedDiv = document.getElementById('attached');
 var child = this.testUtils.findFirstDiv(attachedDiv);
  
 assertEquals("text", child.className);
 assertEquals("Attached to document.", child.innerHTML);
};