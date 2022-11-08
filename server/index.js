const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({storage:storage})

const ProductModel = require("./ProductModel");

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));

const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/test", async (req, res) => {
  res.json({ message: "Server working " });
});

app.get("/product", async (req, res) => {
  const data = await ProductModel.find();
  if (data && data.length >= 0) {
    res.json({ data });
  } else {
    res.json({ message: "Something went wrong with database connection" });
  }
});

app.delete("/product", async (req, res) => {
  console.log(req.body);
  ProductModel.deleteMany({ _id: req.body.id }, (err, result) => {
    if (err) {
      res.status(200).json({ message: err.message });
    } else {
      res.json({ message: "Record deleted successfully" });
    }
  });
});

app.post("/product",upload.single('image'), async (req, res) => {
  console.log(req.file);
  console.log(req.data);
  const product = new ProductModel({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.file.filename,
  });
  const saveResult = await product.save();
  console.log(saveResult);
  if (saveResult) {
    res.json({ saveResult });
  } else {
    res.json({ message: "Something went wrong with database connection" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
