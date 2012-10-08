Recorder = Class.extend({

    strokes: [],
    strokeIndex: 0,
    //strokeHandler: null,

    init: function() {
        this.listen();
    },

    listen: function() {
        Events.register("RECORDABLE_KEYSTROKE", this, this.recordStroke);
    },

    recordStroke: function(stroke) {
        var me = this;
        this.strokes.push(stroke);
        /*this.timer = window.setTimeout(function() {
            console.log("recorded strokes", me.strokes.length);
        }, 2000);*/
    },

    startPlayback: function() {
        this.strokeIndex = 0;
        this.playback(this.strokes[this.strokeIndex]);
    },

    playback: function(stroke) {
        var me = this;
        window.setTimeout(function() {
            Events.trigger("INCOMING_KEYSTROKE", stroke);
            if (me.strokeIndex + 1 !== me.strokes.length) {
                me.playback(me.strokes[me.strokeIndex++]);
            }
        }, 40);
    }

});