
Writer = Class.extend({

    //writerCanvas: null,
    recorder: null,
    loggingEnabled: true,

    init: function() {
        //this.writerCanvas = new WriterCanvas(canvasElement);
        this.strokeHandler = new StrokeHandler(new DomAgent('#char-matrix'));
        this.recorder = new Recorder();
        this.listen();
    },

    listen: function() {
        var me = this;
        $("#playback").click(function() {
            //console.log("this should clear the matrix");
            me.strokeHandler.drawingAgent.reset();
            me.recorder.startPlayback();
        });
    }
});


