require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://nodetrialuser:${process.env.DB_PASSWORD}@localhost:5432/nodetrialdb1`);

const Action = sequelize.define('Action', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    plu: {
        type: Sequelize.STRING
    },
    productId: {
        type: Sequelize.INTEGER
    },
    shopId: {
        type: Sequelize.INTEGER
    },
    action: {
        type: Sequelize.STRING
    },
    stored: {
        type: Sequelize.INTEGER
    },
    ordered: {
        type: Sequelize.INTEGER
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
},
{
    timestamps: false
});

module.exports = {sequelize, Action};