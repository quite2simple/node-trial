require("dotenv").config();

module.exports = {
    port: process.env.PORT || 5000,
    dbConnection: `postgres://nodetrialuser:${process.env.DB_PASSWORD}@localhost:5432/nodetrialdb1`
};