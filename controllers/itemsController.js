const { client } = require("../config/db");
const { ObjectId } = require("mongodb");

const getItems = async (req, res) => {
  let db = await client.db("courses");
  const items = await db.collection("items").find().toArray();
  res.send(items);
};

const createItem = async (req, res) => {
  let db = await client.db("courses");
  const result = await db
    .collection("items")
    .insertOne({ name: req.body.name });
  res.send(result);
};

const deleteItem = async (req, res) => {
  let db = await client.db("courses");
  const result = await db
    .collection("items")
    .deleteOne({ _id: new ObjectId(req.body.id) });
  res.send(result);
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
