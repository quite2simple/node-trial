const Balance = require("./model");

exports.getBalanceByFilters = async (filters) => {

};

exports.createBalance = async (productId, shopId, stored, ordered) => {
    await Balance.create({
        productId,
        shopId,
        stored,
        ordered
    });
    console.log(`Balance created for product ${productId}, shop ${shopId}`);
};

exports.increaseBalance = async (productId, shopId, amount, ordered) => {

};

exports.decreaseBalance = async (productId, shopId, amount, ordered) => {

};

