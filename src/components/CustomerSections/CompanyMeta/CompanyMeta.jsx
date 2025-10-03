import { Typography, Box } from "@mui/material";

export default function CompanyMeta({ meta }) {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="subtitle2">{meta.meta_key}</Typography>
      {meta.meta_value && (
        <Typography variant="body2" color="text.secondary">
          {meta.meta_value}
        </Typography>
      )}
    </Box>
  );
}