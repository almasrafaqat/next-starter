import React, { useEffect, useState } from "react";
import { useCompany } from "@/hooks/customer/useCompany";
import { useDialog } from "@/hooks/useDialog";
import { icons } from "@/config/routeIcons";
import { Box } from "@mui/material";
import CompanyCard from "./CompanyCard/CompanyCard";
import { LoadingCard } from "@/components/ui/LoadingComponents";
import SheetDrawer from "@/components/ui/Sheet/SheetDrawer";
import CompanyForm from "../CompanyForm/CompanyForm";
import EmptyCompany from "./EmptyCompany";

const CompanyList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCompany(null);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setIsDrawerOpen(true);
  };

  const {
    companies,
    isLoading,
    refetch,
    deleteCompany,
    deleteCompanyResult,
    setDefaultCompany,
    setDefaultCompanyResult,
  } = useCompany();

  const {
    open,
    close: closeDialog,
    loading: showLoading,
    alert,
    confirm: confirmDialog,
  } = useDialog();

  // Handle delete loaders/alerts
  useEffect(() => {
    if (deleteCompanyResult.isPending) {
      showLoading({
        title: "Deleting Company...",
        message: "Please wait while deleting company...",
      });
    } else {
      closeDialog();
    }
    if (deleteCompanyResult.isSuccess) {
      alert({
        title: "Success",
        message:
          deleteCompanyResult.data?.message || "Company deleted successfully!",
        type: "success",
      });
      refetch?.();
    }
    if (deleteCompanyResult.isError) {
      alert({
        title: "Error",
        message:
          deleteCompanyResult.error?.message || "Failed to delete company.",
        type: "error",
      });
    }
  }, [
    deleteCompanyResult.isPending,
    deleteCompanyResult.isSuccess,
    deleteCompanyResult.isError,
    deleteCompanyResult.error,
    deleteCompanyResult.data,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  // Handle set-default loaders/alerts
  useEffect(() => {
    if (setDefaultCompanyResult.isPending) {
      showLoading({
        title: "Updating Default Company...",
        message: "Please wait while updating default company...",
      });
    } else {
      closeDialog();
    }
    if (setDefaultCompanyResult.isSuccess) {
      alert({
        title: "Success",
        message:
          setDefaultCompanyResult.data?.message ||
          "Default company set successfully!",
        type: "success",
      });
      refetch?.();
    }
    if (setDefaultCompanyResult.isError) {
      alert({
        title: "Error",
        message:
          setDefaultCompanyResult.error?.message ||
          "Failed to set default company.",
        type: "error",
      });
    }
  }, [
    setDefaultCompanyResult.isPending,
    setDefaultCompanyResult.isSuccess,
    setDefaultCompanyResult.isError,
    setDefaultCompanyResult.error,
    setDefaultCompanyResult.data,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  const handleDelete = (company) => {
    confirmDialog({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete "${company.name}"?`,
      type: "error",
      onConfirm: () => deleteCompany(company.id),
    });
  };

  const handleSetDefault = (company) => {
    confirmDialog({
      title: "Confirm Set Default",
      message: `Are you sure you want to set "${company.name}" as the default company?`,
      type: "info",
      onConfirm: () => setDefaultCompany(company.id),
    });
  };

  const actions = [
    {
      label: "Edit",
      onClick: (company) => handleEditCompany(company),
      icon: icons.EDIT,
    },
    {
      label: "Delete",
      onClick: (company) => handleDelete(company),
      icon: icons.DELETE,
    },
    {
      label: "Set as Default",
      onClick: (company) => handleSetDefault(company),
      icon: icons.TOGGLE,
    },
  ];

  if (isLoading) {
    return <LoadingCard />;
  }

  // Beautiful empty state
  if (!companies || companies.length === 0) {
    return <EmptyCompany />;
  }

  return (
    <Box sx={{ marginBottom: 5 }}>
      {companies?.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          actions={actions}
          onToggleDefault={handleSetDefault}
        />
      ))}

      <SheetDrawer open={isDrawerOpen} onClose={handleCloseDrawer}>
        <CompanyForm
          handleCloseDrawer={handleCloseDrawer}
          companyData={editingCompany}
          mode={editingCompany ? "edit" : "create"}
        />
      </SheetDrawer>
    </Box>
  );
};

export default CompanyList;
