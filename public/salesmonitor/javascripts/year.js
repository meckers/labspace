Year = Class.extend({

    months: [],

    init: function() {
        this.register();
        this.populateMonths();
    },

    register: function() {
        var me = this;
        Magnus.Events.register("MonthLoaded", function(month) {
            me.monthLoaded(month);
        })

        Magnus.Events.register("AllMonthsLoaded", function() {
            me.accumumlateSales();
            Magnus.Events.trigger("YearLoaded");
        })
    },

    monthLoaded: function(month) {
        var isLast = true;
        $(this.months).each(function(i,e) {
            if (e.budget === null) {
                isLast = false;
            }
        })

        if (isLast) {
            Magnus.Events.trigger("AllMonthsLoaded");
        }
    },

    populateMonths: function() {
        for(i=0; i<12; i++) {
            this.months.push(new SalesMonth(i).executeQuery());
        }
    },

    accumumlateSales: function() {

        var accuInvoiced = 0;
        var accuBudget = 0;

        $(this.months).each(function(i,e) {
            accuInvoiced += e.invoiced;
            e.accuInvoiced = accuInvoiced;
            accuBudget += e.budget;
            e.accuBudget = accuBudget;
        });
    }


});