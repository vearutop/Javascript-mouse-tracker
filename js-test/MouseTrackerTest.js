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

    jstestdriver.console.info("Array content is: ", this.tracker, " ");

    assertEquals('last frame x', 1200, this.tracker.lastFrame.x);
    assertEquals('last frame y', this.tracker.lastFrame.y, 200);
    assertEquals('track', this.tracker.trackString, '0,1200,200;');

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





