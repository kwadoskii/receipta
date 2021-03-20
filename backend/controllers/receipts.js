const express = require("express");
const router = express.Router();
const _ = require("lodash");
const cryptoRandomString = require("crypto-random-string");
const receiptTemplate = require("../report/receipt");
const pdf = require("html-pdf");
const Pupperteer = require("puppeteer");

const { Receipt } = require("../models/receipt");
const { Organisation } = require("../models/organisation");

router.get("/", async (_, res) => {
  const receipts = await Receipt.find().sort({ purchaseDate: "desc" });
  res.status(200).send({ status: "success", message: "All receipts", data: receipts });
});

router.post("/", async (req, res) => {
  const receiptNumber = cryptoRandomString({ length: 16, type: "numeric" });
  let [org] = await Organisation.find();

  // let receipt = Receipt.findOne({ receiptNumber }); check for uniqueness
  const receipt = new Receipt(
    _.pick(req.body, ["customerName", "phone", "address", "items"])
  );

  receipt.receiptNumber = receiptNumber;
  await receipt.save();

  // await pdf
  //   .create(receiptTemplate(org, receipt), { format: "A4" })
  //   .toFile(`./docs/${receiptNumber}.pdf`, (err, resultUrl) => {
  //     if (err) return res.send(Promise.reject());

  //     // return res.send(Promise.resolve());

  //     res.status(201).send({
  //       status: "success",
  //       message: "Receipt created successfully",
  //       data: receipt,
  //     });
  //   });

  const browser = await Pupperteer.launch();
  const page = await browser.newPage();
  // await page.goto("data:text/html;charset=UTF-8," + receiptTemplate(org, receipt), {
  //   waitUntil: "networkidle2",
  // });
  await page.setContent(receiptTemplate(org, receipt), { waitUntil: "networkidle0" });
  // await page.to(`text/html://${receiptTemplate(org, receipt)}`);

  await page.pdf({
    path: `./docs/${receiptNumber}.pdf`,
    format: "a4",
    displayHeaderFooter: true,
    printBackground: true,
  });

  await browser.close();

  res.status(201).send({
    status: "success",
    message: "Receipt created successfully",
    data: receipt,
  });
});

router.get("/pdf/:receiptNumber", (req, res) => {
  res.sendFile(`${req.params.receiptNumber}.pdf`, { root: "./docs" });
});

router.delete("/:receiptNumber", async (req, res) => {
  let receipt = await Receipt.findOne({ receiptNumber: req.params.receiptNumber });

  if (!receipt)
    return res.status(404).send({ status: "error", message: "Receipt not found" });

  await Receipt.findByIdAndDelete(receipt._id);

  res
    .status(202)
    .send({ status: "success", message: "Receipt deleted successfully", data: receipt });
});

module.exports = router;
