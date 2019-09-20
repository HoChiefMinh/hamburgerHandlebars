const express = require("express");
let burger = require("../models/burger");

let router = express.Router();

router.get("/", function (req, res) {
        res.redirect("/burgers");
    });

router.get("/burgers", function(req, res) {
    burger.selectAll(function(burgerData) {
        res.render("index", {burger_data: burgerData
        });
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ],
        [
            req.body.burger_name, req.body.devoured
        ],
        function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (
        result
    ) {
            if ((result.changedRows === 0)) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

// router.deleteOne("/api/burgers/:id", function (req, res) {
//     let condition = "id = " + req.params.id;    
//     console.log("condition", condition);

//     burger.deleteOne(condition, function (result) {
//         if ((result.affectedRows == 0)) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// Export routes for server.js to use.
module.exports = router;
