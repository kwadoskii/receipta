const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Organisation } = require("../models/organisation");

router.get("/", async (_, res) => {
  const organisation = await Organisation.find();
  res
    .status(200)
    .send({ status: "success", message: "Organisation details", data: organisation });
});

router.post("/", async (req, res) => {
  let org = await Organisation.find();
  if (!org.length) {
    org = new Organisation(
      _.pick(req.body, [
        "name",
        "address",
        "phone",
        "motto",
        "rcNumber",
        "logo",
        "website",
        "email",
      ])
    );

    await org.save();

    return res
      .status(201)
      .send({ status: "success", message: "Organisation Created", data: org });
  }

  org = org[0];
  const updatedOrg = await Organisation.findByIdAndUpdate(
    org._id,
    _.pick(req.body, [
      "name",
      "address",
      "phone",
      "motto",
      "rcNumber",
      "logo",
      "website",
      "email",
    ]),
    { new: true }
  );

  res
    .status(202)
    .send({
      status: "success",
      message: "Organisation details updated",
      data: updatedOrg,
    });
});

module.exports = router;
