var PolyEdit = {

    init: function() {

    },

    test: function() {

        var triangleCoords = [
            new google.maps.LatLng(25.774252, -80.190262),
            new google.maps.LatLng(18.466465, -66.118292),
            new google.maps.LatLng(32.321384, -64.75737),
            new google.maps.LatLng(25.774252, -80.190262)
        ];

        bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35
        });

        bermudaTriangle.enableEditing();

        bermudaTriangle.setMap(Map.map);
    },

    startPolygon: function() {
        this.test();
    }

}