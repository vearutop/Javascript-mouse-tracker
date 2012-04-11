BasicTest = TestCase("BasicTest");

BasicTest.prototype.testSettingsTrait = function() {
    TestClass = makeClass();
    $.extend(TestClass.prototype, SettingsTrait);

    var testClass1Instance = TestClass({'mySetting': 22});
    assertEquals("settings propagate", testClass1Instance.settings.mySetting, 22);
};


BasicTest.prototype.testPublisherSubscriber = function() {
    TestPublisher = makeClass();
    $.extend(TestPublisher.prototype, PublisherTrait);

    TestSubscriber = makeClass();
    $.extend(TestSubscriber.prototype, SubscriberTrait, {
        lastEvent:{},
        update: function(eventData) {this.lastEvent = eventData;}
    });


    var testSubscriber = TestSubscriber();
    var testPublisher = TestPublisher().addSubscriber(testSubscriber, 'test');
    testPublisher.publish('lalala');
    assertEquals("event published", testSubscriber.lastEvent, 'lalala');

    testPublisher.removeSubscriber('test');
    testPublisher.publish('hohoho');
    assertNotEquals("remove subscriber", testSubscriber.lastEvent, 'hohoho');
};

