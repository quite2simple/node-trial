const Balance = require("./model");
const Product = require("../product/model");
const {recordAction} = require("../../common");
const {getActions} = require("../../common");

exports.getBalanceByFilters = async (filters) => {
    const {plu, shopId, from, to} = filters;

    const product = await Product.findOne({
        where: {
            plu: plu
        }
    });
    const balance = await Balance.findOne({
        where: {
            ProductId: product.id,
            shopId: shopId
        }
    });

    const history = await getActions(shopId, plu, from, to);

    if (!history) {
        console.log("No history");
        return {};
    }

    const res = {
        id: balance.id,
        plu: plu,
        shopId: shopId,
        history: history.actions.map(action => ({
            stored: action.stored,
            ordered: action.ordered,
            action: action.action,
            timestamp: action.timestamp
        }))
    };

    return res;

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

    // console.log(balance.ProductId, balance.shopId, "alterBalance", balance.stored, balance.ordered);
    await recordAction(balance.ProductId, balance.shopId, "alterBalance", balance.stored, balance.ordered);

};

exports.decreaseBalance = async (id, amount, ordered) => {
    await this.increaseBalance(id, -amount, ordered);
};

