DomCell = Class.extend({

    element: null,
    row: null,
    col: null,
    charElement: null,

    init: function(width, height, row, col) {
        this.row = row;
        this.col = col;
        this.element = $("<div></div>");
        this.element.css({
            'width': width,
            'height': height,
            //'background-color': col % 2 == 0 ? 'red' : 'brown',
            'background-color': 'black',
            'position': 'absolute',
            'left' : col * height + 'px',
            'top' : row * width + 'px'
        });
        this.setCharElement();
        this.element.append(this.charElement);
    },

    setCharElement: function(chr) {
        this.charElement = $("<div></div>");
        this.charElement.css({
            'position': 'absolute'
        });
        if (chr !== undefined) {
            this.charElement.html(chr);
        }
    },

    write: function(chr) {
        this.charElement.html(chr);
    },

    getChar: function() {
        return this.charElement.html();
    },

    copy: function(fromCell) {
        this.write(fromCell.getChar());
    }


});