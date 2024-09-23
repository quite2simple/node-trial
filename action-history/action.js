const express = require('express');
const router = express.Router();
const sequelize = require('./db.js');
const Op = require("sequelize").Op;
const Action = require('./db.js').Action;
const {validCreateAction} = require('./validation.js');

router.get('/', async (req, res) => {
    let {shopId, plu, from, to, action} = req.query;

    shopId = parseInt(shopId);
    from = Date.parse(from);
    to = Date.parse(to);

    if (isNaN(shopId) || isNaN(from) || isNaN(to)) {
        res.status(400).send("Invalid data");
        return;
    }

    const actions = await Action.findAll({
        where: {
            shopId: shopId,
            plu: plu,
            timestamp: {
                [Op.between]: [from, to]
            },
            action: action
        }
    });
    res.status(200).send(actions);

    



 });

 router.post('/', async (req, res) => {
    const {plu, productId, shopId, action, stored, ordered} = req.body;

    if (!validCreateAction(plu, productId, shopId, action, stored, ordered)) {
        res.status(400).send("Invalid data");
        return;
    }

    await Action.create({
        plu: plu,
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