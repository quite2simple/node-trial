const Product = require("./model");

exports.getProductsByFilters = async (filters) => {

};

exports.createProduct = async (name, plu) => {
    await Product.create({
        name,
        plu
    });
    console.log(`Product created, plu: ${plu}`);
};