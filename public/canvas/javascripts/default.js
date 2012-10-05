var CanvasTest = {
    init: function() {
        $("#myCanvas").click(this.drawDot);
        $("#myCanvas").mousemove(this.mouseMove);
    },

    drawDot: function(e) {
        var c = $("#myCanvas")[0];
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#ff0000";
        var posX = e.offsetX-5;
        var posY = e.offsetY-5;
        var name = prompt("Name");
        rects.push(new MERect(posX, posY, 10, 10, name));
        ctx.fillRect(posX, posY, 10, 10, name);
    },

    mouseMove: function(e) {
        var mouseX = e.offsetX;
        var mouseY = e.offsetY;

        $(rects).each(function(i,e) {
            if (mouseX > e.posX && mouseX < e.posX + e.width && mouseY > e.posY && mouseY < e.posY + e.height) {
                if (!e.titleDisplayed) {
                    e.displayTitle();
                }
            }
            else if (e.titleDisplayed) {
                e.hideTitle();
            }
        });
    }

};


var rects = [];

function MERect(posX, posY, width, height, name) {
    this.age = 0;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.name = name;
    this.titleDisplayed = false;
    this.title = null;

    this.displayTitle = function() {
        this.title = $("<div></div>").css({
            'position': 'absolute',
            'top': this.posY-20,
            'left' : this.posX+20,
            'border': '1px solid black',
            'padding': '2px 2px 2px 2px',
            'background-color': '#efefef',
            'z-index': 10000
        }).addClass("title");

        $("#canvasContainer").append(this.title);
        this.title.html(this.name);
        this.titleDisplayed = true;
    };

    this.hideTitle = function() {
        $("#canvasContainer .title").remove();
        this.titleDisplayed = false;
    }
}


$(function() {
    CanvasTest.init();
})