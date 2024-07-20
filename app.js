const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const itemsRouter = require("./routes/items");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/items", itemsRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
