import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyFormSchema } from "@/utils/formatCompanyData";
import CompanyFields from "./CompanyFields";
import { Box } from "@mui/material";

const CompanyForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "Acme Corporation", // Example existing data
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      website: "https://acme.com",
      address: "123 Business St, Business City, BC 12345",
      tax_number: "TAX123456789",
      registration_number: "REG987654321",
      country: "United States",
      state: "California",
      city: "San Francisco",
      zip_code: "94102",
      description: "Leading provider of innovative solutions",
      language: "en",
      currency: "USD",
      is_active: true,
      is_default: false,
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
