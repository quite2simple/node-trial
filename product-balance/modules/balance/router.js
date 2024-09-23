const express = require("express");
const router = express.Router();
const {validCreateBalance, validBalanceChange, validFilters} = require("./validation");
const {createBalance, increaseBalance, decreaseBalance, getBalanceByFilters} = require("./controller");

// get balances by filters
router.get("/", async (req, res) => {
    const filters = req.query;
    console.log(filters);
    filters.shopId = parseInt(filters.shopId);
    filters.from = Date.parse(filters.from);
    filters.to = Date.parse(filters.to);
    if (!validFilters(filters)) {
        res.status(400).send({error: "Bad filters"});
        return;
    }
    const data = await getBalanceByFilters(filters);
    res.status(200).send(data);
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

const alterBalance = async (req, res, decrease) => {
    let {id, amount, ordered} = req.query;

    id = Number(id);
    amount = Number(amount);
    ordered = ordered === "true";

    console.log(id, amount, ordered);

    if (!validBalanceChange(id, amount, ordered)) {
        res.status(400).send({error: "Bad input data"});
        return;
    }

    if (decrease) {
        await decreaseBalance(id, amount, ordered);
    }
    else {
        await increaseBalance(id, amount, ordered);
    }

    res.status(200).send({message: "Balance updated successfully"});
}

// increase balance
router.patch("/increase", async (req, res) => {
    await alterBalance(req, res, false);
});

// decrease balance
router.patch("/decrease", async (req, res) => {
    await alterBalance(req, res, true);
});

module.exports = router;

