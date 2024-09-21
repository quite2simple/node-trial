const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Product = require("../product/model");

const Balance = sequelize.define("Balance", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: DataTypes.INTEGER
    },
    shopId: {
        type: DataTypes.INTEGER
    },
    stored: {
        type: DataTypes.INTEGER
    },
    ordered: {
        type: DataTypes.INTEGER
    }
});

Balance.belongsTo(Product);

module.exports = Balance;