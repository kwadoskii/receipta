const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid username or password" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ status: "error", message: "Invalid username or password" });

    const token = user.generateAuthToken();
    res.send(token);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
