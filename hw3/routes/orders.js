var express = require('express');
var router = express.Router();

/* GET orders JSON. */
router.get('/', function(req, res, next) {
    res.json({
        error: null,
        data: [
            {topping: "cherry", quantity: 11},
            {topping: "chocolate", quantity: 17},
            {topping: "plain", quantity: 31},
        ]
    });
});

module.exports = router;
