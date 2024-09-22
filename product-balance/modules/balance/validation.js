exports.validCreateBalance = (productId, shopId, stored, ordered) => {
    if (!productId || !shopId || !stored || !ordered) {
        return false;
    }

    if (typeof productId !== "number" || typeof shopId !== "number" || typeof stored !== "number" || typeof ordered !== "number") {
        return false;
    }

    return true;
};