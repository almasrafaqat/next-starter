"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyDefaultValues,
  companyFormSchema,
  companyMapData,
  formatCompanyForSubmission,
} from "@/utils/formatCompanyData";
import CompanyFields from "./CompanyFields";
import { Box, Alert } from "@mui/material";
import { useCompany, useGetCompany } from "@/hooks/customer/useCompany";
import { useDialog } from "@/hooks/useDialog";

const CompanyForm = ({
  handleCloseDrawer,
  companyData = {},
  mode = "create",
}) => {
  console.log("companyData", companyData);
  const [company, setCompany] = useState();

  useEffect(() => {
    if (mode === "edit") {
      setCompany(companyData);
    }
  }, [companyData, mode]);

  const {
    open,
    close: closeDialog,
    loading: showLoading,
    alert,
    confirm: confirmDialog,
  } = useDialog();
  // const { company, isLoading: loadingCompany } = useGetCompany(companyId);
  const companyId = company?.id;
  console.log("mode", mode);
  console.log("Company:", company);
  const {
    createCompany,
    createCompanyResult,
    updateCompany,
    updateCompanyResult,
  } = useCompany();

  const defaultValues = company
    ? companyMapData(company)
    : companyDefaultValues;
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  // Load company data if editing
  useEffect(() => {
    if (company && mode === "edit") {
      reset(company);
    }
  }, [company, mode, reset]);

  // Handle update loaders/alerts
  useEffect(() => {
    if (updateCompanyResult.isPending) {
      showLoading({
        title: "Updating  Company...",
        message: "Please wait while updating company...",
      });
    } else {
      closeDialog();
    }
    if (updateCompanyResult.isSuccess) {
      alert({
        title: "Success",
        message:
          updateCompanyResult.data?.message || "Company set successfully!",
        type: "success",
      });
    }
    if (updateCompanyResult.isError) {
      alert({
        title: "Error",
        message:
          updateCompanyResult.error?.message ||
          "Failed to set default company.",
        type: "error",
      });
    }
  }, [
    updateCompanyResult.isPending,
    updateCompanyResult.isSuccess,
    updateCompanyResult.isError,
    updateCompanyResult.error,
    updateCompanyResult.data,
    showLoading,
    closeDialog,
    alert,
  ]);

  const onSubmit = async (data) => {
    const input = formatCompanyForSubmission(data);
    try {
      if (mode === "create") {
        createCompany(input, {
          onSuccess: (result) => {
            if (result?.success) {
              alert("Company created successfully!");
            }
          },
          onError: (error) => {
            alert(`Failed to create company: ${error.message}`);
          },
        });
      } else {
        updateCompany(
          { id: companyId, ...input },
          {
            onSuccess: handleCloseDrawer(),
          }
        );
      }
    } catch (error) {
      console.error("Error submitting company:", error);
      alert("Failed to save company. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      {(createCompanyResult.error || updateCompanyResult.error) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {createCompanyResult.error?.message ||
            updateCompanyResult.error?.message}
        </Alert>
      )}

      <CompanyFields
        control={control}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        reset={reset}
        setValue={setValue}
        watch={watch}
        getValues={getValues}
        loading={createCompanyResult.isPending || updateCompanyResult.isPending}
        mode={mode}
      />
    </Box>
  );
};

export default CompanyForm;
