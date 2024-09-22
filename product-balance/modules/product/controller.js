const Product = require("./model");
const {removeUndefinedFilters, recordAction} = require("../../common");

exports.getProductsByFilters = async (filters) => {
    filters = removeUndefinedFilters(filters);

    const products = await Product.findAll({
        where: filters
    });
    return products;
};

exports.createProduct = async (name, plu) => {
    const product = await Product.create({
        name,
        plu
    });

    await recordAction(product.id, null, "createProduct", null, null);
    console.log(`Product created, plu: ${plu}`);
};