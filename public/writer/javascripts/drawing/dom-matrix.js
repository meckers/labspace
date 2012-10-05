DomMatrix = Class.extend({

    element: null,

    cellSize: {
        width: 10,
        height: 10
    },

    dimensions: {
        rows: 40,
        cols: 40
    },

    currentCell: null,
    rows: [],
    cursor: null,

    init: function(element) {
        this.element = element;
        this.dimensions.cols = Math.floor($(element).width() / this.cellSize.width);
        this.dimensions.rows = Math.floor($(element).height() / this.cellSize.height);
        //console.log("DomMatrix inited", this);

        this.createCells();
        this.currentCell = this.getCell(0,0);
        this.cursor = new DomCursor(this.currentCell, this.cellSize.width, this.cellSize.height);
    },

    createCells: function() {
        for (r=0; r<this.dimensions.rows; r++) {
            var row = { cols: [] };
            for (c=0; c<this.dimensions.cols; c++) {
                var cell = new DomCell(this.cellSize.width, this.cellSize.height, r, c);
                row.cols.push(cell);
                $(this.element).append(cell.element);
            }
            this.rows.push(row);
        }
    },

    getCell: function(row, col) {
        return this.rows[row].cols[col];
    },

    putChar: function(chr) {
        this.writeToCurrentCell(chr);
        this.goToNextCell();
    },

    backspace: function() {

        try {
            var prevCell = this.getCell(this.currentCell.row, this.currentCell.col-1);
            this.writeToCell(prevCell, '');
            this.goToPreviousCell();
            this.pullLine();
            //this.writeToCurrentCell('');
        }
        catch(ex) {
            console.error(ex.message);
        }
    },

    pullLine: function() {
        for(i = this.currentCell.col; i<this.dimensions.cols-1; i++) {
            var row = this.rows[this.currentCell.row];
            //row.cols[i] = row.cols[i + 1];
            //console.log("copying content in", row.cols[i+1], "to", row.cols[i]);
            row.cols[i].copy(row.cols[i+1]);
        }
    },

    writeToCurrentCell: function(chr) {
        this.writeToCell(this.currentCell, chr);
    },

    writeToCell: function(cell, chr) {
        //$(cell.element).html(chr);
        cell.write(chr);
    },

    goToNextCell: function() {
        var col = null;
        var row = null;

        if (this.currentCell.col === this.dimensions.cols -1) {
            col = 0;
            row = this.currentCell.row + 1;
        }
        else {
            col = this.currentCell.col + 1;
            row = this.currentCell.row;
        }

        this.gotoCell(row, col);

    },

    arrowKey: function(keyCode) {
        switch(keyCode) {
            case 37:
                this.goToPreviousCell();
                break;
            case 38:
                this.goUp(1);
                break;
            case 39:
                this.goToNextCell();
                break;
            case 40:
                this.goDown(1);
                break;
        }
    },



    goToPreviousCell: function() {
        var col = null;
        var row = null;

        if (this.currentCell.col === 0) {
            col = this.dimensions.cols - 1;
            row = this.currentCell.row - 1;
        }
        else {
            col = this.currentCell.col - 1;
            row = this.currentCell.row;
        }

        this.gotoCell(row, col);

    },

    goUp: function() {
        var col = null;
        var row = null;

        if (this.currentCell.row === 0) {
            return;
        }
        else {
            col = this.currentCell.col;
            row = this.currentCell.row - 1;
        }

        this.gotoCell(row, col);
    },

    goDown: function() {
        var col = null;
        var row = null;

        if (this.currentCell.row === this.dimensions.rows - 1) {
            return;
        }
        else {
            col = this.currentCell.col;
            row = this.currentCell.row + 1;
        }

        this.gotoCell(row, col);
    },

    gotoCell: function(row, col) {
        //this.currentCell = this.getCell(row, col);
        this.setCell(this.getCell(row, col));
    },

    setCell: function(cell) {
        this.currentCell = cell;
        this.cursor.setCell(this.currentCell);
    }

});