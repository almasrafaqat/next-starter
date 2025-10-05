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
      <Controller
        name="cc"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Send CC To"
            fullWidth
            error={!!errors.cc}
            helperText={errors.cc?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="bcc"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Include BCC"
            fullWidth
            error={!!errors.bcc}
            helperText={errors.bcc?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            fullWidth
            error={!!errors.address}
            helperText={errors.address?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      {/* Add more customer fields here */}
    </>
  );
}
