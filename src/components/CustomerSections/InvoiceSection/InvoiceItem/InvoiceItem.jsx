import { Typography, Box } from "@mui/material";
export default function InvoiceItem({ item }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle2">{item.name}</Typography>
      <Typography variant="body2" color="text.secondary">{item.description}</Typography>
      <Typography variant="body2" fontWeight={600}>${item.price}</Typography>
    </Box>
  );
}