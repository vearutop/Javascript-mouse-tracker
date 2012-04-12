MouseTrackerTest = TestCase("MouseTrackerTest");

MouseTrackerTest.prototype.setUp = function () {
    this.tracker = MouseTrackSubscriber({
        /* enable or disable printing debug info to console.log */
        debug:true,
        /* url for saving track, track format is concat[floor(timeSinceStartInMs/timeResolution),x,y;] */
        saveUrl:'http://vearutop.github.com/Javascript-mouse-tracker/js/Terminator.js?track=',
        /* server saving time interval (in ms) */
        saveInterval:100,
        /* min time interval between track frames */
        timeResolution:30,
        /* perform server query with empty track */
        saveEmpty:false
    });

    /* creating mouse move publisher */
    this.publisher = MousePublisher({debug:false})
        /* adding track logger and saving */
        .addSubscriber(this.tracker);
};

MouseTrackerTest.prototype.tearDown = function () {
    this.publisher.stopListening();
};
//MouseTrackerTest.prototype.tracker = null;
//MouseTrackerTest.prototype.publisher = null;


MouseTrackerTest.prototype.testLastFrame = function () {
    this.publisher.setEvent({pageX:1200, pageY:200});

    //jstestdriver.console.info("tracker data ", this.tracker, " ");

    // first frame
    assertEquals('last frame x', this.tracker.lastFrame.x, 1200);
    assertEquals('last frame y', this.tracker.lastFrame.y, 200);
    assertEquals('track', '0,1200,200;', this.tracker.trackString);

    //this.tracker.settings.maxTrackStringLength = 10;

    // collision frame should be ignored
    this.publisher.setEvent(({pageX:120, pageY:300}));
    assertNotEquals('last frame x', 120, this.tracker.lastFrame.x);
    assertNotEquals('last frame y', 300, this.tracker.lastFrame.y);
    assertEquals('track', '0,1200,200;', this.tracker.trackString);

    // delaying to the next frame
    var start = new Date();
    var now = null;
    do { now = new Date(); }
    while(now - start < 30);

    // collision frame should be ignored
    this.publisher.setEvent(({pageX:150, pageY:320}));
    assertEquals('last frame x', 150, this.tracker.lastFrame.x);
    assertEquals('last frame y', 320, this.tracker.lastFrame.y);
    assertEquals('track', '0,1200,200;1,150,320;', this.tracker.trackString);


    //jstestdriver.console.info("tracker data ", this.tracker, " ");


    // emulating mouse movement
    /*
     (function(obj){
     obj.timer = window.setInterval(function(){obj.saveTrack();}, obj.settings.saveInterval);
     })(this);
     */
};


/**
 * 1. setEvent
 * check(x, y, ms)holders
 * 2. checkResolution
 * 3. checkTimeResolution
 * 4.
 */





