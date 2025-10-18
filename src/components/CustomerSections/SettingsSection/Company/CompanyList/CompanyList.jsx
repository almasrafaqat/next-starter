import React, { useEffect, useState } from "react";
import { TableView } from "@/components/TableView/TableView";
import { useCompany } from "@/hooks/customer/useCompany";
import { useDialog } from "@/hooks/useDialog";
import { useRouter } from "@/i18n/routing";
import { icons } from "@/config/routeIcons";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { title } from "process";
import { MoreVert } from "@mui/icons-material";
import CompanyCard from "./CompanyCard/CompanyCard";
import { LoadingCard } from "@/components/ui/LoadingComponents";
import SheetDrawer from "@/components/ui/Sheet/SheetDrawer";
import CompanyForm from "../CompanyForm/CompanyForm";

const CompanyList = () => {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCompany(null);
  };

  const handleCreateCompany = () => {
    setEditingCompany(null);
    setIsDrawerOpen(true);
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

  const handleEdit = (company) => {
    router.push(`/settings/companies/edit/${company.id}`);
  };

  const handleDelete = (company) => {
    confirmDialog({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete "${company.name}"?`,
      type: "error",
      onConfirm: () => deleteCompany(company.id),
    });
  };

  const handleSetDefault = (company) => {
    alert({
      title: "Confirm Set Default",
      message: `Are you sure you want to set "${company.name}" as the default company?`,
      type: "info",
    });

    setDefaultCompany(company.id, {
      onSuccess: (result) => {
        if (result?.success) {
          alert("Default company set successfully!");
          refetch();
        }
      },
      onError: (error) => {
        alert(`Failed to set default company: ${error.message}`);
      },
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

  // Show empty state
  if (!companies || companies.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
          gap: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No companies found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first company to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginBottom: 5 }}>
      {companies?.map((company) => (
        <CompanyCard key={company.id} company={company} actions={actions} />
      ))}

      <SheetDrawer open={isDrawerOpen} onClose={handleCloseDrawer}>
        <CompanyForm companyId={1} mode="edit" />
      </SheetDrawer>
    </Box>
  );
};

export default CompanyList;
