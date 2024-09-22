exports.validCreateAction = (productId, shopId, action, stored, ordered) => {
    if (productId === undefined || shopId === undefined || action === undefined || stored === undefined || ordered === undefined) {
        return false;
    }

    if (isNaN(productId) || isNaN(shopId) || isNaN(stored) || isNaN(ordered) || typeof action !== "string") {
        return false;
    }

    return true;
}
