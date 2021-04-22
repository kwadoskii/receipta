module.exports = (amount, sign = false) =>
  `${sign ? "₦" : ""} ${parseFloat(amount).toLocaleString("en", {
    minimumFractionDigits: 2,
  })}`;
