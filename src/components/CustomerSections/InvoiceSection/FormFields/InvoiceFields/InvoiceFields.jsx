import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Divider,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function InvoiceFields({ control, errors }) {
  // Items array managed by react-hook-form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Helper functions for calculations
  const getItemSubtotal = (item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    let subtotal = qty * price;

    // Per-item discount
    if (item.itemHasDiscount && item.itemDiscountType !== "none") {
      const val = Number(item.itemDiscountValue) || 0;
      if (item.itemDiscountType === "percentage") {
        subtotal -= (subtotal * val) / 100;
      } else if (item.itemDiscountType === "fixed") {
        subtotal -= val;
      }
    }
    // Invoice-level discount (if not excluded and no per-item discount)
    else if (!item.excludeFromInvoiceDiscount && item.discountType !== "none") {
      const val = Number(item.discountValue) || 0;
      if (item.discountType === "percentage") {
        subtotal -= (subtotal * val) / 100;
      } else if (item.discountType === "fixed") {
        subtotal -= val;
      }
    }
    return subtotal > 0 ? subtotal : 0;
  };

  // Get all form values for calculations
  // You can use useWatch or getValues from react-hook-form if needed

  return (
    <>
      {/* Basic Info Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Basic Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Invoice Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="invoice_number"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Invoice Number"
                    fullWidth
                    error={!!errors.invoice_number}
                    helperText={errors.invoice_number?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="date"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Invoice Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Items Section */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Items</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {fields.map((item, idx) => (
            <Box
              key={item.id}
              sx={{ mb: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={3}>
                  <Controller
                    name={`items.${idx}.title`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Item Title"
                        fullWidth
                        helperText="Enter the name of the product or service."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Controller
                    name={`items.${idx}.description`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        helperText="Describe the item (optional)."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Controller
                    name={`items.${idx}.qty`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Qty"
                        type="number"
                        fullWidth
                        helperText="Quantity of this item."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} sm={3} md={2}>
                  <Controller
                    name={`items.${idx}.price`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        type="number"
                        fullWidth
                        helperText="Unit price for this item."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Chip
                    label={`Subtotal: ${getItemSubtotal(item).toFixed(2)}`}
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => remove(idx)}
                    sx={{ minWidth: 0, px: 1 }}
                    title="Remove Item"
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2">
                      Exclude from invoice discount
                    </Typography>
                    <Controller
                      name={`items.${idx}.excludeFromInvoiceDiscount`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <Typography variant="body2">
                      Apply discount to this item
                    </Typography>
                    <Controller
                      name={`items.${idx}.itemHasDiscount`}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </Box>
                  {item.itemHasDiscount && (
                    <Box sx={{ mt: 1 }}>
                      <Controller
                        name={`items.${idx}.itemDiscountType`}
                        control={control}
                        defaultValue="none"
                        render={({ field }) => (
                          <TextField
                            {...field}
                            select
                            label="Item Discount Type"
                            fullWidth
                            size="small"
                          >
                            <MenuItem value="none">None</MenuItem>
                            <MenuItem value="percentage">Percentage (%)</MenuItem>
                            <MenuItem value="fixed">Fixed</MenuItem>
                          </TextField>
                        )}
                      />
                      <Controller
                        name={`items.${idx}.itemDiscountValue`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Item Discount Value"
                            type="number"
                            fullWidth
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() =>
              append({
                title: "",
                description: "",
                qty: "",
                price: "",
                excludeFromInvoiceDiscount: false,
                itemHasDiscount: false,
                itemDiscountType: "none",
                itemDiscountValue: "",
              })
            }
            sx={{ mt: 2 }}
          >
            Add Item
          </Button>
          <Divider sx={{ my: 2 }} />
          {/* Items Summary */}
          <Box>
            <Typography variant="subtitle2">Items Summary</Typography>
            {/* You can calculate subtotal using getValues or useWatch */}
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Discount Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Discount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="discountType"
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
            <Grid item xs={12} sm={4}>
              <Controller
                name="discountValue"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount Value"
                    type="number"
                    fullWidth
                    disabled={field.value === "none"}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="discountName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Discount Name"
                    fullWidth
                    disabled={field.value === "none"}
                  />
                )}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Tax Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Tax</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="taxType"
                control={control}
                defaultValue="percentage"
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Tax Type"
                    fullWidth
                  >
                    <MenuItem value="percentage">Percentage (%)</MenuItem>
                    <MenuItem value="fixed">Fixed</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="taxValue"
                control={control}
                defaultValue=""
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
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Payment Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Payment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="paid"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <TextField
                    select
                    label="Paid?"
                    value={field.value ? "yes" : "no"}
                    onChange={(e) => field.onChange(e.target.value === "yes")}
                    fullWidth
                  >
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="yes">Yes</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="paidAmount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Paid Amount"
                    type="number"
                    fullWidth
                    disabled={!field.value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* Remaining balance can be calculated in parent on submit */}
              <TextField
                label="Remaining Balance"
                type="number"
                fullWidth
                InputProps={{ readOnly: true }}
                // value={...calculate from form values}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Notes Section */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1">Notes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Controller
            name="notes"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Notes"
                multiline
                rows={3}
                fullWidth
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
