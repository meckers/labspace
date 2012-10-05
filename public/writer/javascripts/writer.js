Writer = Class.extend({

    //writerCanvas: null,
    recorder: null,

    init: function() {
        //this.writerCanvas = new WriterCanvas(canvasElement);
        this.strokeHandler = new StrokeHandler(new DomAgent('#char-matrix'));
        this.recorder = new Recorder();
        //this.test();
    },

    test: function() {
        this.writerCanvas.testFill();
        this.writerCanvas.drawAll();
    }
});