//MouseTrackerTest = TestCase("MouseTrackerTest");

MouseTrackerTest = makeClass();

$.extend(MouseTrackerTest.prototype, {}, {
    tracker: null,

    setUp:function () {
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
    },

    tearDown: function(){
        this.publisher.stopListening();
    },

    timer: null,


    testTrack: function() {
        this.publisher.setEvent({pageX: 100, pageY: 200});

        // fill track
        (function(obj){
            obj.timer = window.setInterval(function(){obj.saveTrack();}, obj.settings.saveInterval);
        })(this);

        //emulating mouse movement




        jstestdriver.console.info("last frame is ", this.publisher.lastEvent, " ");

        jstestdriver.console.info("x-holder is ", $('#x-holder').html(), " ");
    },

    end: null


});




/**
 * 1. setEvent
 * check(x, y, ms)holders
 * 2. checkResolution
 * 3. checkTimeResolution
 * 4.
 */





