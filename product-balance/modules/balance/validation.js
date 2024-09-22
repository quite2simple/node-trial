exports.validCreateBalance = (productId, shopId, stored, ordered) => {
    if (productId === undefined || shopId === undefined || stored === undefined || ordered === undefined) {
        return false;
    }

    if (typeof productId !== "number" || typeof shopId !== "number" || typeof stored !== "number" || typeof ordered !== "number") {
        return false;
    }

    return true;
};

exports.validBalanceChange = (id, amount, ordered) => {
    if (id === undefined || amount === undefined || ordered === undefined) {
        return false;
    }

    if (typeof id !== "number" || typeof amount !== "number" || typeof ordered !== "boolean") {
        return false;
    }

    return true;
}