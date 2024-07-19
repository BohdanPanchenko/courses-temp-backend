const { MongoClient, ServerApiVersion } = require("mongodb");

const express = require("express");
const app = express();
const port = 3000;

const uri =
  "mongodb+srv://bohdan27:den4ikfit4life@cluster0.enqekcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("courses").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    // finally {
    //    Ensures that the client will close when you finish/error
    //   await client.close();
    // }
    console.error("Error connecting to MongoDB", err);
  }
}
run().catch(console.dir);

app.use(express.json());

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
// app.delete("/items", async (req, res) => {
//   // const newItem = new Item({
//   //   name: req.body.name,
//   // });
//   let db = await client.db("courses");
//   const items = await db.collection("items").deleteOne({
//     _id: new objectId(req.body.id),
//   });
//   res.send(items);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
module.exports = app;
