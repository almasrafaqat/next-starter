import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircularProgress, TextField } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import InvoiceFields from "../FormFields/InvoiceFields/InvoiceFields";
import NavigationPills from "@/components/NavigationPills/NavigationPills";
import { icons } from "@/config/routeIcons";

const CreateInvoice = forwardRef(({ handleSubmitInvoice, isLoading }, ref) => {
  const trans = useTranslations("translations");
  const locale = useLocale();
  const { isRtl } = useResponsiveLayout();

  const invoiceSchema = z.object({
    title: z.string().min(1, "Invoice title is required"),
    discount_type: z.enum(["none", "percentage", "fixed"]),
    discount_value: z.string().or(z.number()),
    discount_name: z.string().optional(),
    currency: z.string().min(1),
    paid: z.boolean(),
    amount_paid: z.string().or(z.number()),
    balance_due: z.string().or(z.number()),
    total: z.number(),
    reminders: z.array(
      z.object({
        timezone: z.string(),
        schedule_date: z.string(), // ISO string
        expirey_date: z.string(), // ISO string
      })
    ),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        quantity: z.string().or(z.number()),
        price: z.string().or(z.number()),
        excludeFromInvoiceDiscount: z.boolean(),
        itemHasDiscount: z.boolean(),
        itemDiscountType: z.enum(["none", "percentage", "fixed"]),
        itemDiscountValue: z.string().or(z.number()).optional(),
      })
    ),
    customers: z.array(
      z.object({
        credit_balance: z.string().or(z.number()).optional(),
        name: z.string(),
        email: z.string().email(),
        company: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        cc: z.string().optional(),
        bcc: z.string().optional(),
      })
    ),
    discount_amount: z.number(),
    tax_type: z.enum(["none", "percentage", "fixed"]),
    tax_value: z.string().or(z.number()),
  });

  // Usage in useForm:
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      title: "",
      discount_type: "none",
      discount_value: "",
      discount_name: "",
      invoice_number: "",
      currency: "USD",
      paid: false,
      amount_paid: "",
      balance_due: "",
      total: 0,
      reminders: [],
      items: [],
      customers: [],
      discount_amount: 0,
      tax_type: "none",
      tax_value: "",
    },
  });
  // const {
  //   control,
  //   setValue,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     title: "",

  //   },
  // });

  // Expose submit to parent via ref
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  const onSubmit = (data) => {
    const cleanedData = {
      ...data,
      invoice_number: data.invoice_number, // Adjusted to match backend schema
      amount_paid: Number(data.amount_paid) || 0,
      balance_due: Number(data.balance_due) || 0,
      total: Number(data.total) || 0,
      discounts: data.discounts?.map((d) => ({
        discount_type: d.discount_type,
        discount: Number(d.discount_value),
        discount_name: d.discount_name || "",
        discount_amount: Number(d.discount_amount) || 0,
      })) || [
        {
          discount_type: data.discount_type,
          discount: Number(data.discount_value),
          discount_name: data.discount_name || "",
          discount_amount: Number(data.discount_amount) || 0,
        },
      ],
      discount_value: Number(data.discount_value) || 0,
      discount_amount: Number(data.discount_amount) || 0,
      tax_value: Number(data.tax_value) || 0,
      items: data.items.map((item) => ({
        ...item,
        name: item.title, // Adjusted to match backend schema
        quantity: Number(item.quantity) || 0,
        price: Number(item.price) || 0,
        itemDiscountValue: item.itemDiscountValue
          ? Number(item.itemDiscountValue)
          : 0,
      })),
      customers: data.customers.map((cust) => ({
        ...cust,
        credit_balance: cust.credit_balance ? Number(cust.credit_balance) : 0,
      })),
    };
    console.log("Submitting invoice:", cleanedData);
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
          "Create Invoice"
        )}
      </PrimaryButton>
    </form>
  );
});

CreateInvoice.displayName = "CreateInvoice";

export default CreateInvoice;
