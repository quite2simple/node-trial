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