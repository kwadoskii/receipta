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
  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user)
    return res.status(400).send({ status: "error", message: "User already registered" });

  user = new User(
    _.pick(req.body, [
      "firstname",
      "lastname",
      "username",
      "email",
      "password",
      "isAdmin",
    ])
  );

  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(201).send({
    status: "success",
    message: "User created successfully",
    data: _.pick(user, ["_id", "firstname", "lastname", "email", "username"]),
  });
});

router.patch("/", async (req, res) => {
  let user = await User.findOne({ _id: req.body._id });

  if (!user) return res.status(404).send({ status: "error", message: "User not found." });

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.body._id },
    _.pick(req.body, ["firstname", "lastname", "username", "email", "isAdmin"]),
    { new: true }
  );

  res.status(202).send({
    status: "success",
    message: "User details updated",
    data: updatedUser,
  });
});

//change password
router.post("/changepassword", async (req, res) => {
  let user = await User.findOne({ _id: req.body.userId });

  if (!user) return res.status(404).send({ status: "error", message: "User not found." });

  const correctPassword = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!correctPassword)
    return res
      .status(404)
      .send({ status: "error", message: "Current password is incorrect" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

  await User.findOneAndUpdate({ _id: req.body.userId }, { password: hashPassword });

  res.status(200).send({
    status: "success",
    message: "Password changed successfully",
  });
});

router.delete("/:id", async (req, res) => {
  const removedUser = await User.findOneAndDelete({ _id: req.params.id });

  res.status(202).send({
    status: "success",
    message: "User deleted successfully",
    data: _.pick(removedUser, ["firstname", "lastname", "email", "username"]),
  });
});

module.exports = router;
