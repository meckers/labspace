Magnus = {};


SalesMonitor = {

    currentMonth: null,
    year: null,
    chartOptions: {
        width: 840,
        height: 730,
        padding: 20,
        fontSize: 18
    },

    getToday: function() {
        //return Date.today().set({month: 11});
        return Date.today();
    },

    init: function() {
        this.register();
        this.loadMonth();
        this.loadYear();
    },

    register: function() {
        Magnus.Events.register("YearLoaded", this.onYearLoaded);
    },

    loadMonth: function() {
        var me = this;
        this.currentMonth = new Month();
        var query = new SalesQuery(this.currentMonth);
        query.execute(function(data) {
            //me.render(data);
            me.mc_renderMonth(data);
        });

        $("#month-header").html(this.currentMonth.name.toUpperCase());
        $("#year-header").html(SalesMonitor.getToday().getFullYear());
    },

    loadYear: function() {
        this.year = new Year();
    },

    onYearLoaded: function() {

        var tfootRow = $("#mc-year-chart tfoot tr");
        var tbody = $("#mc-year-chart tbody");

        $(SalesMonitor.year.months).each(function(i,e) {
            //if (e.invoiced !== 0 && e.number !== Date.today().getMonthNumber()) {
            if(e.number < SalesMonitor.getToday().getMonth()) {
                var row = $("<tr></tr>");
                var invoicedCell = $("<td></td>");
                var budgetCell = $("<td></td>");
                invoicedCell.html(e.accuInvoiced);
                budgetCell.html(e.accuBudget);
                row.append(invoicedCell);
                row.append(budgetCell);
                tbody.append(row);

                tfootRow.append($("<td></td>").html(e.name));
            }
        })

        SalesMonitor.mc_renderYear();

    },

    render: function(data) {
        //this.jqp_renderMonth(data);
        this.mc_renderMonth(data);
        //this.mc_renderYear(data);
    },

    mc_renderMonth: function(data) {
        $("#invoiced").html(data.Invoiced);
        $("#approved").html(data.Approved);
        $("#budget").html(data.Budget);
        var chart = new MilkChart.Column("mc-month-chart", this.chartOptions);
    },

    mc_renderYear: function() {
        var chart = new MilkChart.Line("mc-year-chart", this.chartOptions);
    },

    jqp_renderMonth: function(data) {
        var s1 = [data.Invoiced, data.Approved, data.Budget];
        /*var s2 = [460, -210, 690, 820];
        var s3 = [-260, -440, 320, 200];*/
        // Can specify a custom tick Array.
        // Ticks should match up one for each y value (category) in the series.
        var ticks = ['Fakturerat', 'Godkänt', 'Budget'];

        var plot1 = $.jqplot('jqp-month-chart', [s1/*, s2, s3*/], {
            // The "seriesDefaults" option is an options object that will
            // be applied to all series in the chart.
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                rendererOptions: {fillToZero: true}
            },
            // Custom labels for the series are specified with the "label"
            // option on the series option.  Here a series option object
            // is specified for each series.
            /*series:[
                {label:'Hotel'},
                {label:'Event Regristration'},
                {label:'Airfare'}
            ],
            // Show the legend and put it outside the grid, but inside the
            // plot container, shrinking the grid to accomodate the legend.
            // A value of "outside" would not shrink the grid and allow
            // the legend to overflow the container.
            legend: {
                show: true,
                placement: 'outsideGrid'
            },  */
            axes: {
                // Use a category axis on the x axis and use our custom ticks.
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                },
                // Pad the y axis just a little so bars can get close to, but
                // not touch, the grid boundaries.  1.2 is the default padding.
                yaxis: {
                    pad: 1.05,
                    tickOptions: {formatString: '%d'}
                }
            }
        });
    }
}