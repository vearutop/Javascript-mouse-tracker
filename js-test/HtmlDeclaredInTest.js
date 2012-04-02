HtmlDeclaredInTest = TestCase("HtmlDeclaredInTest");

HtmlDeclaredInTest.prototype.setUp = function() {
	this.testUtils = new TestUtils();
};

HtmlDeclaredInTest.prototype.testVariableHtml = function() {
 /*:DOC mainDiv = <div id='main'>
                    <div class='text'>Hello word.</div>
                  </div> */
 
 var child = this.testUtils.findFirstDiv(this.mainDiv);
 assertEquals("text", child.className);
 assertEquals("Hello word.", child.innerHTML);
};

HtmlDeclaredInTest.prototype.testDocumentHtml = function() {
   /*:DOC += <div id='attached'>
               <div class='text'>Attached to document.</div>
             </div>*/
   
   var attachedDiv = document.getElementById('attached');
   var child = this.testUtils.findFirstDiv(attachedDiv);
    
   assertEquals("text", child.className);
   assertEquals("Attached to document.", child.innerHTML);
};

HtmlDeclaredInTest.prototype.testDocumentHtmlScope = function() {
   //This test method make sense only if it runs last. Theoretically,
   //it is impossible to guarantee order in which test
   //methods run. If this method does not run last in your set up,
   //try to tweak its name.
   var attachedDiv = document.getElementById('attached');
   assertNull("Document should be clean.", attachedDiv);
       
   assertUndefined("Main div should be clean.", this.mainDiv);
};