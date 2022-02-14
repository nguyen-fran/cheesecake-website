/* author: Francisco Nguyen */

var express = require('express');
var router = express.Router();

var dbms = require('./dbms_promise');

/* POST order to return order data of a month back in JSON*/
router.post('/', function(req, res, next) {
    var month = req.body.month.toUpperCase();

    //the SQL query to get the number of cheesecakes ordered of each topping for that month
    var query = "SELECT COUNT(QUANTITY) FROM ORDERS " +
                "WHERE MONTH='" + month + "' AND TOPPING='cherry'" +
                " UNION " +
                "SELECT COUNT(QUANTITY) FROM ORDERS " +
                "WHERE MONTH='" + month + "' AND TOPPING='chocolate'" +
                " UNION " +
                "SELECT COUNT(QUANTITY) FROM ORDERS " + 
                "WHERE MONTH='" + month + "' AND TOPPING='plain'";
    
    //performing the query on the database
    var month_data = dbms.dbquery(query);
    month_data.then(function(results) {
        //error checking the values for the toppings
        var cherry = (results[0]["COUNT(QUANTITY)"] == null) ? 0 : results[0]["COUNT(QUANTITY)"];
        var chocolate = (results.length < 2 || results[1]["COUNT(QUANTITY)"] == null) ? 0 : results[1]["COUNT(QUANTITY)"];
        var plain = (results.length < 3 || results[2]["COUNT(QUANTITY)"] == null) ? 0 : results[2]["COUNT(QUANTITY)"];

        //sending the data back to the client side
        res.json({
            error: null,
            data: [
                {topping: "cherry", quantity: cherry},
                {topping: "chocolate", quantity: chocolate},
                {topping: "plain", quantity: plain}
            ]
        });
    });
});

module.exports = router;
