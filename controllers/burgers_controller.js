var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hsbObject = {
            burgers: data
        };
        console.log(hsbObject);
        res.render("index", hsbObject);
    });
});


router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function(result) {
        res.json({id: result.insertId});
    });
});


router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("This is the condition " + condition);

    burger.updateOne({devoured: req.body.devoured},
        condition, function(result) {
            if (result.changeRow == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});


router.delete("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRow == 0) {
            return res.status(404).end();
        }
    });
    
});


module.exports = router;