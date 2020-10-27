var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    contactRoutes = require("./routes/contacts");

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// ================================================
// requring routes
// ================================================

var indexRoutes = require("./routes/index");

app.use("/", indexRoutes);
app.use('/contacts', contactRoutes);

// ================================================
// listen to port
// ================================================

var port = 3000;
app.listen(port, () => console.log(`APP IS RUNNING ON PORT ${port}!`))