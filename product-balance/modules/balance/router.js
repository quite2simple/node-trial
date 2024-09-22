const express = require("express");
const router = express.Router();
const {validCreateBalance} = require("./validation");
const {createBalance} = require("./controller");

// get balances by filters
router.get("/", (req, res) => {

});

// create a new balance
router.post("/", async (req, res) => {
    const {productId, shopId, stored, ordered} = req.body;

    if (!validCreateBalance(productId, shopId, stored, ordered)) {
        res.status(400).send({error: "Bad input data"});
        return;
    }
    await createBalance(productId, shopId, stored, ordered);
    res.status(201).send({message: "Balance created successfully"});
});

// increase balance
router.patch("/increase", (req, res) => {
    
});

// decrease balance
router.patch("/decrease", (req, res) => {
    
});

module.exports = router;

