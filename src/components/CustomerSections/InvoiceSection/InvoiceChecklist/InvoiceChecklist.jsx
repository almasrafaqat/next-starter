import { Chip } from "@mui/material";
export default function InvoiceChecklist({ checklistable }) {
  return (
    <Chip
      label={checklistable.checklist?.title || "Checklist"}
      color="info"
      size="small"
      sx={{ mr: 1 }}
    />
  );
}