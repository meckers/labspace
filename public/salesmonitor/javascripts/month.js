Month = Class.extend({

    name: null,
    number: null,
    startDate: null,
    endDate: null,
    approved: null,
    budget: null,
    invoiced: null,

    init: function(monthNumber) {

        //console.log("initing month with month number", monthNumber);

        if (monthNumber === undefined) {
            monthNumber = SalesMonitor.getToday().getMonth();
        }

        this.number = monthNumber;
        this.name = SalesMonitor.getToday().set({month: 0, day: 1}).addMonths(monthNumber).getMonthName();
        this.startDate = SalesMonitor.getToday().set({month: 0, day: 1}).addMonths(monthNumber);
        this.endDate = SalesMonitor.getToday().set({month: 1, day:1}).addMonths(monthNumber);
        //console.log(monthNumber, this.startDate, this.endDate);
    }



});