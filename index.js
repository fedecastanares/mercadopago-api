console.log("Levantando server");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("El servidor esta corriendo");
});

app.get("/categories/:id", require("./controllers/categories/getCategories"));

app.get("/products/:categoryId", require("./controllers/products/getProducts"));

app.post("/buy", require("./controllers/products/buy"));

app.post("/notificaciones", require("./controllers/notificaciones"));

app.listen(port, "0.0.0.0", () =>
  console.log(`;) Servidor corriendo en el puerto: ${port}`)
);
