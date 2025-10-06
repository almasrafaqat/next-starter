import { Grid, TextField, Typography, MenuItem, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReuseableDropdown from "@/components/ui/ReuseableDropdown/ReuseableDropdown";

export default function InvoiceTaxFields({ control, errors, watchedFields, taxAmount }) {
  return (
    <Box>
      <ReuseableDropdown title={"Add Tax"} startIcon={<ReceiptLongIcon />}>
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Set invoice-level tax type and value.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="tax_type"
                control={control}
                defaultValue="none"
                render={({ field }) => (
                  <TextField {...field} select label="Tax Type" fullWidth>
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="percentage">Percentage (%)</MenuItem>
                    <MenuItem value="fixed">Fixed</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="tax_value"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tax Value"
                    type="number"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mt: 2 }}>
                Tax Amount: {taxAmount.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </>
      </ReuseableDropdown>
    </Box>
  );
}