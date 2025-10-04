import { Chip } from "@mui/material";
export default function InvoiceDiscount({ discount }) {
  return (
    <Chip
      label={`${discount.discount_type}: ${discount.discount}${discount.discount_type === "percentage" ? "%" : ""}`}
      color="success"
      size="small"
      sx={{ mr: 1 }}
    />
  );
}