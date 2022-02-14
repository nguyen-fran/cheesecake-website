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
        var insert_query = "INSERT INTO ORDERS " +
        "VALUES (" + id + ", 'JAN', 1, " + req.body.quantity + 
        ", '" + req.body.topping.toLowerCase() + "', '" + req.body.notes  + "')";
        var insert = dbms.dbquery(insert_query);
        return id;
    })
    //checking to see if the insertion worked
    //(doesn't work, it shows the order before the one just inserted
    //to see if it has been inserted, make another order)
    .then(function(id) {
        var checking_query = "SELECT * FROM ORDERS WHERE ORDERID > " + id + " - 2";
        var check = dbms.dbquery(checking_query);
        check.then(function(results) {
            console.log("Insertion results: " + JSON.stringify(results));
        })
    });
});

module.exports = router;
