import React, { useEffect } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Divider,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ReuseableDropdown from "@/components/ui/ReuseableDropdown/ReuseableDropdown";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import InvoiceFormatPrice from "@/components/FormatPrice/InvoiceFormatPrice";
import ItemDiscountDisplay from "../../ItemDiscountDisplay/ItemDiscountDisplay";

export default function ItemFields({
  control,
  setValue,
  errors,
  watchedFields,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const watchedItems = useWatch({ control, name: "items" }) || [];

  // Calculate subtotal per item
  const getItemSubtotal = (item) => {
    const qty = Number(item.quantity) || 0;
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
      return subtotal > 0 ? subtotal : 0;
    }
    // Invoice-level discount (if not excluded and no per-item discount)
    else if (
      !item.excludeFromInvoiceDiscount &&
      watchedFields.discount_type !== "none"
    ) {
      const val = Number(watchedFields.discount_value) || 0;
      if (watchedFields.discount_type === "percentage") {
        subtotal -= (subtotal * val) / 100;
      } else if (watchedFields.discount_type === "fixed") {
        subtotal -= val;
      }
    }
    return subtotal > 0 ? subtotal : 0;
  };

  // Calculate subtotal for all items
  const itemsSubtotal = watchedItems.reduce(
    (sum, item) => sum + getItemSubtotal(item),
    0
  );

  useEffect(() => {
    watchedItems.forEach((item, idx) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const subtotal = qty * price;
      let discountAmount = 0;

      if (item.itemHasDiscount && item.itemDiscountType !== "none") {
        const val = Number(item.itemDiscountValue) || 0;
        if (item.itemDiscountType === "percentage") {
          discountAmount = (subtotal * val) / 100;
        } else if (item.itemDiscountType === "fixed") {
          discountAmount = val;
        }
        discountAmount = discountAmount > 0 ? discountAmount : 0;
      } else if (
        !item.excludeFromInvoiceDiscount &&
        watchedFields.discount_type !== "none"
      ) {
        const val = Number(watchedFields.discount_value) || 0;
        if (watchedFields.discount_type === "percentage") {
          discountAmount = (subtotal * val) / 100;
        } else if (watchedFields.discount_type === "fixed") {
          discountAmount = val;
        }
        discountAmount = discountAmount > 0 ? discountAmount : 0;
      }

      // Only update if value changed
      if (item.subtotal !== subtotal) {
        setValue(`items.${idx}.subtotal`, subtotal, { shouldDirty: false });
      }
      if (item.discount_amount !== discountAmount) {
        setValue(`items.${idx}.discount_amount`, discountAmount, {
          shouldDirty: false,
        });
      }
    });
  }, [watchedItems, watchedFields, setValue]);

  return (
    <Box>
      <Grid container spacing={2}>
        {fields.map((field, idx) => {
          const item = watchedItems[idx] || field;
          const qty = Number(item.quantity) || 0;
          const price = Number(item.price) || 0;
          const subtotal = qty * price;
          let discountAmount = 0;

          // Calculate discountAmount
          if (item.itemHasDiscount && item.itemDiscountType !== "none") {
            const val = Number(item.itemDiscountValue) || 0;
            if (item.itemDiscountType === "percentage") {
              discountAmount = (subtotal * val) / 100;
            } else if (item.itemDiscountType === "fixed") {
              discountAmount = val;
            }
            discountAmount = discountAmount > 0 ? discountAmount : 0;
          } else if (
            !item.excludeFromInvoiceDiscount &&
            watchedFields.discount_type !== "none"
          ) {
            const val = Number(watchedFields.discount_value) || 0;
            if (watchedFields.discount_type === "percentage") {
              discountAmount = (subtotal * val) / 100;
            } else if (watchedFields.discount_type === "fixed") {
              discountAmount = val;
            }
            discountAmount = discountAmount > 0 ? discountAmount : 0;
          }
          return (
            <Grid item xs={12} key={idx}>
              <Box
                sx={{
                  mb: 2,
                  p: { xs: 1, sm: 2 },
                  border: "1px solid #eee",
                  borderRadius: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
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
                  <Grid item xs={12} sm={6} md={4}>
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
                  <Grid item xs={6} sm={6} md={2}>
                    <Controller
                      name={`items.${idx}.quantity`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Quantity"
                          type="number"
                          fullWidth
                          helperText="Quantity of this item."
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={2}>
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

                    {/* Hidden fields for subtotal and discount_amount */}
                    <Controller
                      name={`items.${idx}.subtotal`}
                      control={control}
                      defaultValue={subtotal}
                      render={({ field }) => (
                        <input type="hidden" {...field} value={subtotal} />
                      )}
                    />
                    <Controller
                      name={`items.${idx}.discount_amount`}
                      control={control}
                      defaultValue={discountAmount}
                      render={({ field }) => (
                        <input
                          type="hidden"
                          {...field}
                          value={discountAmount}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={2}
                    md={1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", md: "center" },
                    }}
                  >
                    <Chip
                      label={
                        <InvoiceFormatPrice
                          price={getItemSubtotal(item)}
                          currency={watchedFields.currency || "USD"}
                        />
                      }
                      sx={{
                        bgcolor: "secondary.main",
                        color: "primary.white",
                        borderRadius: 2,
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={2}
                    md={1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "flex-start", md: "center" },
                    }}
                  >
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => remove(idx)}
                      sx={{
                        minWidth: 0,
                        px: 1,
                        borderRadius: 2,
                        bgcolor: "error.light",
                        "&:hover": { bgcolor: "error.main", color: "#fff" },
                      }}
                      title="Remove Item"
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <ReuseableDropdown
                      title="Discount"
                      startIcon={<CardGiftcardIcon />}
                    >
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Control how discounts apply to this item.
                      </Typography>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                          }}
                        >
                          <Typography variant="body2" fontWeight={500}>
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
                                onChange={(e) => {
                                  field.onChange(e.target.checked);
                                  if (e.target.checked) {
                                    setValue(
                                      `items.${idx}.itemHasDiscount`,
                                      false
                                    );
                                  }
                                }}
                              />
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2" fontWeight={500}>
                            Custom item discount
                          </Typography>
                          <Controller
                            name={`items.${idx}.itemHasDiscount`}
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => {
                                  field.onChange(e.target.checked);
                                  if (e.target.checked) {
                                    setValue(
                                      `items.${idx}.excludeFromInvoiceDiscount`,
                                      false
                                    );
                                  }
                                }}
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
                                  <MenuItem value="percentage">
                                    Percentage (%)
                                  </MenuItem>
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
                    </ReuseableDropdown>
                  </Grid>
                  <Grid item xs={12}>
                    <ItemDiscountDisplay
                      key={idx}
                      item={{
                        ...item,
                        invoiceDiscountType: item.discountType,
                        invoiceDiscountValue: item.discountValue,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() =>
          append({
            title: "",
            description: "",
            quantity: "",
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
        <Typography>
          Subtotal:{" "}
          <InvoiceFormatPrice
            price={itemsSubtotal}
            currency={watchedFields.currency || "USD"}
          />
        </Typography>
      </Box>
    </Box>
  );
}
