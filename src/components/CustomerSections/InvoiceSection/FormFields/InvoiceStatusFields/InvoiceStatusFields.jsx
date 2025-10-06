import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { Controller } from "react-hook-form";

export default function InvoiceStatusFields({
  control,
  errors,
  remainingBalance,
}) {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        bgcolor: "#f9f9f9",
        p: 2,
        borderRadius: 2,
        mt: 2,
      }}
    >
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Controller
            name="paid"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="success"
                  />
                }
                label={field.value ? "Invoice Paid" : "Invoice Unpaid"}
                sx={{ mr: 2 }}
              />
            )}
          />
          <Typography variant="caption" color="text.secondary">
            Toggle to mark invoice as paid or unpaid.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="amount_paid"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Amount Paid"
              type="number"
              fullWidth
              helperText="How much has been paid so far."
              error={!!errors.amount_paid}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="balance_due"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const isOverpaid = remainingBalance < 0;
            return (
              <TextField
                {...field}
                label="Remaining Balance"
                type="number"
                value={
                  isOverpaid
                    ? remainingBalance.toFixed(2)
                    : remainingBalance >= 0
                    ? remainingBalance.toFixed(2)
                    : "0.00"
                }
                fullWidth
                InputProps={{
                  readOnly: true,
                  sx: isOverpaid ? { color: "error.main" } : {},
                }}
                helperText={
                  isOverpaid
                    ? "Overpaid by this amount goes to customer credit. So later invoices can use it."
                    : "Grand total minus paid amount."
                }
                error={!!errors.balance_due || isOverpaid}
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
}
