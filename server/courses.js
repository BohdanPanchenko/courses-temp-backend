const { app } = require("../index");

app.get("/items", async (req, res) => {
  let db = await client.db("courses");
  const items = await db.collection("items").find().toArray();
  res.send(items);
});

app.post("/items", async (req, res) => {
  // const newItem = new Item({
  //   name: req.body.name,
  // });

  let db = await client.db("courses");
  const items = await db.collection("items").insertOne({
    name: req.body.name,
  });
  res.send(items);
});
app.delete("/items", async (req, res) => {
  // const newItem = new Item({
  //   name: req.body.name,
  // });
  let db = await client.db("courses");
  const items = await db.collection("items").deleteOne({
    _id: new ObjectId(req.body.id),
  });
  res.send(items);
});
