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
    const url = 'http://localhost:5005/action';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
