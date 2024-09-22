require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const actionRouter = require('./action.js');

const port = process.env.PORT || 5005;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hi, this is service 2!");
})

app.use("/action", actionRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
