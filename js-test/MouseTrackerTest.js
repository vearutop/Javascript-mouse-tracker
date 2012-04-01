MouseTrackerTest = TestCase("MouseTrackerTest");

MouseTrackerTest.prototype.testExtendClass = function() {
    TestParent = extendClass({
        testMethod1: function() {
            return 'testParent.testMethod1';
        },

        testMethod2: function() {
            return 'testParent.testMethod2';
        },

        testMethod3: function() {
            return 'testParent.testMethod3';
        },

        end: 'bye, bye!'
    });

    TestChild = extendClass({
        testMethod2: function() {
            return 'testChild.testMethod2';
        },

        end: 'bye, bye!'
    }, TestParent);

    testParent = TestParent();
    testChild = TestChild();


    assertEquals("inSetUp value", this.inSetUp, 1);
    assertUndefined("inTest", this.inTest);
    assertUndefined("inTearDown", this.inTearDown);

    this.inTest = 1;
};
