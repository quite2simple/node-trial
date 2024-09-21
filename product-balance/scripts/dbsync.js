const sequelize = require("../db");

const Product = require("../modules/product/model");
const Balance = require("../modules/balance/model");

sequelize.sync({ force: true }).then(() => {
    console.log("Database sync done");
});