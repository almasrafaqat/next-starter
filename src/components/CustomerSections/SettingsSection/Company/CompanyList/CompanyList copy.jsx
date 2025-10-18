import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useCompany } from "@/hooks/customer/useCompany";
import { useRouter } from "@/i18n/routing";

const CompanyList = () => {
  const router = useRouter();
  const {
    companies,
    isLoading,
    refetch,
    deleteCompany,
    deleteCompanyResult,
    setDefaultCompany,
    setDefaultCompanyResult,
  } = useCompany();

  const handleEdit = (id) => {
    router.push(`/settings/companies/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id, {
        onSuccess: (result) => {
          if (result?.success) {
            alert("Company deleted successfully!");
            refetch();
          } else {
            alert(result?.message || "Failed to delete company");
          }
        },
        onError: (error) => {
          alert(`Failed to delete company: ${error.message}`);
        },
      });
    }
  };

  const handleSetDefault = async (id) => {
    setDefaultCompany(id, {
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Companies</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/settings/companies/create")}
        >
          Add Company
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Default</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No companies found
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.email || "-"}</TableCell>
                  <TableCell>{company.phone || "-"}</TableCell>
                  <TableCell>{company.country || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      label={company.is_active ? "Active" : "Inactive"}
                      color={company.is_active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Set as default">
                      <IconButton
                        size="small"
                        onClick={() => handleSetDefault(company.id)}
                        disabled={
                          company.is_default || setDefaultCompanyResult.isPending
                        }
                      >
                        {company.is_default ? (
                          <StarIcon color="primary" />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(company.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(company.id)}
                        disabled={
                          company.is_default || deleteCompanyResult.isPending
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyList;