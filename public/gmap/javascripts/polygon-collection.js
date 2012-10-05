PolygonCollection = Class.extend({

    items: [],

    add: function(poly) {
        this.items.push(poly);
    },

    loadAll: function() {
        var me = this;
        $.get('/gmap/getpolygons', function(data) {
            console.log("loaded polygons. data=", data);
            me.populatePolygons(data);
            Events.trigger("PolygonsLoaded");
        });
    },

    populatePolygons: function(polygonData) {

        var me = this;

        $(polygonData).each(function(i,e) {

            var googleLatLngs = [];

            $(e.value).each(function(j, ev) {
                googleLatLngs.push(new google.maps.LatLng(ev.lat, ev.lng));
            });

            var polygon = new google.maps.Polygon({
                paths: googleLatLngs,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35
            });

            var poly = new Poly(polygon, e.name, e.id);
            me.items.push(poly);
        });
    },

    drawAll: function(map) {
        $(this.items).each(function(i,e) {
            e.overlay.setMap(map);
        });
    },

    clear: function() {
        $(this.items).each(function(i,e) {
            e.detach();
        });
        this.items = [];
    }


});