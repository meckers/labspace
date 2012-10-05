Caret = Class.extend({

    currentCell: null,

    init: function(cell) {
        if (cell !== undefined) {
            this.currentCell = cell;
        }
        else {
            this.currentCell = new WriterCell(0,0,10,10);
        }
    },

    moveRight: function() {

    }

})