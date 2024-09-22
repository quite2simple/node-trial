const Product = require("./model");
const {removeUndefinedFilters} = require("../../common");

exports.getProductsByFilters = async (filters) => {
    filters = removeUndefinedFilters(filters);

    const products = await Product.findAll({
        where: filters
    });
    return products;
};

exports.createProduct = async (name, plu) => {
    await Product.create({
        name,
        plu
    });
    console.log(`Product created, plu: ${plu}`);
};