/* author: Francisco Nguyen */

var express = require('express');
var router = express.Router();

var dbms = require('./dbms');

/* POST orders JSON. */
router.post('/', function(req, res, next) {
    var month = req.body.month.toUpperCase();
    console.log("Month changed to: " + month);
    var query = "select sum(QUANTITY) from ORDERS " +
                "where month=" + month + " and topping='cherry'" +
                " union " +
                "select sum(QUANTITY) from ORDERS " +
                "where month=" + month + " and topping='chocolate'" +
                " union " +
                "select sum(QUANTITY) from ORDERS "
                "where month=" + month + " and topping='plain'";
    var month_data = dbms.dbquery(query, function(){});
    
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
