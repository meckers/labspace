SalesQuery = Class.extend({

    urlTemplate: "http://10.15.50.10:83/service/salesService/HittaStatistics.svc/sales/{startDate}/{endDate}",
    timeSpan: null,

    init: function(timeSpan) {
        this.timeSpan = timeSpan;
    },

    execute: function(callback) {
        var me = this;
        callback = callback || me.executeSuccess;

        var url = me.urlTemplate
            .replace("{startDate}", this.timeSpan.startDate.toString("yyyy-MM-dd"))
            .replace("{endDate}", this.timeSpan.endDate.toString("yyyy-MM-dd"));
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: callback
        });
    },

    executeSuccess: function(data) {
        console.log(data);
    }
});