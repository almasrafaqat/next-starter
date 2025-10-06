import { Grid, TextField, Typography, MenuItem, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReuseableDropdown from "@/components/ui/ReuseableDropdown/ReuseableDropdown";

export default function InvoiceDiscountFields({ control, errors, watchedFields }) {
  return (
    <Box>
      <ReuseableDropdown
        title={"Apply Discounts"}
        startIcon={<CardGiftcardIcon />}
      >
        <>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Toggle per-item discounts and exclusions from invoice-level discounts.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="discount_type"
                control={control}
                defaultValue="none"
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Discount Type"
                    fullWidth
                  >
                    <MenuItem value="none">None</MenuItem>
                    <MenuItem value="percentage">Percentage (%)</MenuItem>
                    <MenuItem value="fixed">Fixed</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="discount_value"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount Value"
                    type="number"
                    fullWidth
                    disabled={watchedFields.discountType === "none"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="discount_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount Name"
                    fullWidth
                    disabled={watchedFields.discountType === "none"}
                  />
                )}
              />
            </Grid>
          </Grid>
        </>
      </ReuseableDropdown>
    </Box>
  );
}