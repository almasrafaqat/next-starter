import React, { useEffect, useRef, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import {
  TextField,
  Typography,
  Grid,
  Box,
  Divider,
  InputAdornment,
  Paper,
  IconButton,
  MenuItem,
} from "@mui/material";
import ReusableAccordion from "@/components/ui/ReusableAccordion/ReusableAccordion";
import ReuseableDropdown from "@/components/ui/ReuseableDropdown/ReuseableDropdown";
import CustomTypography from "@/components/Typography/CustomTypography";
import { icons } from "@/config/routeIcons";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { useTranslations } from "next-intl";
import InvoiceDiscountDisplay from "../../InvoiceDiscountDisplay/InvoiceDiscountDisplay";
import TaxDisplay from "../../TaxDisplay/TaxDisplay";
import CurrencyField from "../CurrencyField/CurrencyField";
import InvoiceDiscountFields from "../InvoiceDiscountFields/InvoiceDiscountFields";
import InvoiceTaxFields from "../InvoiceTaxFields/InvoiceTaxFields";
import InvoiceFormatPrice from "@/components/FormatPrice/InvoiceFormatPrice";
import ItemFields from "../ItemFields/ItemFields";
import ItemDisplay from "../../ItemDisplay/ItemDisplay";
import InvoiceStatusFields from "../InvoiceStatusFields/InvoiceStatusFields";
import ReminderFields from "../ReminderFields/ReminderFields";
import { DatePicker } from "@mui/x-date-pickers";
import { transformInvoiceErrors } from "@/utils/formsError";
import AdvancedChecklistErrors from "../AdvancedChecklistErrors/AdvancedChecklistErrors";
import CustomerSelection from "../CustomerFields/CustomerSelection";

export default function InvoiceFields({ control, setValue, errors }) {
  const { isSmallScreen, isRtl } = useResponsiveDevice();

  // Inside your component:
  const watchedFields = useWatch({ control });

  console.log("Watched Fields:", watchedFields);
  console.log("Errors:", errors);

  const [showChecklistDialog, setShowChecklistDialog] = useState(false);

  const trans = useTranslations("translations");

  const customerFields = watchedFields.customers
    ? watchedFields.customers[0]
    : {};
  // All watched items
  const watchedItems = watchedFields.items || [];
  // Use watched values for discount/tax
  const discountType = watchedFields.discount_type || "none";
  const discountValue = watchedFields.discount_value || 0;
  const discountName = watchedFields.discount_name || "";

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
      return subtotal > 0 ? subtotal : 0;
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

  // Tax calculation (if any)
  const taxType = watchedFields.tax_type || "none";
  const taxValue = Number(watchedFields.tax_value) || 0;
  let taxAmount = 0;
  if (taxType === "percentage") {
    taxAmount = (itemsSubtotal * taxValue) / 100;
  } else if (taxType === "fixed") {
    taxAmount = taxValue;
  }

  // const grandTotal = itemsSubtotal;
  const grandTotal = itemsSubtotal + taxAmount;

  // Paid/remaining
  const paidAmount = Number(watchedFields.amount_paid) || 0;
  const paidNum = Number(paidAmount) || 0;
  const remainingBalance = grandTotal - paidNum;

  // Sync balance_due with calculated remainingBalance
  useEffect(() => {
    setValue(
      "balance_due",
      remainingBalance >= 0 ? remainingBalance.toFixed(2) : "0.00"
    );
    // Update customer credit_balance if overpaid
    if (remainingBalance < 0) {
      setValue(
        "customers.0.credit_balance",
        Math.abs(remainingBalance).toFixed(2)
      );
    } else {
      setValue("customers.0.credit_balance", "");
    }
  }, [remainingBalance, setValue]);

  useEffect(() => {
    setValue("total", grandTotal);
  }, [grandTotal, setValue]);

  const eligibleForInvoiceDiscount = watchedItems.filter(
    (item) => !item.itemHasDiscount && !item.excludeFromInvoiceDiscount
  );

  const eligibleSubtotal = eligibleForInvoiceDiscount.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return sum + qty * price;
  }, 0);

  const invoiceDiscountAmount =
    discountType === "percentage"
      ? (eligibleSubtotal * Number(discountValue)) / 100
      : discountType === "fixed"
      ? Number(discountValue)
      : 0;

  useEffect(() => {
    setValue("discount_amount", invoiceDiscountAmount);
  }, [invoiceDiscountAmount, setValue]);

  console.log("discountAmount:", invoiceDiscountAmount);

  useEffect(() => {
    setValue("tax_amount", taxAmount);
  }, [taxAmount, setValue]);

  const flatErrors = transformInvoiceErrors(errors);

  const checklist = [
    { field: "title", label: "Invoice Title" },
    { field: "invoice_number", label: "Invoice Number" },
    { field: "customers[0].name", label: "Customer Name" },
    { field: "customers[0].email", label: "Customer Email" },
    // Add more as needed
  ];

  useEffect(() => {
    const hasErrors = flatErrors.length > 0;

    if (hasErrors) {
      setShowChecklistDialog(true);
    }
  }, [flatErrors]);

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
            <CurrencyField
              control={control}
              setValue={setValue}
              errors={errors}
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

          <Grid item xs={12} md={12}>
            <InvoiceStatusFields
              control={control}
              errors={errors}
              remainingBalance={remainingBalance}
            />
          </Grid>
        </Grid>
      </ReusableAccordion>

      <ReminderFields control={control} errors={errors} />

      <CustomerSelection
        control={control}
        setValue={setValue}
        errors={errors}
        companyId={1}
        userId={1}
        fields={customerFields}
      />

      {/* Item Section */}
      <ReusableAccordion
        sx={{ borderRadius: 2, mt: 2 }}
        title={"Items"}
        defaultExpanded
      >
        <ItemFields
          control={control}
          setValue={setValue}
          errors={errors}
          watchedFields={watchedFields}
        />
      </ReusableAccordion>

      <ItemDisplay
        items={watchedItems}
        currency={watchedFields.currency || "USD"}
      />

      <Box sx={{ mt: 2, display: "flex", flexDirection: "row", gap: 2 }}>
        <InvoiceDiscountFields
          control={control}
          errors={errors}
          watchedFields={watchedFields}
        />
        <InvoiceTaxFields
          control={control}
          errors={errors}
          watchedFields={watchedFields}
          taxAmount={taxAmount}
        />
      </Box>

      <Controller
        name="total"
        control={control}
        defaultValue={grandTotal}
        render={({ field }) => (
          <input type="hidden" {...field} value={grandTotal} />
        )}
      />

      <Controller
        name="discount_amount"
        control={control}
        defaultValue={invoiceDiscountAmount}
        render={({ field }) => (
          <input type="hidden" {...field} value={invoiceDiscountAmount} />
        )}
      />
      <Controller
        name="tax_amount"
        control={control}
        defaultValue={taxAmount}
        render={({ field }) => (
          <input type="hidden" {...field} value={taxAmount} />
        )}
      />

      <TaxDisplay
        taxType={taxType}
        taxValue={taxValue}
        taxAmount={taxAmount}
        items={watchedItems}
      />
      {/* For invoice-level summary */}
      <InvoiceDiscountDisplay
        discountType={discountType}
        discountValue={discountValue}
        discountName={discountName}
        items={watchedItems}
      />
      {/* Grand Total Summary */}
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6">
          Grand Total:
          <InvoiceFormatPrice
            price={grandTotal}
            currency={watchedFields.currency || "USD"}
          />
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <ReuseableDropdown
          title="Additional Information"
          startIcon={<icons.PERSON />}
          width={isSmallScreen ? 320 : 500}
        >
          <Box>
            <CustomTypography sx={{ mb: 1, fontSize: 13 }} variant="subtitle2">
              Add any additional information regarding this invoice.
            </CustomTypography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="timeframe"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Timeframe"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          helperText:
                            "The Timeframe for this invoice to fulfill the order within.",
                          error: !!errors?.timeframe,
                        },
                      }}
                      value={field.value || null}
                      onChange={field.onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="importance"
                  control={control}
                  defaultValue="normal"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Importance"
                      fullWidth
                      helperText="Set the importance level for this invoice."
                      error={!!errors?.importance}
                    >
                      <MenuItem value="normal">Normal</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="urgent">Urgent</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </ReuseableDropdown>
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

      <AdvancedChecklistErrors
        checklist={checklist}
        errors={flatErrors}
        forceOpen={showChecklistDialog}
        onClose={() => setShowChecklistDialog(false)}
      />
    </>
  );
}
