function MouseTracker(settings) {
    if (this instanceof MouseTracker) {
        for (var e in settings) {
            this.settings[e] = settings[e];
        }

        return this;
    }
    else {
        return new MouseTracker(settings);
    }
}

MouseTracker.prototype = {
    settings: {
        end: 'bye, bye!'
    },



    end: 'bye, bye!'
}