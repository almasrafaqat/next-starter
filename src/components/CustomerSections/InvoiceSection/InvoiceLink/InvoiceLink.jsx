import { Chip } from "@mui/material";
export default function InvoiceLink({ link }) {
  return (
    <Chip
      label={link.link}
      color={link.is_active ? "primary" : "default"}
      size="small"
      sx={{ mr: 1 }}
      clickable
      component="a"
      href={link.link}
      target="_blank"
    />
  );
}