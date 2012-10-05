var Map = {
    defaultOptions: {
        center: new google.maps.LatLng(59.327, 378.076),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    },

    map: null,
    drawingManager: null,
    polygons: [],

    init: function() {
        this.map = new google.maps.Map(document.getElementById("map_canvas"), this.defaultOptions);
        this.initDrawing();
        this.registerListeners();
    },

    getGoogleMap: function() {
        return this.map;
    },

    initDrawing: function() {
        this.drawingManager = new google.maps.drawing.DrawingManager();
        this.drawingManager.setMap(this.map);
    },

    registerListeners: function() {
        var me = this;
        google.maps.event.addListener(this.drawingManager, 'overlaycomplete', function(event) {
            if (event.type == google.maps.drawing.OverlayType.POLYGON) {

                Events.trigger("PolygonCreated", event.overlay);

                /*
                event.overlay.setOptions({ editable: true });
                var poly = new Poly(event.overlay);
                PolygonWindow.setPoly(poly);
                */
            }
        });

        google.maps.event.addListener(this.map, 'dragend', function(event) {
            console.log("center", me.map.getCenter());
        });

        Events.register("PolygonSelected", function(polygon) {
            //console.log("polygon clicked via event", polygon, me.map);
            //me.map.panTo(polygon.getCenter());
            me.map.fitBounds(polygon.getBounds());
        });

    }

}