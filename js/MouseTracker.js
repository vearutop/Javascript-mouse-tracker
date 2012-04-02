function makeClass(){
    return function(args){
        if ('undefined' == typeof args) {
            args = {};
        }

        if ( this instanceof arguments.callee ) {
            if ( typeof this.init == "function" )
                this.init.apply( this, args.callee ? args : arguments );
        } else
            return new arguments.callee( arguments );
    };
}

var SettingsTrait = {
    init: function(settings) {
        this.setup(settings);
    },
    settings: {
        debug: false
    },
    setup: function(settings) {
        for (var e in settings) {
            this.settings[e] = settings[e];
        }
    },
    debugLog: function(msg) {
        if (this.settings.debug && window.console) {
            console.log(msg);
        }
    },
    end: null
};

var PublisherTrait = {
    subscribers: {},

    autoIncrement: 0,
    addSubscriber: function(subscriber, key) {
        if ('undefined' == typeof key) {
            key = this.autoIncrement++;
        }

        if ('function' == typeof subscriber.update) {
            this.subscribers[key] = subscriber;
        }
        return this;
    },
    removeSubscriber: function(key) {
        if ('undefined' !== typeof this.subscribers[key]) {
            delete this.subscribers[key];
        }
        return this;
    },
    publish: function(eventData) {
        this.debugLog(eventData);
        for (var e in this.subscribers) {
            this.subscribers[e].update(eventData);
        }
        return this;
    },
    end: null
};

var SubscriberTrait = {
    update: function(eventData) {throw "Subscriber.update method is not implemented";},
    end: null
};

var MousePublisher = makeClass();
MousePublisher.prototype = $.extend({}, SettingsTrait, PublisherTrait, {
    init: function(settings) {
        this.debugLog('init MousePublisher');
        this.setup(settings);
        this.dateStart = new Date();
        this.startListening();
    },

    dateStart: null,

    startListening: function() {
        this.debugLog('starting listening');
        (function(obj){
            $(document).mousemove(
                function(e) {
                    obj.setEvent(e);
                }
            );
        })(this);

        return this;
    },

    setEvent: function(e) {
        this.publish({x:e.pageX, y:e.pageY, ms: new Date().getTime() - this.dateStart.getTime()});
    },
    end: null
});


var MouseTrackSubscriber = makeClass();
MouseTrackSubscriber.prototype = $.extend({}, SettingsTrait, SubscriberTrait, {
    init: function(settings) {
        this.setup(settings);
        this.startTimer();
    },

    settings: {
        timeResolution: 1000,
        xResolution: 1,
        yResolution: 1,

        saveInterval: 10000,
        saveUrl: 'js/Terminator.js?track=',

        end: null
    },

    intervalTimer: null,
    track: {},
    lastFrameId: null,

    reset: function() {
        this.lastFrameId = null;
        this.track = {};
    },

    saveTrack: function() {
        var url = this.settings.saveUrl;
        this.debugLog('saving track');
        this.debugLog(url);
        $.ajax({
            url: url,
            dataType:"jsonp",
            cache: true,
            jsonpCallback: null,
            callback: false
        });
        this.reset();
    },

    startTimer: function() {
        this.debugLog('starting saving timer');
        (function(obj){
            window.setInterval(function(){obj.saveTrack();}, obj.settings.saveInterval);
        })(this);
    },

    update: function(eventData) {
        /**
         * applying time precision
         */
        var frameId = Math.floor(eventData.ms / this.settings.timeResolution);
        if (frameId == this.lastFrameId) {
            return;
        }

        /**
         * applying vector precision
         */
        if (this.settings.xResolution > 1) {
            eventData.x = Math.floor(Math.floor(eventData.x / this.settings.xResolution) * this.settings.xResolution);
        }
        if (this.settings.yResolution > 1) {
            eventData.y = Math.floor(Math.floor(eventData.y / this.settings.yResolution) * this.settings.yResolution);
        }

        /**
         * skipping duplicate frames
         */
        if (this.lastFrameId
            && this.track[this.lastFrameId].x == eventData.x
            && this.track[this.lastFrameId].y == eventData.y) {
            return;
        }

        this.debugLog();

        this.track[frameId] = [eventData.x, eventData.y];
        this.lastFrameId = frameId;
    },
    end: null
});


$().ready(function(){MousePublisher({debug: false}).addSubscriber(MouseTrackSubscriber({debug: true}));});


