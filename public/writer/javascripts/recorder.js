Recorder = Class.extend({

    strokes: [],
    //strokeHandler: null,

    init: function() {
        this.listen();
    },

    listen: function() {
        Events.register("INCOMING_KEYSTROKE", this, this.recordStroke);
    },

    recordStroke: function(stroke) {
        var me = this;
        this.strokes.push(stroke);
        this.timer = window.setTimeout(function() {
            console.log("recorded strokes", me.strokes.length);
        }, 2000);
    }
});