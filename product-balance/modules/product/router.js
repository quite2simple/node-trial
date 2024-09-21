const express = require("express");
const router = express.Router();
const {validCreateProduct} = require("./validation");
const {getProductsByFilters, createProduct} = require("./controller");


// get all products with filters
router.get("/", (req, res) => {

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