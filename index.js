var express = require('express'),
    app = express(),
    port = 3000;

// ================================================
// requring routes
// ================================================

var indexRoutes = require("./routes/index");

app.use("/", indexRoutes);

// ================================================
// listen to port
// ================================================

app.listen(port, () => console.log(`APP IS RUNNING ON PORT ${port}!`))