const express = require("express");
const router = express.Router();
const {validCreateProduct, validFilters} = require("./validation");
const {getProductsByFilters, createProduct} = require("./controller");


// get all products with filters
router.get("/", async (req, res) => {
    const filters = req.query;
    console.log(filters);
    if (!validFilters(filters)) {
        res.status(400).send({error: "Bad filters"});
        return;
    }
    const data = await getProductsByFilters(filters);
    res.status(200).send(data);
});

// create a new product
router.post("/", async (req, res) => {
    const {name, plu} = req.body;
    if (!validCreateProduct(name, plu)) {
        res.status(400).send({error: "Bad input data"});
    }

    await createProduct(name, plu);

    res.status(201).send({message: "Product created successfully"});
});


module.exports = router;