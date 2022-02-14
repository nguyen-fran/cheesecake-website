/* author: Francisco Nguyen */

var express = require('express');
var router = express.Router();

// var dbms = require('./dbms');
var dbms = require('./dbms_promise');

/* POST orders JSON. */
router.post('/', function(req, res, next) {
    var month = req.body.month.toUpperCase();
    console.log("Month changed to: " + month);

    var query = "SELECT SUM(QUANTITY) FROM ORDERS " +
                "WHERE MONTH='" + month + "' AND TOPPING='cherry'" +
                " UNION " +
                "SELECT SUM(QUANTITY) FROM ORDERS " +
                "WHERE MONTH='" + month + "' AND TOPPING='chocolate'" +
                " UNION " +
                "SELECT SUM(QUANTITY) FROM ORDERS " + 
                "WHERE MONTH='" + month + "' AND TOPPING='plain'";
    
    // dbms.dbquery(query, function(error, results) {
    //     var cherry = (results[0]["SUM(QUANTITY)"] == null) ? 0 : results[0]["SUM(QUANTITY)"];
    //     var chocolate = (results.length < 2 || results[1]["SUM(QUANTITY)"] == null) ? 0 : results[1]["SUM(QUANTITY)"];
    //     var plain = (results.length < 3 || results[2]["SUM(QUANTITY)"] == null) ? 0 : results[2]["SUM(QUANTITY)"];

    //     res.json({
    //         error: null,
    //         data: [
    //             {topping: "cherry", quantity: cherry},
    //             {topping: "chocolate", quantity: chocolate},
    //             {topping: "plain", quantity: plain}
    //         ]
    //     });
    // });

    var month_data = dbms.dbquery(query);
    month_data.then(function(results) {
        console.log("promise results[2].'sum(quantity)': " + JSON.stringify(results));

        var cherry = (results[0]["SUM(QUANTITY)"] == null) ? 0 : results[0]["SUM(QUANTITY)"];
        var chocolate = (results.length < 2 || results[1]["SUM(QUANTITY)"] == null) ? 0 : results[1]["SUM(QUANTITY)"];
        var plain = (results.length < 3 || results[2]["SUM(QUANTITY)"] == null) ? 0 : results[2]["SUM(QUANTITY)"];

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
