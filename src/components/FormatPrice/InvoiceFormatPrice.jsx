import React from "react";

const InvoiceFormatPrice = ({ price, currency = "USD" }) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};




export default InvoiceFormatPrice;