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

};

exports.decreaseBalance = async (id, amount, ordered) => {
    await this.increaseBalance(id, -amount, ordered);
};

