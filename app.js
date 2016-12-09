$(document).ready(function() {
    //$('#quote').DataTable();     
    getQuoteForDatatable();
});

function saveAndGetQuote() {
var data = {
    name: $('#name').val(),
    quote: $('#quote1').val()
};

console.log(JSON.stringify(data));
    $.ajax({
        type: 'POST',
        data: data,
        //dataType: 'json',
        //contentType: 'application/json',
        url: 'http://localhost:3001/saveAndGetQuote',
        success: function(response) {
            console.log('response ' + JSON.stringify(response));
            var dTable = '<table id="tblQuotes" class="display" cellspacing="0" width="100%">';
                dTable += '<thead><tr><th>Name</th><th>Quote</th></tr></thead><tbody>';
                            
            $.each(response, function(index, element){
                dTable += '<tr><td>' + element.name + '</td><td>' + element.quote + '</td></tr>';         
            });
            dTable += '</tbody></table>';
            
            $('#app').html(dTable);
            $('#tblQuotes').DataTable();   
        },
        error: function(err){
            console.log('err ' + err);
        }
    });
}

function getQuoteForDatatable() {
    $.ajax({
        type: 'POST',
        //data: "",
        url: 'http://localhost:3001/getQuoteForDatatable',
        success: function(response) {
            console.log('response ' + JSON.stringify(response));
            var dTable = '<table id="tblQuotes" class="display" cellspacing="0" width="100%">';
                dTable += '<thead><tr><th>Name</th><th>Quote</th></tr></thead><tbody>';
                            
            $.each(response, function(index, element){
                dTable += '<tr><td>' + element.name + '</td><td>' + element.quote + '</td></tr>';         
            });
            dTable += '</tbody></table>';
            
            $('#app').append(dTable);
            $('#tblQuotes').DataTable();
        },
        error: function(err){
            console.log('err ' + err);
        }
    });
    //console.log(data);
}