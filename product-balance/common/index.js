const Product = require("../modules/product/model");
// this is needed bc sequelize will treat undefined as null iirc
exports.removeUndefinedFilters = (filters) => {
    const newFilters = {};
    for (let key in filters) {
        if (filters[key] !== undefined) {
            newFilters[key] = filters[key];
        }
    }
    return newFilters;
};

exports.recordAction = async (productId, shopId, action, stored, ordered) => {
    const plu = await Product.findByPk(productId).then(product => {
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        return product.plu
    });
    const url = 'http://localhost:5005/action';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plu: plu,
            productId: productId,
            shopId: shopId,
            action: action,
            stored: stored,
            ordered: ordered
        })
    });
    if (response.status === 201) {
        console.log("Action recorded");
    }
    else {
        console.log("Something went wrong, action was not recorded");
    }
};

exports.getActions = async(shopId, plu, from, to, action) => {
    const url = `http://localhost:5005/action?plu=${plu}&shopId=${shopId}&from=${from}&to=${to}&action=${action}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.status === 200) {
        console.log("Actions retrieved");
        return await response.json();
    }
    else {
        console.log("Something went wrong");
    }

}
