// all regular mongodb driver code
const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://user:user@test-cluster.992wj.mongodb.net/testDB?retryWrites=true&w=majority";

async function createDog(req, res, next) {
  const newDog = {
    name: req.body.name,
    age: req.body.age,
  };
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("dogs").insertOne(newDog);
  } catch (err) {
    console.log(err);
    return res.json({ error: "Could not store data" });
  }
  client.close();
  res.json(newDog);
}

async function getDog(req, res, next) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let data;
  try {
    await client.connect();
    const db = client.db();
    data = await db.collection("dogs").find().toArray();
  } catch (err) {
    console.log(err);
    return res.json({ error: "Could not get dogs data" });
  }
  client.close();
  res.json(data);
}

module.exports.Create = createDog;
module.exports.Get = getDog;

// mongoose code
const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dragonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const DragonModel = new mongoose.model("Dragon", dragonSchema);

module.exports.Dragon = DragonModel;
