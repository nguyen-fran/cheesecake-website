var express = require('express');
var router = express.Router();

/* GET orders JSON. */
router.get('/', function(req, res, next) {
    res.json({
        error: null,
        data: [
            {topping: "cherry", quantity: 1},
            {topping: "chocolate", quantity: 2},
            {topping: "plain", quantity: 3},
        ]
    });
});

module.exports = router;
