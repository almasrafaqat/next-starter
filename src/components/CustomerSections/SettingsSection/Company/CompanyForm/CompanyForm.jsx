'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyFormSchema,
  companyDefaultValues,
  companyMapData,
} from "@/utils/formatCompanyData";
import CompanyFields from "./CompanyFields";
import { Box } from "@mui/material";
import { useGetCompany } from "@/hooks/customer/useCompany";
// import {
//   useCreateCompany,
//   useUpdateCompany,
//   useGetCompany,
// } from "@/hooks/company/useCompany";

const CompanyForm = ({ companyId = 1, mode = "create" }) => {
  const { company, isLoading: loadingCompany } = useGetCompany(companyId);
//   const {
//     createCompany,
//     loading: creating,
//     error: createError,
//   } = useCreateCompany();
//   const {
//     updateCompany,
//     loading: updating,
//     error: updateError,
//   } = useUpdateCompany();

  console.log("company data:", company);

   // Usage in useForm:
      const defaultValues = company
        ? companyMapData(company)
        : companyDefaultValues;

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

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
      <CompanyFields
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        reset={reset}
        getValues={getValues}
      />
    </Box>
  );
};

export default CompanyForm;
