$(document).ready(function() {
      //$('#quote').DataTable();     
      getQuoteForDatatable();
  });

  var edit = '<button id="btnEdit">Edit</button>';
  var deleteBtn = '<button id="btnDelete">Delete</button>';

  function getQuoteForDatatable(afterDelete) {
      $.ajax({
          type: 'POST',
          //data: "",
          url: 'http://localhost:3001/getQuoteForDatatable',
          success: function(response) {
              console.log('response ' + JSON.stringify(response));
              var dTable = '<table id="tblQuotes" class="display responsive nowrap" cellspacing="0" width="100%">';
                  dTable += '<thead><tr><th>Name</th><th>Quote</th><th>Actions</th></tr></thead><tbody>';
                              
              $.each(response, function(index, element){
                  dTable += '<tr><td>' + element.name + '</td><td>' + element.quote + '</td>' + 
                            '<td><button id="btnEdit_' + element._id + '">Edit</button>&nbsp;' +
                            '<button id="btnDelete_' + element._id + '" onClick=deleteQuote("' + element._id + '")>Delete</button></td></tr>';
              });
              dTable += '</tbody></table>';
              
              if (afterDelete) {
                  $('#app').html(dTable);
              } else {
                  $('#app').append(dTable);
              }
              
              $('#tblQuotes').DataTable();
          },
          error: function(err){
              console.log('err ' + err);
          }
      });
      //console.log(data);
  }

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
                var dTable = '<table id="tblQuotes" class="display responsive nowrap" cellspacing="0" width="100%">';
                    dTable += '<thead><tr><th>Name</th><th>Quote</th><th>Actions</th></tr></thead><tbody>';
                                
                $.each(response, function(index, element){
                    dTable += '<tr><td>' + element.name + '</td><td>' + element.quote + '</td>' +
                                '<td><button id="btnEdit_' + element._id + '">Edit</button>&nbsp;' +
                                '<button id="btnDelete_' + element._id + '" onClick=deleteQuote("' + element._id + '")>Delete</button></td></tr>';        
                });
                dTable += '</tbody></table>';
                
                $('#app').html(dTable);
                $('#tblQuotes').DataTable();

                document.getElementById('name').value = "";
                document.getElementById('quote1').value = "";
            },
            error: function(err){
                console.log('err ' + err);
            }
      });
  }

  function deleteQuote(id) {
    $.ajax({
        type: 'Delete',
        url: 'deleteQuote',
        data: {'_id': id },        
        success: function(data) {
            getQuoteForDatatable(true);
        },
        error: function(err){
            console.log('err ' + err);
        }       
    });
  }