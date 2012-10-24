
Writer = Class.extend({

    recorder: null,
    drawingAgent: null,

    init: function() {
        this.drawingAgent = new DomAgent("#char-matrix");
        this.strokeHandler = new StrokeHandler();
        /*this.strokeHandler = new StrokeHandler({
            drawingAgent: this.drawingAgent
        });*/
        this.recorder = new Recorder();
        this.listen();
    },

    listen: function() {
        var me = this;
        $("#playback").click(function() {
            me.drawingAgent.reset();
            me.recorder.startPlayback();
        });
        $("#dump").click(function() {
            me.drawingAgent.matrix.dump();
        });
        $("#undump").click(function() {
            me.drawingAgent.matrix.unDump(staticLetters.test);
        });
    }
});


