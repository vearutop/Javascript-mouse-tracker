function extendClass(child, parent, extension){
    child.prototype = parent.prototype;
    for (var e in extension) {
        child.prototype[e] = extension[e];
    }
}

function makeClass(){
    return function(args){
        if ( this instanceof arguments.callee ) {
            if ( typeof this.init == "function" )
                this.init.apply( this, args.callee ? args : arguments );
        } else
            return new arguments.callee( arguments );
    };
}

var SettingsTrait = makeClass();
SettingsTrait.prototype = {
    settings: {},
    setup: function(settings) {
        for (var e in settings) {
            this.settings[e] = settings[e];
        }
    },
    end: null
};


var Publisher = makeClass();
Publisher.prototype = {
    subscribers: {},

    addSubscriber: function(subscriber, key) {
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

    end: null
};

var Subscriber = makeClass();
Subscriber.prototype = {
    update: function(publishedEvent) {},

    end: null
};

var MousePublisher = makeClass();
extendClass(MousePublisher, Publisher, {
    init: function(settings) {

        this.dateStart = new Date();
    },

    x: null,
    y: null,
    dateLast: null,
    dateStart: null,

    track: {},
    settings: {
        timeResolution: 1000,
        xResolution: 1,
        yResolution: 1,
        end: 'bye, bye!'
    },

    startListening: function() {
        $(document).mousemove(
            function(e) {
                mousePublisher.setEvent(e);
            }
        );
        return this;
    },

    setEvent: function(e) {
        this.x = e.pageX;
        this.y = e.pageY;
        this.dateLast = new Date();


        this.updateTrack();

        //console.log([new Date().getTime() - this.dateStart.getTime(), this.x, this.y]);

        //console.log(e);
    },

    updateTrack: function() {
        var frameId = Math.floor((this.dateLast.getTime() - this.dateStart.getTime()) / this.settings.timeResolution);
        this.track[frameId] = [this.x, this.y];
    },


    end: 'bye, bye!'
});

var MouseTrackSubscriber = makeClass();
extendClass(MouseTrackSubscriber, Subscriber, {

});


$().ready(function(){mousePublisher = MousePublisher().addSubscriber(MouseTrackSubscriber({})).startListening();});


