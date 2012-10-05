Poly = Class.extend({

    overlay: null,
    name: "",
    dirty: true,

    init: function(overlay, name, id) {
        this.overlay = overlay;
        this.name = name || "Unnamed polygon";
        this.id = id || Math.ceil(Math.random()*10000000); // TODO: make a string GUID here instead.
        var me = this;
        google.maps.event.addListener(this.overlay, 'click', function(event) {
            //Events.trigger("PolygonClicked", me);
            me.select();
        })
    },

    select: function() {
        //TODO skip below instructions if this polygon is already selected.
        this.overlay.setOptions({ editable: true });
        Events.trigger("PolygonSelected", this);
    },

    detach: function() {
        this.overlay.setMap(null);
    },

    kill: function(event) {
        if (confirm("Really delete " + this.name + "?")) {
            var me = this;

            $.ajax({
                type: 'GET',
                url: '/gmap/deletepolygon/' + me.id
            }).done(function(message) {
                    console.log("deleted", me.id);
                    Events.trigger("PolygonDeleted", me);
                });
            event.stopPropagation();
        }
    },

    getPolygon: function() {
        return this.overlay;
    },


    getCenter: function() {
        return this.getBounds().getCenter();
    },

    getBounds: function() {
        var bounds = new google.maps.LatLngBounds();
        this.overlay.getPath().forEach(function(e, i) {
                bounds.extend(e);
            });
        return bounds;
    },


    getPath: function() {
        var path = [];
        this.overlay.getPath().forEach(function(e, i) {
            path.push({
                lat: e.lat(),
                lng: e.lng()
            });
        });
        return path;
    },

    getPathAsString: function() {
        var path = "";
        this.overlay.getPath().forEach(function(e, i) {
            if (i !== 0) {
                path += ",";
            }
            path += e.lat() + "|" + e.lng();
        });
        return path;
    },

    getJSON: function() {
        var me = this;
        return JSON.stringify({
            id: me.id,
            name: me.name,
            path: me.getPath()
        });
    },

    flatten: function() {
        var me = this;
        return {
            id: me.id,
            name: me.name,
            path: me.getPathAsString()
        };
    },

    save: function() {
        var me = this;
        var polygonJSON = this.flatten();

        $.ajax({
            type: 'POST',
            url: '/gmap/savepolygon',
            data: polygonJSON
        }).done(function(message) {
                Events.trigger("PolygonSaved", me);
            });
    }



});