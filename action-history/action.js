const express = require('express');
const router = express.Router();
const sequelize = require('./db.js');
const Op = require("sequelize").Op;
const Action = require('./db.js').Action;
const {validCreateAction} = require('./validation.js');

router.get('/', async (req, res) => {
    let {shopId, plu, from, to, action, pageSize, page} = req.query;


    shopId = parseInt(shopId);
    from = Date.parse(from);
    to = Date.parse(to);
    pageSize = parseInt(pageSize);
    page = parseInt(page);

    if (isNaN(pageSize)) {
        pageSize = 5;
    }
    if (isNaN(page)) {
        page = 1;
    }

    console.log(shopId, plu, from, to, action, pageSize, page);


    if (isNaN(shopId) || isNaN(from) || isNaN(to) || plu === undefined) {
        console.log("Invalid data");
        res.status(400).send("Invalid data");
        return;
    }

    const filters = {
        shopId: shopId,
        plu: plu,
        timestamp: {
            [Op.between]: [from, to]
        },
    }
    if (action !== 'undefined' && action !== undefined) {
        filters.action = action;
    }

    console.log("filters", filters);

    const actions = await Action.findAll({
        where: filters,
        limit: pageSize,
        offset: pageSize * (page - 1),
    });
    // console.log(actions);
    res.status(200).send({
        pageSize: pageSize,
        page: page,
        actions: actions
    });

    



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