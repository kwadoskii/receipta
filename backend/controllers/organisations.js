const express = require("express");
const router = express.Router();
const _ = require("lodash");
const multer = require("multer");

const { Organisation } = require("../models/organisation");

router.get("/", async (_, res) => {
  const organisation = await Organisation.findOne();
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

  res.status(202).send({
    status: "success",
    message: "Organisation details updated",
    data: updatedOrg,
  });
});

//upload middleware
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
  fileFilter(_, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});

router.post("/logo", upload.single("logo"), async (req, res) => {
  let org = await Organisation.find();
  if (!org.length)
    res.status(404).send({ status: "error", message: "Organisation details not found" });

  try {
    org = org[0];
    org.logo = req.file.buffer;
    org.save();

    res
      .status(201)
      .send({ status: "success", message: "Logo saved successfully", data: org.logo });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/logo", async (_, res) => {
  let org = await Organisation.find();

  if (!org.length)
    res.status(404).send({ status: "error", message: "Organisation details not found" });

  res.set("Content-Type", "image/png");
  res.status(200).send({ logo: org[0].logo });
});

module.exports = router;
