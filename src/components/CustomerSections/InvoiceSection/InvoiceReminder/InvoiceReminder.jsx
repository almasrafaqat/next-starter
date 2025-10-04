import { Typography, Box } from "@mui/material";
export default function InvoiceReminder({ reminder }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="body2" fontWeight={500}>
        {reminder.message}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {reminder.schedule_date} ({reminder.timezone})
      </Typography>
    </Box>
  );
}