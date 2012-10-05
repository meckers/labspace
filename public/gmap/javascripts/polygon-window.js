var PolygonWindow = {

    element: null,
    currentPoly: null,

    init: function() {
        var me = this;
        this.element = $("#polygon-window");
        this.nameField = $(".polygon-name");
        this.register();
    },

    register: function() {

        var me = this;

        Events.register("PolygonSelected", function(data) {
            PolygonWindow.setPoly(data)
        });

        this.element.find("#polygon-form").submit(function(e) {
            e.preventDefault();
            me.currentPoly.name = $("#polygon-form .polygon-name").val();
            me.savePoly();
        })
    },

    setPoly: function(poly) {
        this.currentPoly = poly;
        this.nameField.val(poly.name);
        this.enable();
        this.refresh();
    },

    clear: function() {
        this.currentPoly.detach();
    },

    reset: function() {
        this.currentPoly = null;
        this.disable();
    },

    refresh: function() {
        //this.renderPaths();

    },

    enable: function() {
        this.element.find(".polygon-name").css('display', 'block');
        this.element.find("#save-polygon-button").css('display', 'block');
    },

    disable: function() {
        this.element.find(".polygon-name").css('display', 'none');
        this.element.find("#save-polygon-button").css('display', 'none');
    },

    savePoly: function() {
        this.currentPoly.save();
    }



}