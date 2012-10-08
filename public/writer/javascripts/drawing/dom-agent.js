DomAgent = DrawingAgent.extend({

    element: null,
    matrix: null,

    init: function(element) {
        this.element = element;
        this.matrix = new DomMatrix(element);
        this.listen();
        this.prepare();
    },

    //todo: denna passar nog bättre i DrawingAgent.
    listen: function() {
        Events.register("SPECIAL_KEY_BACKSPACE", this, this.backspace);
        Events.register("SPECIAL_KEY_ENTER", this, this.enter);
        Events.register("SPECIAL_KEY_LEFT", this, this.goLeft);
        Events.register("SPECIAL_KEY_UP", this, this.goUp);
        Events.register("SPECIAL_KEY_RIGHT", this, this.goRight);
        Events.register("SPECIAL_KEY_DOWN", this, this.goDown);
    },



    prepare: function() {

    },

    reset: function() {
        this.matrix.reset();
    },

    draw: function(chr) {
        this.matrix.putChar(chr);
    },

    backspace: function() {
        this.matrix.backspace();
    },

    enter: function() {
        this.matrix.enter();
    },

    arrowKey: function(keyCode) {
        this.matrix.arrowKey(keyCode);
    },

    goLeft: function() {
        this.matrix.goLeft();
    },

    goUp: function() {
        this.matrix.goUp();
    },

    goRight: function() {
        this.matrix.goRight();
    },

    goDown: function() {
        this.matrix.goDown();
    }
});