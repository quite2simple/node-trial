const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./modules/product/router.js");
const balanceRouter = require("./modules/balance/router.js");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/product", productRouter);
// app.use("/balance", balanceRouter);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})