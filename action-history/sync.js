const sequelize = require('./db.js');
const Action = require('./db.js').Action;

sequelize.sync({ force: true }).then(() => {
    console.log("Database sync done");
});