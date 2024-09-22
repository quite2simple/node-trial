const express = require('express');
const router = express.Router();
const sequelize = require('./db.js');
const Action = require('./db.js').Action;
const {validCreateAction} = require('./validation.js');

router.get('/', (req, res) => {

 });

 router.post('/', async (req, res) => {
    const {productId, shopId, action, stored, ordered} = req.body;

    if (!validCreateAction(productId, shopId, action, stored, ordered)) {
        res.status(400).send("Invalid data");
        return;
    }

    await Action.create({
        productId: productId,
        shopId: shopId,
        action: action,
        stored: stored,
        ordered: ordered
    });

    console.log("Entry recorded");
    res.status(201).send("Entry recorded");
 });

module.exports = router;