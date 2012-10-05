DomAgent = DrawingAgent.extend({

    element: null,
    matrix: null,

    init: function(element) {
        this.element = element;
        this.matrix = new DomMatrix(element);
        this.prepare();
    },

    prepare: function() {

    },

    handleStroke: function(stroke) {

    },

    draw: function(chr) {
        this.matrix.putChar(chr);
    },

    backspace: function() {
        this.matrix.backspace();
    },

    arrowKey: function(keyCode) {
        this.matrix.arrowKey(keyCode);
    }


});