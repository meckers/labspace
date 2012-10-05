$(function() {

    var query = "http://private.theca.internal.hitta.se:35822/query?%3CQueryWhiteSmart%20SortCols='1'%20SortDir='Asc'%20From='1'%20To='4'%20Result='bulk'%3E%3CWho%3Erui%20brites%3C/Who%3E%3CWhere%3Estockholm%3C/Where%3E%3C/QueryWhiteSmart%3E";

    $.ajax({
        url: query,
        dataType: 'xml',
        success: function(data) {
            console.log(data);
        }
    });

})