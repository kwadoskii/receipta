const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User } = require("../models/user");

router.get("/", async (_, res) => {
  const users = await User.find().select("-password");
  res.send({
    status: "success",
    message: "All Users",
    data: users,
  });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send({ status: "error", message: "User not found" });

  res.status(200).send({ status: "success", message: "User details", data: user });
});

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ status: "error", message: "User already registered" });

  user = new User(
    _.pick(req.body, ["firstname", "lastname", "email", "password", "isAdmin"])
  );
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(201).send({
    status: "success",
    message: "User created successfully",
    data: _.pick(user, ["firstname", "lastname", "email"]),
  });
});

router.delete("/:id", async (req, res) => {
  const removedUser = await User.findOneAndDelete({ _id: req.params.id });

  res.status(202).send({
    status: "success",
    message: "User deleted successfully",
    data: _.pick(removedUser, ["firstname", "lastname", "email"]),
  });
});

module.exports = router;
