const { DataTypes } = require("sequelize");
const sequelize = require("../../db");

const Balance = require("../balance/model");

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plu: {
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    }
});

Product.hasMany(Balance, { foreignKey: "productId" });

module.exports = Product;