import { Grid, TextField, Typography } from "@mui/material";
import { Controller, useFieldArray } from "react-hook-form";

export default function CustomerFields({ control, errors, balance_due }) {
  const { fields } = useFieldArray({
    control,
    name: "customers",
  });

  const customer = fields[0] || {};

  // Style for input placeholder
  const inputProps = {
    style: { fontSize: "0.95rem" },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Controller
          name={`customers.0.name`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Customer Name"
              placeholder="Full name"
              fullWidth
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Used as recipient name when sending invoice email.
                </span>
              }
              error={!!errors?.customers?.[0]?.name}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controller
          name={`customers.0.email`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Customer Email"
              placeholder="customer@email.com"
              fullWidth
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Used for sending invoice and notifications.
                </span>
              }
              error={!!errors?.customers?.[0]?.email}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controller
          name={`customers.0.company`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Company"
              placeholder="Company name (optional)"
              fullWidth
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Optional. Used for business invoices.
                </span>
              }
              error={!!errors?.customers?.[0]?.company}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controller
          name={`customers.0.phone`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="WhatsApp/Phone"
              placeholder="Phone or WhatsApp (optional)"
              fullWidth
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Optional. Used for SMS/WhatsApp notifications.
                </span>
              }
              error={!!errors?.customers?.[0]?.phone}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, ml: 0.5, fontSize: "0.75rem" }}
        >
          Format: +923157991234
        </Typography>
      </Grid>
      <Grid item xs={12} sm={122}>
        <Controller
          name={`customers.0.address`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              placeholder="Shipping/Billing address"
              fullWidth
              multiline
              rows={2}
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Optional. Used for shipping or billing.
                </span>
              }
              error={!!errors?.customers?.[0]?.address}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, ml: 0.5, fontSize: "0.75rem" }}
        >
          Example: 1915 Dalton Hwy , Deadhorse City, Alaska 99708, United States
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controller
          name={`customers.0.cc`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="CC"
              placeholder="CC email (optional)"
              fullWidth
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Optional. Additional recipients for invoice email.
                </span>
              }
              error={!!errors?.customers?.[0]?.cc}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controller
          name={`customers.0.bcc`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="BCC"
              placeholder="BCC email (optional)"
              fullWidth
              helperText={
                <span style={{ fontSize: "0.8rem" }}>
                  Optional. Hidden recipients for invoice email.
                </span>
              }
              error={!!errors?.customers?.[0]?.bcc}
              inputProps={inputProps}
              sx={{ "& .MuiFormHelperText-root": { fontSize: "0.8rem" } }}
            />
          )}
        />
      </Grid>
      {balance_due < 0 && (
        <Grid item xs={12} sm={12}>
          <Controller
            name={`customers.0.credit_balance`}
            control={control}
            defaultValue={Math.abs(balance_due).toFixed(2)}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer Credit Balance"
                type="number"
                fullWidth
                InputProps={{ readOnly: true }}
                helperText="This amount will be credited to the customer for future invoices."
              />
            )}
          />
        </Grid>
      )}
    </Grid>
  );
}
