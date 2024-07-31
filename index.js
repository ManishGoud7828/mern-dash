const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
mongoose.set('strictQuery', true);
const Products = require("./model/Productmodel");
const router = require("./routers/ProductRouters");


dotenv.config();

// set up server

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
  })
);


app.use('/images', express.static('images'));







// connect to mongoDB




mongoose.connect( process.env.MDB_CONNECT )
  .then((response) => {
    console.log("DataBase is Connected Successfully--!");
  })
  .catch((err) => {
    console.log(err);
  });

// set up routes

app.use("/auth", require("./routers/UserRouters"));
app.use("/product", require("./routers/ProductRouters"));

