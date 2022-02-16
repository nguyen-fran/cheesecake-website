/* author: Francisco Nguyen */

var express = require('express');
var router = express.Router();

var dbms = require('./dbms_promise');

/* POST orders to insert new order into database*/
router.post('/', function(req, res, next) {
    //SQL query to get next order id
    var order_insertion = dbms.dbquery("SELECT COUNT(ORDERID) AS NEXTID FROM ORDERS");
    order_insertion.then(function(results) {
        return results[0].NEXTID;
    })
    //performing the insertion
    .then(function(id) {
        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        var month = months[Math.floor(Math.random() * 12)];
        var day = Math.floor(Math.random() * 31);
        if (month == 'FEB' && day > 29) day -= Math.floor(Math.random() * 29) + 1;
        
        var insert_query = "INSERT INTO ORDERS " +
        "VALUES ( " + id + ", '" + month + "', " + day + ", " + 
        req.body.quantity + ", '" + req.body.topping.toLowerCase() +
         "', '" + req.body.notes  + "')";

        dbms.dbquery(insert_query);
        return id;
    })
    // checking to see if the insertion worked
    // (this doesn't work, it shows the order before the one just inserted,
    // to see if it has been inserted, make another order)
    .then(function(id) {
        var checking_query = "SELECT * FROM ORDERS WHERE ORDERID > " + id + " - 2";
        var check = dbms.dbquery(checking_query);
        check.then(function(results) {
            console.log("NOTE: the result is the order inserted immediately before the one just inserted.");
            console.log("Insertion results: " + JSON.stringify(results));
        })
    });
});

module.exports = router;
