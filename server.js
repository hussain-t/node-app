const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

var db;

//mongodb://root:root123@ds115918.mlab.com:15918/node-crud-app
MongoClient.connect('mongodb://root:root123@localhost:27017/node-app', (err, database) => {
    if (err) 
        return console.log(err);
    db = database;

    var server = app.listen(3001, function() {
        console.log('listening on 3001');

        var host = server.address().address;
        var port = server.address().port;
        console.log('listening on 3001 from server', host, port);

    });
});

app.use(bodyParser.urlencoded({extended: true}));

//app.set('view engine', 'ejs');

//retrive all data
app.get('/listUsers', function (req, res) {
   db.collection('quotes').find().toArray((err, result) => {
       //console.log( result );
       res.send( result );
   });
});

//retrieve data by sending parameter
app.get('/:quote', function (req, res) {
    var quote = req.param('quote');
   db.collection('quotes').find({'quote':quote}).toArray((err, result) => {
       //quotes = JSON.stringify(result);
       //var quote = users["quote" + req.params.quote];
       //console.log( result );
       res.send( JSON.stringify(result) );
   });
});

//Redirect to home page
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err);
    // renders index.ejs
    res.render('index.ejs', {quotes: result});
  });
});

//Ajax call method to Get Quote For Datatable(not using since getting from saveAndGetQuote method)
app.get('/getQuoteForDatatable', (req, res) => {
    db.collection('ajaxQuote').find().toArray((err, result) => {
        console.log('RESULT: ' + JSON.stringify(result));
        res.send(result);
    });
});

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
    if (err) 
        return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});

//Ajax call method to save and get data for datatable in mongodb
app.post('/saveAndGetQuote', (req, res) => {

    console.log('body: ' + JSON.stringify(req.body));
    db.collection('ajaxQuote').save(req.body, (err, result) => {
        if (err)
            return console.log(err);
        console.log('saved to database');
        //res.send(req.body);
    });
    //res.send(req.body);

    db.collection('ajaxQuote').find().toArray((err, result) => {
        console.log('RESULT: ' + JSON.stringify(result));
        res.send(result);
    });
});