exports.validCreateProduct = (name, plu) => {

    if (!name || !plu) {
        return false;
    }

    if (typeof name !== "string" || typeof plu !== "string") {
        return false;
    }

    return true;
};

exports.validFilters = (filters) => {
    if (!filters) {
        return false;
    }

    const {name, plu} = filters;

    if (!name && !plu) {
        return false;
    }

    if ((name && typeof name !== "string") || (plu && typeof plu !== "string")) {
        return false;
    }
    
    return true;
}