import { Typography, Box } from "@mui/material";
export default function InvoiceCharity({ charity }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" fontWeight={500}>
        Charity: {charity.cause_name}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Value: {charity.value}%
      </Typography>
    </Box>
  );
}