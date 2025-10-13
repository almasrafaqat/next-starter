import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { nullable, z } from "zod";
import { CircularProgress } from "@mui/material";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import InvoiceFields from "../FormFields/InvoiceFields/InvoiceFields";
import NavigationPills from "@/components/NavigationPills/NavigationPills";
import { icons } from "@/config/routeIcons";
import {
  formatInvoiceData,
  mapInvoiceToFormData,
  invoiceFormDefaults,
} from "@/utils/formatInvoiceData";

const CreateInvoice = forwardRef(
  ({ companyId, invoice, handleSubmitInvoice, isLoading }, ref) => {
    const invoiceSchema = z.object({
      id: z.string().or(z.number().nullable()).optional(),
      title: z.string().min(1, "Invoice title is required"),
      invoice_number: z.string().min(1, "Invoice number is required"),
      discount_type: z.enum(["none", "percentage", "fixed"]),
      discount_value: z.string().or(z.number()),
      discount_name: z.string().optional(),
      currency: z.string().min(1),
      amount_paid: z.string().or(z.number()),
      balance_due: z.string().or(z.number()),
      payment_status: z.boolean(),
      total: z.number(),
      date: z.string().optional(),
      notes: z.string().optional(),
      importance: z.enum(["normal", "high", "urgent", "low"]).optional(),
      timeframe: z.string().nullable().or(z.date()).optional(),
      reminders: z.array(
        z.object({
          timezone: z.string().optional(),
          schedule_date: z.string().or(z.date()).optional(),
          expiry_date: z.string().or(z.date()).optional(),
          // expiry_date: z.date().nullable().optional(),
        })
      ),
      items: z.array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          quantity: z.string().or(z.number()),
          price: z.string().or(z.number()),
          discount_amount: z.string().or(z.number()).optional(),
          subtotal: z.string().or(z.number()).optional(),
          total: z.string().or(z.number()).optional(),
          isTaxed: z.boolean().optional(),
          excludeFromInvoiceDiscount: z.boolean().optional(),
          itemHasDiscount: z.boolean().optional(),
          itemDiscountType: z.enum(["none", "percentage", "fixed"]).optional(),
          itemDiscountValue: z.string().or(z.number()).optional(),
        })
      ),
      customers: z.array(
        z.object({
          id: z.string().or(z.number()).nullable().optional(),
          name: z.string().optional(),
          email: z.string().email(),
          credit_balance: z.string().or(z.number()).optional(),
          company: z.string().nullable().optional(),
          phone: z.string().nullable().optional(),
          address: z.string().nullable().optional(),
          cc: z.string().or(z.array(z.string())).nullable().optional(),
          bcc: z.string().or(z.array(z.string())).nullable().optional(),
        })
      ),
      discount_amount: z.number(),
      tax_type: z.enum(["none", "percentage", "fixed"]),
      tax_value: z.string().or(z.number()),
      tax_name: z.string().optional(),
      tax_amount: z.number().optional(),
    });

    // Usage in useForm:
    const defaultValues = invoice
      ? mapInvoiceToFormData(invoice)
      : invoiceFormDefaults;

    const {
      control,
      setValue,
      handleSubmit,
      methods,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(invoiceSchema),
      defaultValues,
    });

    // Expose submit to parent via ref
    // useImperativeHandle(ref, () => ({
    //   submit: () => handleSubmit(onSubmit)(),
    // }));

    const onSubmit = (data) => {
      console.log("Raw form data:", data);
      const cleanedData = formatInvoiceData(data);
      cleanedData.company_id = companyId;
      console.log("Submitting cleanedData:", cleanedData);
      try {
        handleSubmitInvoice(cleanedData);
      } catch (error) {
        console.error("Error submitting invoice:", error);
      } finally {
      }
    };

    const pillItems = useMemo(
      () => [
        {
          key: "invoice",
          label: "Invoice",
          selected: true,
          icon: <icons.INVOICE />,
          component: () => (
            <InvoiceFields
              control={control}
              setValue={setValue}
              errors={errors}
            />
          ),
        },
        // Add more tabs for items, reminders, etc.
      ],
      [control, errors, setValue]
    );

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <NavigationPills
          items={pillItems}
          boxShadow={false}
          isScrollable={false}
        />

        <PrimaryButton
          fullWidth
          type="submit"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Invoice"
          )}
        </PrimaryButton>
      </form>
    );
  }
);

CreateInvoice.displayName = "CreateInvoice";

export default CreateInvoice;
