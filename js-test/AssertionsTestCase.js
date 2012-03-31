AssertionsTestCase = TestCase("AssertionsTestCase");
 
AssertionsTestCase.prototype.testAlwaysPass = function(){
  var expected = 1, actual = 1;
  assertEquals("The vales should be the same", expected, actual);
  assertEquals(expected, actual);
 
  var myStr = "hello";
  assertString("The variable should contain a string", myStr);
  assertString(myStr);
};
 
AssertionsTestCase.prototype.testAlwaysFail = function(){
  assertEquals(1, 2);
};

AssertionsTestCase.prototype.testAlwaysFailWithMessage = function(){
  assertEquals("1<>2", 1, 2);
};

functionUnderTest = function(number, callback) {
  for (var i = 0; i < number; i++) {
    callback(i);
  }
};
	 
AssertionsTestCase.prototype.testExpectedCalls = function(){
  var parameterCheck = function(number) {
    assertNumber(number);
  };
	 
  expectAsserts(3);
  functionUnderTest(3, parameterCheck);
};