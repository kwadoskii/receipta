require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//constants
const app = express();
const port = process.env.PORT || 7000;
const db = process.env.DB_URI;

mongoose
  .connect(db, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${db}`))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// controllers
const user = require("./controllers/users");
const auth = require("./controllers/auth");
const organisation = require("./controllers/organisations");
const receipt = require("./controllers/receipts");

// routes
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use("/api/organisations", organisation);
app.use("/api/receipts", receipt);

app.listen(port, () => console.log(`app running on port ${port}`));
