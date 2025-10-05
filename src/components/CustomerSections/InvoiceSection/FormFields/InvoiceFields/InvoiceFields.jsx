import React, { useState } from "react";
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
  InputAdornment,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ReusableAccordion from "@/components/ui/ReusableAccordion/ReusableAccordion";
import ReuseableDropdown from "@/components/ui/ReuseableDropdown/ReuseableDropdown";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Add } from "@mui/icons-material";
import CustomTypography from "@/components/Typography/CustomTypography";
import { icons } from "@/config/routeIcons";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import CustomerFields from "../CustomerFields/CustomerFields";
import { CgMathMinus } from "react-icons/cg";
import PriceText from "@/components/ui/PriceText/PriceText";

export default function InvoiceFields({ control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const { isSmallScreen, isRtl } = useResponsiveDevice();
  // Items state
  const [items, setItems] = useState([
    { title: "", description: "", qty: "", price: "" },
  ]);
  // Invoice-level discount
  // const [discountType, setDiscountType] = useState("none");
  // const [discountValue, setDiscountValue] = useState("");
  // Tax
  // const [taxType, setTaxType] = useState("percentage");
  // const [taxValue, setTaxValue] = useState("");
  // Paid fields
  const [paid, setPaid] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Inside your component:
  const watchedFields = useWatch({ control });

  console.log("Watched Fields:", watchedFields);

  //Customer
  const [addCustomer, setAddCustomer] = useState(false);

  const trans = useTranslations("translations");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const watchedItems = watchedFields.items || [];
  // Use watched values for discount/tax
  const discountType = watchedFields.discount_type || "none";
  const discountValue = watchedFields.discount_value || 0;

  // Calculate subtotal per item
  const getItemSubtotal = (item) => {
    // console.log("Calculating subtotal for item:", item);
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
    }
    // Invoice-level discount (if not excluded and no per-item discount)
    else if (!item.excludeFromInvoiceDiscount && discountType !== "none") {
      const val = Number(discountValue) || 0;
      if (discountType === "percentage") {
        subtotal -= (subtotal * val) / 100;
      } else if (discountType === "fixed") {
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

  // Apply invoice-level discount
  let discountedSubtotal = itemsSubtotal;
  const discountNum = Number(discountValue) || 0;
  const discountApplied =
    discountType === "percentage"
      ? (itemsSubtotal * discountNum) / 100
      : discountType === "fixed"
      ? discountNum
      : 0;
  discountedSubtotal -= discountApplied;
  if (discountedSubtotal < 0) discountedSubtotal = 0;

  const taxType = watchedFields.tax_type || "none";
  const taxValue = Number(watchedFields.tax_value) || 0;

  let taxAmount = 0;
  if (taxType === "percentage") {
    taxAmount = (discountedSubtotal * taxValue) / 100;
  } else if (taxType === "fixed") {
    taxAmount = taxValue;
  }

  const grandTotal = discountedSubtotal + taxAmount;

  // Paid/remaining
  const paidNum = Number(paidAmount) || 0;
  const remainingBalance = grandTotal - paidNum;

  const DisplayCustomer = () => {
    return (
      <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Customer Details
        </Typography>
        <Typography variant="body1">
          Name: {watchedFields.customer_name}
        </Typography>
        <Typography variant="body1">
          Email: {watchedFields.customer_email}
        </Typography>

        <Typography variant="body1">CC: {watchedFields.cc}</Typography>
        <Typography variant="body1">BCC: {watchedFields.bcc}</Typography>
        <Typography variant="body1">
          Address: {watchedFields.address}
        </Typography>
      </Box>
    );
  };

  const DisplayDiscount = () => {
    if (discountType === "none" || !discountValue) return null;
    return (
      <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Discount Details
        </Typography>
        <Typography variant="body1">
          Type: {watchedFields.discount_type}
        </Typography>
        <Typography variant="body1">
          Value: {watchedFields.discount_value}
        </Typography>
        <Typography variant="body1">
          Name: {watchedFields.discount_name}
        </Typography>
      </Box>
    );
  };

  const DisplayTax = () => {
    if (taxType === "none" || !taxValue) return null;
    return (
      <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Tax Details
        </Typography>
        <Typography variant="body1">Type: {watchedFields.tax_type}</Typography>
        <Typography variant="body1">
          Value: {watchedFields.tax_value}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {/* Basic Info Section */}
      <ReusableAccordion
        sx={{ borderRadius: 2 }}
        title={"Basic Info"}
        defaultExpanded
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="title"
              control={control}
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

          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Paid?"
              value={paid ? "yes" : "no"}
              onChange={(e) => setPaid(e.target.value === "yes")}
              fullWidth
            >
              <MenuItem value="no">No</MenuItem>
              <MenuItem value="yes">Yes</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Paid Amount"
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              fullWidth
              disabled={!paid}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Remaining Balance"
              type="number"
              value={
                remainingBalance >= 0 ? remainingBalance.toFixed(2) : "0.00"
              }
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DisplayCustomer />
            <Box sx={{ mt: 2 }}>
              <ReuseableDropdown
                title="Add Customer"
                startIcon={<icons.PERSON />}
                width={isSmallScreen ? 320 : 500}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <icons.PLAN />
                  <CustomTypography
                    sx={{ ml: 1, fontSize: 13 }}
                    variant="subtitle2"
                  >
                    Select or Add a customer to send this invoice to.
                  </CustomTypography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    {trans("topHeader.currency")}
                  </Typography>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      display={"flex"}
                      alignItems="center"
                      justifyContent="space-between"
                      gap={1}
                    >
                      <TextField
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        // onClick={() => setShowCurrencyList(true)}
                        placeholder="Search Customer"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          mb: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "4px",
                          },
                          ...(isRtl && {
                            "& .MuiInputAdornment-root": {
                              marginLeft: 0,
                              marginRight: -0.5,
                            },
                            "& .MuiOutlinedInput-input": {
                              textAlign: "right",
                            },
                          }),
                        }}
                      />
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setAddCustomer(!addCustomer);
                        }}
                      >
                        {addCustomer ? <CgMathMinus /> : <Add />}
                      </IconButton>
                    </Box>
                    <Paper
                      sx={{
                        position: "absolute",
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto",
                        mt: 1,
                        zIndex: 1,
                      }}
                    >
                      {searchTerm}
                    </Paper>
                  </Box>
                  {addCustomer && (
                    <Box>
                      <Divider sx={{ my: 1 }} />
                      <CustomerFields
                        control={control}
                        errors={errors}
                        setAddCustomer={setAddCustomer}
                      />
                    </Box>
                  )}
                </Box>
              </ReuseableDropdown>
            </Box>
          </Grid>
        </Grid>
      </ReusableAccordion>

      {/* Items Section */}
      <ReusableAccordion
        sx={{ borderRadius: 2, mt: 2 }}
        title={"Items"}
        defaultExpanded
      >
        {fields.map((field, idx) => {
          const item = watchedItems[idx] || field;
          return (
            <Box
              key={item.id}
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
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", md: "center" },
                  }}
                >
                  <PriceText price={getItemSubtotal(item)} currency={"PKR"} />
                  <Chip
                    label={`Subtotal: ${getItemSubtotal(item).toFixed(2)}`}
                    color="primary"
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
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
              </Grid>
              <Box sx={{ mt: 2 }}>
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
                            onChange={(e) => field.onChange(e.target.checked)}
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
              </Box>
            </Box>
          );
        })}
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
          <Typography>Subtotal: {itemsSubtotal.toFixed(2)}</Typography>
        </Box>
      </ReusableAccordion>

      {/* Discount & Tax Section */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: "row", gap: 2 }}>
        {/* Discount Section */}
        <Box>
          <ReuseableDropdown
            title={"Apply Discounts"}
            startIcon={<CardGiftcardIcon />}
          >
            <>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Toggle per-item discounts and exclusions from invoice-level
                discounts.
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
              <Box sx={{ mt: 2 }}>
                <Typography>
                  Discounted Subtotal: {discountedSubtotal.toFixed(2)}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  Discount Applied: {discountApplied.toFixed(2)}
                </Typography>
              </Box>
            </>
          </ReuseableDropdown>
        </Box>

        {/* Tax Section */}

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
      </Box>
      <DisplayDiscount />
      <DisplayTax />
      {/* Grand Total Summary */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6">
          Grand Total: {grandTotal.toFixed(2)}
        </Typography>
      </Box>

      <ReusableAccordion title="Notes">
        <Controller
          name="notes"
          control={control}
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
      </ReusableAccordion>
    </>
  );
}
