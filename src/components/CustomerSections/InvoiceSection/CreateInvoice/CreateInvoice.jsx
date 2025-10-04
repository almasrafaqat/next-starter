import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircularProgress, TextField } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import InvoiceFields from "../FormFields/InvoiceFields/InvoiceFields";
import CustomerFields from "../FormFields/CustomerFields/CustomerFields";
import DiscountFields from "../FormFields/DiscountFields/DiscountFields";
import NavigationPills from "@/components/NavigationPills/NavigationPills";
import { icons } from "@/config/routeIcons";
import ImageIcon from "@mui/icons-material/Image";

const CreateInvoice = forwardRef(({ handleSubmitInvoice, isLoading }, ref) => {
  const trans = useTranslations("translations");
  const locale = useLocale();
  const { isRtl } = useResponsiveLayout();

  const schema = z.object({
    title: z.string().min(1, "Invoice title is required"),
    customer_name: z.string().min(1, "Customer name is required"),
    customer_email: z.string().email("Invalid email"),
    discount_type: z.string(),
    discount: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val) && val >= 0, {
        message: "Discount must be a number >= 0",
      }),
    // Add more fields as needed
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      customer_name: "",
      customer_email: "",
      discount_type: "percentage",
      discount: 0,
    },
  });

  // Expose submit to parent via ref
  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(onSubmit)(),
  }));

  const onSubmit = (data) => {
    console.log("Submitting invoice:", data);
    try {
      handleSubmitInvoice(data);
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
        component: () => <InvoiceFields control={control} errors={errors} />,
      },
      {
        key: "customer",
        label: "Customer",
        icon: <icons.PERSON />,
        selected: false,
        component: () => <CustomerFields control={control} errors={errors} />,
      },
      {
        key: "discount",
        label: "Discount",
        selected: false,
        icon: <icons.CREDIT_CARD />,

        component: () => <DiscountFields control={control} errors={errors} />,
      },
      // Add more tabs for items, reminders, etc.
    ],
    [control, errors]
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
