const Balance = require("./model");
const {recordAction} = require("../../common");

exports.getBalanceByFilters = async (filters) => {

};

exports.createBalance = async (productId, shopId, stored, ordered) => {
    await Balance.create({
        ProductId: productId,
        shopId,
        stored,
        ordered
    });
    await recordAction(productId, shopId, "createBalance", stored, ordered);
    console.log(`Balance created for product ${productId}, shop ${shopId}`);
};

exports.increaseBalance = async (id, amount, ordered) => {
    const balance = await Balance.findByPk(id);

    if (!balance) {
        throw new Error(`Balance with id ${id} not found`);
    }

    if (ordered) {
        balance.ordered += amount;
    }
    else {
        balance.stored += amount;
    }

    await balance.save();

    console.log(balance.ProductId, balance.shopId, "alterBalance", balance.stored, balance.ordered);
    await recordAction(balance.ProductId, balance.shopId, "alterBalance", balance.stored, balance.ordered);

};

exports.decreaseBalance = async (id, amount, ordered) => {
    await this.increaseBalance(id, -amount, ordered);
};

