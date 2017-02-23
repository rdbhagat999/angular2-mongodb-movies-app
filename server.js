var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

// Database section START
const config = require('./config/config');

mongoose.Promise = global.Promise;
mongoose.connect( config.database );
mongoose.connection.on('connected', () => {
	console.log('Connected to database: '+ config.database);
});

mongoose.connection.on('error', ( err ) => {
	console.log('Database error: '+ err);
});

// Database section END
const movies = require('./routes/movies.js');

const app = express();

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'dist')));
app.use( cors() );
app.use(bodyParser.json()); // to send and recieve json data
app.use(bodyParser.urlencoded({ extended: true })); // TRUE to use with postman

app.use('/api', movies);

// Routes
app.get('/', function( req, res, next ) {
	res.sendFile( path.join(__dirname, 'dist/index.html') );
});

// If not matches any route
app.get('*', function( req, res, next ){
	res.sendFile( path.join(__dirname, 'dist/index.html') );
});


// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});