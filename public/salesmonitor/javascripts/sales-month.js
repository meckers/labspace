SalesMonth = Month.extend({

    approved: null,
    invoiced: null,
    budget: null,
    accuInvoiced: 0,
    accuBudget: 0,

    init:  function(monthNumber, data) {
        if (data !== undefined) {
            this.setData(data);
        }
        this._super(monthNumber);
    },

    setData: function(data) {
        this.approved = data.Approved;
        this.invoiced = data.Invoiced;
        this.budget = data.Budget;
    },

    executeQuery: function() {
        var me = this;
        var query = new SalesQuery(this);
        query.execute(function(data) {
            me.setData(data);
            Magnus.Events.trigger("MonthLoaded", me);
        });
        return this;
    }


});