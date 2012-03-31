ConsoleTestCase = TestCase("ConsoleTestCase");
 
ConsoleTestCase.prototype.testLogging = function(){
  var myArray = ['one', 'two', 3, "four"], undefinedVariable;
   
  jstestdriver.console.log("This is log message.");
  jstestdriver.console.debug("Printing out the value ", 2);
  jstestdriver.console.info("Array content is: ", myArray, " ");
  jstestdriver.console.warn("The value is undefined: ", undefinedVariable);
  jstestdriver.console.error(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
};