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
        this.strokes.push(stroke);
    }
});