'use client'
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDefaultValues, companyFormSchema, companyMapData } from "@/utils/formatCompanyData";
import CompanyFields from "./CompanyFields";
import { Box, Alert, CircularProgress } from "@mui/material";
import { useCompany, useGetCompany } from "@/hooks/customer/useCompany";
import { useRouter } from "@/i18n/routing";

const CompanyForm = ({ companyId = 1, mode = "edit" }) => {
  const router = useRouter();
  const { company, isLoading: loadingCompany } = useGetCompany(companyId);
  console.log("Company data:", company);
  const {
    createCompany,
    createCompanyResult,
    updateCompany,
    updateCompanyResult,
  } = useCompany();

  const defaultValues = company ? companyMapData(company) : companyDefaultValues;
  const {
    control,
    handleSubmit,
    reset,
    getValues,
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

  const onSubmit = async (data) => {
    try {
      if (mode === "create") {
        createCompany(data, {
          onSuccess: (result) => {
            if (result?.success) {
              alert("Company created successfully!");
              router.push("/customer/settings");
            }
          },
          onError: (error) => {
            alert(`Failed to create company: ${error.message}`);
          },
        });
      } else {
        updateCompany(
          { id: companyId, ...data },
          {
            onSuccess: (result) => {
              if (result?.success) {
                alert("Company updated successfully!");
              }
            },
            onError: (error) => {
              alert(`Failed to update company: ${error.message}`);
            },
          }
        );
      }
    } catch (error) {
      console.error("Error submitting company:", error);
      alert("Failed to save company. Please try again.");
    }
  };

  if (loadingCompany) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

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
        getValues={getValues}
        loading={createCompanyResult.isPending || updateCompanyResult.isPending}
        mode={mode}
      />
    </Box>
  );
};

export default CompanyForm;
