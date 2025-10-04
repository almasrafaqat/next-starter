import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function CustomerFields({ control, errors }) {
  return (
    <>
      <Controller
        name="customer_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Customer Name"
            fullWidth
            error={!!errors.customer_name}
            helperText={errors.customer_name?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="customer_email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Customer Email"
            fullWidth
            error={!!errors.customer_email}
            helperText={errors.customer_email?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      {/* Add more customer fields here */}
    </>
  );
}