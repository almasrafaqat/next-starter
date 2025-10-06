"use client";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import PageHead from "@/components/ui/PageHead/PageHead";
import React, { useEffect, useRef } from "react";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import { useDialog } from "@/hooks/useDialog";
import CreateInvoice from "./CreateInvoice/CreateInvoice";
import { useInvoice } from "@/hooks/customer/useInvoice";
import { useDrawer } from "@/hooks/useDrawer";

const InvoiceSection = () => {
  const { data, isLoading, error, createInvoice, createInvoiceResult } =
    useInvoice();

  const { showDrawer, hideDrawer } = useDrawer();
  const formRef = useRef();
  // Flatten all invoices from all companies
  const invoices =
    data?.companies?.flatMap((company) => company.invoices) || [];

  const {
    open: openDialog,
    close: closeDialog,
    loading: showLoading,
    alert,
  } = useDialog();

  const handleSubmitInvoice = (data) => {
    if (createInvoice) {
      try {
        createInvoice(data);
        hideDrawer();
      } catch (error) {
        // Optionally show error in dialog
        console.error(error);
      }
    } else {
      console.log("Form Data:", data);
    }
  };

  const handleOpenDrawer = () => {
    showDrawer(
      <CreateInvoice ref={formRef} handleSubmitInvoice={handleSubmitInvoice} />,
      "Create Invoice",
      "bottom"
    );
  };

  useEffect(() => {
    if (createInvoiceResult.isPending) {
      showLoading({
        title: "Creating Invoice",
        message: "Creating invoice...",
      });
    } else {
      closeDialog();
    }
    if (createInvoiceResult.isSuccess) {
      // Optionally show success message
      alert({
        title: "Success",
        message: createInvoiceResult.data.message || "Invoice created successfully!",
        type: "success",
      });
    }
    if (createInvoiceResult.isError) {
      alert({
        title: "Error",
        message: createInvoiceResult.error.message || "Failed to create invoice.",
        type: "error",
      });
    }
  }, [
    createInvoiceResult.isPending,
    createInvoiceResult.isSuccess,
    createInvoiceResult.isError,
    createInvoiceResult.error,
    createInvoiceResult.data,
    alert,
    showLoading,
    closeDialog,
  ]);

  return (
    <PageHead title="Manage Invoices" index={false}>
      <HeadingTitle title="Manage Invoices" />
      <PrimaryButton sx={{ mt: 2, mb: 2 }} onClick={handleOpenDrawer}>
        Create Invoice
      </PrimaryButton>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <InvoiceTable invoices={invoices} isLoading={isLoading} />
    </PageHead>
  );
};

export default InvoiceSection;
