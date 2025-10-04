import { Controller } from "react-hook-form";
import { TextField, MenuItem } from "@mui/material";

export default function DiscountFields({ control, errors }) {
  return (
    <>
      <Controller
        name="discount_type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Discount Type"
            fullWidth
            error={!!errors.discount_type}
            helperText={errors.discount_type?.message}
            sx={{ mb: 2 }}
          >
            <MenuItem value="percentage">Percentage</MenuItem>
            <MenuItem value="fixed">Fixed</MenuItem>
          </TextField>
        )}
      />
      <Controller
        name="discount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Discount Value"
            type="number"
            fullWidth
            error={!!errors.discount}
            helperText={errors.discount?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      {/* Add more discount fields here */}
    </>
  );
}