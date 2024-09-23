const sequelize = require('./db.js').sequelize;
const Action = require('./db.js').Action;

sequelize.sync({ force: true }).then(() => {
    console.log("Database sync done");
});