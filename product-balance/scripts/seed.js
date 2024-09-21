const sequelize = require("../db");
const Product = require("../modules/product/model");
const Balance = require("../modules/balance/model");

const seed = async () => {
    for (let i = 0; i < 10; i++) {
        const product = await Product.create({
            name: `Product ${i}`,
            plu: `${i}`,
        });
        for (let j = 0; j < 3; j++) {
            await Balance.create({
                ProductId: product.id,
                shopId: j,
                stored: 4,
                ordered: 2
            });
        }
    }
    console.log("Database seeded");
};

seed();

