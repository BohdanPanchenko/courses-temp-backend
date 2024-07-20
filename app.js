const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const itemsRouter = require("./routes/items");

app.use(express.json());
app.use("/items", itemsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
