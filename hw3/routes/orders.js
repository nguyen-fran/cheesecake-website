var express = require('express');
var router = express.Router();

var dbms = require('./dbms');

/* POST orders JSON. */
router.post('/', function(req, res, next) {
    // var month = req.body.month.toUpperCase();
    // var query = "SELECT SUM(QUANTITY) FROM ORDERS " +
    //             "WHERE MONTH='" + month + "' AND TOPPINGS='cherry'" +
    //             " union " +
    //             "SELECT SUM(QUANTITY) FROM ORDERS " +
    //             "WHERE MONTH='" + month + "' AND TOPPINGS='chocolate'" +
    //             " union " +
    //             "SELECT SUM(QUANTITY) FROM ORDERS " +
    //             "WHERE MONTH='" + month + "' AND TOPPINGS='plain;";
    // // var query = "SELECT SUM(QUANTITY) AS COUNT FROM ORDERS " +
    // //             "WHERE MONTH='" + month + "' AND TOPPINGS='cherry'";
    // // var query = "select * from ORDERS where orderid=1";
    // var cherry, chocolate, plain;
    // var month_data = dbms.dbquery(query, function(error, results) {
    //     cherry = results;
    //     console.log("Printing cherry: " + results['MONTH']);
    // });

    res.json({
        error: null,
        data: [
            {topping: month_data, quantity: 1},
            {topping: "chocolate", quantity: 2},
            {topping: "plain", quantity: 3},
        ]
    });
});

module.exports = router;
