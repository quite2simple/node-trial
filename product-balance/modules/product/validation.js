exports.validCreateProduct = (name, plu) => {

    if (!name || !plu) {
        return false;
    }

    if (typeof name !== "string" || typeof plu !== "string") {
        return false;
    }
    
    return true;
};