var Application = {

    polygons: null,

    init: function() {
        Map.init();
        ControlPanel.init();
        PolygonWindow.init();
        this.register();
        this.polygons = new PolygonCollection();
        this.loadPolygons();
    },

    register: function() {
        var me = this;
        Events.register("PolygonsLoaded", function() { me.updateEverything() });
        Events.register("PolygonCreated", function(overlay) { me.addNewPolygon(overlay) });
        Events.register("PolygonSaved", function() {
            me.clearPolygons();
            me.loadPolygons();
        });
        Events.register("PolygonDeleted", function() {
            me.clearPolygons();
            me.loadPolygons();
        });
    },

    addNewPolygon: function(overlay) {
        //overlay.setOptions({ editable: true });
        var poly = new Poly(overlay);
        this.polygons.add(poly);
        poly.select();
    },

    clearPolygons: function() {
        if (this.polygons !== null) {
            this.polygons.clear();
        }
    },

    loadPolygons: function() {
        this.polygons.loadAll();
    },

    updateEverything: function() {
        Application.polygons.drawAll(Map.getGoogleMap());
        ControlPanel.refreshList();
    }
};