ScopeTest = TestCase("ScopeTest");

ScopeTest.prototype.setUp = function() {
	assertUndefined("inSetUp", this.inSetUp);
	assertUndefined("inTest", this.inTest);
	assertUndefined("inTearDown", this.inTearDown);
	
	this.inSetUp = 1;
};

ScopeTest.prototype.testVariables = function() {
	assertEquals("inSetUp value", this.inSetUp, 1);
	assertUndefined("inTest", this.inTest);
	assertUndefined("inTearDown", this.inTearDown);
	
	this.inTest = 1;
};

ScopeTest.prototype.testVariables2 = function() {
	assertEquals("inSetUp value", this.inSetUp, 1);
	assertUndefined("inTest", this.inTest);
	assertUndefined("inTearDown", this.inTearDown);
	
	this.inTest = 1;
};

ScopeTest.prototype.tearDown = function() {
	assertEquals("inSetUp value", this.inSetUp, 1);
	assertEquals("inTest value", this.inTest, 1);
	assertUndefined("inTearDown", this.inTearDown);
	
	this.inTearDown = 1;
};
