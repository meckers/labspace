var ControlPanel = {

    map: null,
    element: null,

    init: function() {
        this.map = Map;
        this.element = $("#control-panel");
        this.polyList = this.element.find(".poly-list");
        this.polygons = new PolygonCollection();
    },


    refreshList: function() {

        var me = this;

        me.polyList.empty();

        $(Application.polygons.items).each(function(i,e) {
            var polyItemContainer = $("<li></li>").attr({
                'name' : e.name,
                'class' : 'polygon-listitem'
            });
            polyItemContainer.html(e.name);
            polyItemContainer.click(function() {
                e.select();
            });

            var deleteIcon = $("<div></div>").attr({
                'class' : 'delete-icon'
            });
            deleteIcon.html("X");
            deleteIcon.click(function(event) {
                e.kill(event);
            });

            var hiddenData = $("<input />").attr({
                'name' : e.id + '_data',
                'type' : 'hidden'
            });

            polyItemContainer.append(hiddenData);
            polyItemContainer.append(deleteIcon);
            me.polyList.append(polyItemContainer);
        });
    }
}