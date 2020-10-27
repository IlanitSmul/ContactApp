var express = require("express");
var router = express.Router();

// ================================================
// ROOT ROUTES
// ================================================

// GET - "/whos-there" - send my name
router.get("/whos-there", (req, res) => {
    const MY_NAME = "Ilanit Smul";
    res.send(`Hi Trax! This is ${MY_NAME}`);
});

module.exports = router; 