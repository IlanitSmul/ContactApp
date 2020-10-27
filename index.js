var express = require('express'),
    app = express(),
    port = 3000;

app.get('/', (req, res) => {
    res.send('Hello from root route');
});

app.listen(port, () => console.log(`APP IS RUNNING ON PORT ${port}!`))