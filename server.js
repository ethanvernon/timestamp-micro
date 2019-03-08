// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint that returns author name... 
app.get("/api/author", function (req, res) {
  res.json({name: 'Ethan'});
});

// test nodemon
app.get("/api/test-node-mon", function (req, res) {
  res.json({working: true});
});

//time server from tutorials
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, 
  function(req, res) {
    res.send({'time': req.time});
  }
);

//handle empty string
app.get('/api/timestamp/:date_string?', function(req, res) {

	const dateString=req.params.date_string;
	
	var date;

	// If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp
	if (!dateString) {		
		date = new Date();
	} else {
	// If the dateString is an integer, convert dateString to integer and calculate date
		if (!isNaN(dateString)) {
			date = new Date(parseInt(dateString));
		} else {
	// otherwise the service uses the current timestamp		
			date=new Date(dateString);
		}
	}

	//If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }
	if (date.toString() === "Invalid Date") {
		res.json({ "error" : date.toString() });
	} else {
	//If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
		res.json({unix: date.getTime(), utc: date.toUTCString()});
	}
	

});


// listen for requests :)
const portNumber = process.env.PORT || 8000;
var listener = app.listen(portNumber, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});