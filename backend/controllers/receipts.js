const express = require("express");
const router = express.Router();
const _ = require("lodash");
const cryptoRandomString = require("crypto-random-string");
const receiptTemplate = require("../report/receipt");
const Pupperteer = require("puppeteer");

const { Receipt } = require("../models/receipt");
const { Organisation } = require("../models/organisation");

router.get("/", async (_, res) => {
  const receipts = await Receipt.find()
    .sort({ purchaseDate: "desc" })
    .populate("issuer", ["firstname", "lastname", "username"]);
  res.status(200).send({ status: "success", message: "All receipts", data: receipts });
});

router.post("/", async (req, res) => {
  const receiptNumber = cryptoRandomString({ length: 16, type: "numeric" });
  let [org] = await Organisation.find();

  // let receipt = Receipt.findOne({ receiptNumber }); check for uniqueness
  const receipt = new Receipt(
    _.pick(req.body, ["customerName", "phone", "address", "items", "issuer"])
  );

  receipt.receiptNumber = receiptNumber;
  await receipt.save();

  try {
    const browser = await Pupperteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(receiptTemplate(org, receipt), { waitUntil: "networkidle0" });

    const buffer = await page.pdf({
      format: "a4",
      displayHeaderFooter: true,
      printBackground: true,
    });

    await browser.close();

    res.status(200).send(buffer);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pdf/:receiptNumber", async (req, res) => {
  const receipt = await Receipt.findOne({ receiptNumber: req.params.receiptNumber });

  if (!receipt) res.send({ status: "error", message: "receipt number not found" });

  let [org] = await Organisation.find();

  try {
    const browser = await Pupperteer.launch();
    const page = await browser.newPage();
    const htmlTemplate = await receiptTemplate(org, receipt);

    await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });

    const buffer = await page.pdf({
      format: "a4",
      displayHeaderFooter: true,
      printBackground: true,
    });

    await browser.close();

    res.status(200).send(buffer);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:receiptNumber", async (req, res) => {
  let receipt = await Receipt.findOne({ receiptNumber: req.params.receiptNumber });

  if (!receipt) return res.status(404).send({ status: "error", message: "Receipt not found" });

  await Receipt.findByIdAndDelete(receipt._id);

  res
    .status(202)
    .send({ status: "success", message: "Receipt deleted successfully", data: receipt });
});

module.exports = router;
