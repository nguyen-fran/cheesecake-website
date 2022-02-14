/* author: Francisco Nguyen */

var express = require('express');
var router = express.Router();

// var dbms = require('./dbms');
var dbms = require('./dbms_promise');

/* POST orders JSON. */
router.post('/', function(req, res, next) {
    var month = req.body.month.toUpperCase();
    console.log("Month changed to: " + month);

    var query = "select sum(QUANTITY) as TOPPINGS from ORDERS " +
                "where month='" + month + "' and topping='cherry'" +
                " union " +
                "select sum(QUANTITY) from ORDERS " +
                "where month='" + month + "' and topping='chocolate'" +
                " union " +
                "select sum(QUANTITY) from ORDERS " + 
                "where month='" + month + "' and topping='plain'";
    
    // var month_data = dbms.dbquery(query, function(error, results) {
    //     console.log("data: "+ results[0].TOPPINGS);
        
    //     var cherry = (results[0].TOPPINGS == null) ? 0 : results[0].TOPPINGS;
    //     var chocolate = (results[1].TOPPINGS == null) ? 0 : results[1].TOPPINGS;
    //     var plain = (results[2].TOPPINGS == null) ? 0 : results[2].TOPPINGS;

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
    // var cherry, chocolate, plain;
    month_data.then(function(results) {
        console.log("promise results[2].'sum(quantity)': " + results[0].topping);

        var cherry = (results[0].TOPPINGS == null) ? 0 : results[0].TOPPINGS;
        var chocolate = (results[1].TOPPINGS == null) ? 0 : results[1].TOPPINGS;
        var plain = (results[2].TOPPINGS == null) ? 0 : results[2].TOPPINGS;

        res.json({
            error: null,
            data: [
                {topping: "cherry", quantity: cherry},
                {topping: "chocolate", quantity: chocolate},
                {topping: "plain", quantity: plain}
            ]
        });
    });
    console.log("month_data: " + month_data);
    
});

module.exports = router;
