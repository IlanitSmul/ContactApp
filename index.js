var express = require('express'),
    app = express(),
    contactRoutes = require("./routes/contacts");

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