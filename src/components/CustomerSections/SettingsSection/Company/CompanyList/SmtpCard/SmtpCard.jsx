import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AndroidSwitch, IOSSwitch } from "@/components/ui/switch/CustomSwitch";
import { icons } from "@/config/routeIcons";
import SheetDrawer from "@/components/ui/Sheet/SheetDrawer";
import SMTPForm from "./SmtpForm";
import { ExpandButton, SMTPCard, StyledTooltip } from "./Smtp.styles";
import { useSmtp } from "@/hooks/customer/useSmpt";
import { useDialog } from "@/hooks/useDialog";
import { smtpMapData } from "@/utils/formatSmtpData";

const SmtpCard = ({ company }) => {
  const [expandedSMTP, setExpandedSMTP] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSmtp, setEditingSmtp] = useState(null);

  console.log("Company SMTP editingSmtp:", editingSmtp);

  const {
    createSmtp,
    createSmtpResult,
    updateSmtp,
    updateSmtpResult,
    deleteSmtp,
    deleteSmtpResult,
    setDefaultSmtp,
    setDefaultSmtpResult,
    toggleActiveSmtp,
    toggleActiveSmtpResult,
    refetch,
  } = useSmtp();

  const {
    close: closeDialog,
    loading: showLoading,
    alert,
    confirm: confirmDialog,
  } = useDialog();

  // Handle CREATE loading/alerts
  useEffect(() => {
    if (createSmtpResult.isPending) {
      showLoading({
        title: "Creating SMTP...",
        message: "Please wait while creating SMTP configuration...",
      });
    } else {
      closeDialog();
    }

    if (createSmtpResult.isSuccess) {
      alert({
        title: "Success",
        message: "SMTP configuration created successfully!",
        type: "success",
      });
      setIsDrawerOpen(false);
      setEditingSmtp(null);
      refetch?.();
    }

    if (createSmtpResult.isError) {
      alert({
        title: "Error",
        message:
          createSmtpResult.error?.message ||
          "Failed to create SMTP configuration.",
        type: "error",
      });
    }
  }, [
    createSmtpResult.isPending,
    createSmtpResult.isSuccess,
    createSmtpResult.isError,
    createSmtpResult.error,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  // Handle UPDATE loading/alerts
  useEffect(() => {
    if (updateSmtpResult.isPending) {
      showLoading({
        title: "Updating SMTP...",
        message: "Please wait while updating SMTP configuration...",
      });
    } else {
      closeDialog();
    }

    if (updateSmtpResult.isSuccess) {
      alert({
        title: "Success",
        message: "SMTP configuration updated successfully!",
        type: "success",
      });
      setIsDrawerOpen(false);
      setEditingSmtp(null);
      refetch?.();
    }

    if (updateSmtpResult.isError) {
      alert({
        title: "Error",
        message:
          updateSmtpResult.error?.message ||
          "Failed to update SMTP configuration.",
        type: "error",
      });
    }
  }, [
    updateSmtpResult.isPending,
    updateSmtpResult.isSuccess,
    updateSmtpResult.isError,
    updateSmtpResult.error,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  // Handle DELETE loading/alerts
  useEffect(() => {
    if (deleteSmtpResult.isPending) {
      showLoading({
        title: "Deleting SMTP...",
        message: "Please wait while deleting SMTP configuration...",
      });
    } else {
      closeDialog();
    }

    if (deleteSmtpResult.isSuccess) {
      alert({
        title: "Success",
        message: "SMTP configuration deleted successfully!",
        type: "success",
      });
      refetch?.();
    }

    if (deleteSmtpResult.isError) {
      alert({
        title: "Error",
        message:
          deleteSmtpResult.error?.message ||
          "Failed to delete SMTP configuration.",
        type: "error",
      });
    }
  }, [
    deleteSmtpResult.isPending,
    deleteSmtpResult.isSuccess,
    deleteSmtpResult.isError,
    deleteSmtpResult.error,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  // Handle SET DEFAULT loading/alerts
  useEffect(() => {
    if (setDefaultSmtpResult.isPending) {
      showLoading({
        title: "Setting Default SMTP...",
        message: "Please wait while setting default SMTP...",
      });
    } else {
      closeDialog();
    }

    if (setDefaultSmtpResult.isSuccess) {
      alert({
        title: "Success",
        message:
          setDefaultSmtpResult.data?.message ||
          "Default SMTP set successfully!",
        type: "success",
      });
      refetch?.();
    }

    if (setDefaultSmtpResult.isError) {
      alert({
        title: "Error",
        message:
          setDefaultSmtpResult.error?.message || "Failed to set default SMTP.",
        type: "error",
      });
    }
  }, [
    setDefaultSmtpResult.isPending,
    setDefaultSmtpResult.isSuccess,
    setDefaultSmtpResult.isError,
    setDefaultSmtpResult.error,
    setDefaultSmtpResult.data,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  // Handle TOGGLE ACTIVE loading/alerts
  useEffect(() => {
    if (toggleActiveSmtpResult.isPending) {
      showLoading({
        title: "Updating SMTP Status...",
        message: "Please wait while updating SMTP status...",
      });
    } else {
      closeDialog();
    }

    if (toggleActiveSmtpResult.isSuccess) {
      alert({
        title: "Success",
        message:
          toggleActiveSmtpResult.data?.message ||
          "SMTP status updated successfully!",
        type: "success",
      });
      refetch?.();
    }

    if (toggleActiveSmtpResult.isError) {
      alert({
        title: "Error",
        message:
          toggleActiveSmtpResult.error?.message || "Failed to update SMTP status.",
        type: "error",
      });
    }
  }, [
    toggleActiveSmtpResult.isPending,
    toggleActiveSmtpResult.isSuccess,
    toggleActiveSmtpResult.isError,
    toggleActiveSmtpResult.error,
    toggleActiveSmtpResult.data,
    showLoading,
    closeDialog,
    alert,
    refetch,
  ]);

  // Handlers
  const handleSMTPToggle = (smtpId) => {
    setExpandedSMTP(expandedSMTP === smtpId ? null : smtpId);
  };

  const handleCreateSMTP = () => {
    setEditingSmtp(null);
    setIsDrawerOpen(true);
  };

  const handleEditSMTP = (smtp) => {
    setEditingSmtp(smtpMapData(smtp));
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingSmtp) {
      updateSmtp({ id: editingSmtp.id, data, companyId: company.id });
    } else {
      createSmtp({ data, companyId: company.id });
    }
  };

  const handleDelete = (smtp) => {
    confirmDialog({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete SMTP "${smtp.from_email}"?`,
      type: "error",
      onConfirm: () => deleteSmtp(smtp.id),
    });
  };

  const handleMakeDefault = (smtp) => {
    if (smtp.is_default) return;

    confirmDialog({
      title: "Set as Default",
      message: `Set "${smtp.from_email}" as default SMTP for this company?`,
      type: "info",
      onConfirm: () => setDefaultSmtp(smtp.id),
    });
  };

  const handleToggleActive = (smtp) => {
    const action = smtp.is_active ? "deactivate" : "activate";

    confirmDialog({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} SMTP`,
      message: `Are you sure you want to ${action} "${smtp.from_email}"?`,
      type: smtp.is_active ? "warning" : "info",
      onConfirm: () =>
        toggleActiveSmtp({ id: smtp.id, is_active: !smtp.is_active }),
    });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingSmtp(null);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <EmailIcon sx={{ fontSize: 20, color: "primary.main" }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          SMTP Settings ({company.mailSettings?.length || 0})
        </Typography>
        <IconButton
          size="small"
          onClick={handleCreateSMTP}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 24,
            height: 24,
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            +
          </Typography>
        </IconButton>
      </Box>

      {company.mailSettings?.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            color: "text.secondary",
          }}
        >
          <EmailIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
          <Typography variant="body2">No SMTP configurations yet</Typography>
          <Typography variant="caption">
            Click + to add your first SMTP
          </Typography>
        </Box>
      ) : (
        company.mailSettings?.map((smtp) => (
          <SMTPCard key={smtp.id} isDefault={smtp.is_default}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              {/* SMTP Header */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {smtp.from_name || smtp.from_email}
                  </Typography>
                  {smtp.is_default && (
                    <Chip
                      label="Default"
                      size="small"
                      color="success"
                      sx={{ height: 20, fontSize: 11 }}
                    />
                  )}
                  {smtp.encryption && (
                    <Tooltip
                      title={`Secure Connection (${smtp.encryption.toUpperCase()})`}
                    >
                      <LockIcon sx={{ fontSize: 16, color: "success.main" }} />
                    </Tooltip>
                  )}
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  {/* Edit Button */}
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleEditSMTP(smtp)}
                    >
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>

                  {/* Delete Button */}
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(smtp)}
                      disabled={smtp.is_default}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>

                  {/* Status Icon */}
                  <Tooltip
                    title={
                      smtp.is_active
                        ? "Active - Click to deactivate"
                        : "Inactive - Click to activate"
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleToggleActive(smtp)}
                      disabled={smtp.is_default && smtp.is_active}
                    >
                      {smtp.is_active ? (
                        <CheckCircleIcon
                          sx={{ fontSize: 18, color: "success.main" }}
                        />
                      ) : (
                        <WarningIcon sx={{ fontSize: 18, color: "warning.main" }} />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* Expand Button */}
                  <ExpandButton
                    expanded={expandedSMTP === smtp.id}
                    onClick={() => handleSMTPToggle(smtp.id)}
                    size="small"
                  >
                    <ExpandMoreIcon />
                  </ExpandButton>
                </Box>
              </Box>

              {/* Collapsed Content */}
              <Collapse
                in={expandedSMTP === smtp.id}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 2 }} />

                  {/* SMTP Details */}
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Email:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {smtp.from_email}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Host:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {smtp.host}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Port:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {smtp.port}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Username:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {smtp.username}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">
                        Encryption:
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {smtp.encryption?.toUpperCase() || "None"}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Set as Default Toggle */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <StyledTooltip
                        title="Set this SMTP configuration as default for sending emails"
                        arrow
                      >
                        <icons.INFO
                          sx={{
                            fontSize: 16,
                            color: "info.main",
                            cursor: "help",
                          }}
                        />
                      </StyledTooltip>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Set as Default
                      </Typography>
                    </Box>
                    <IOSSwitch
                      checked={smtp.is_default}
                      onChange={() => handleMakeDefault(smtp)}
                      disabled={smtp.is_default}
                    />
                  </Box>
                </Box>
              </Collapse>
            </CardContent>
          </SMTPCard>
        ))
      )}

      <SheetDrawer open={isDrawerOpen} onClose={handleCloseDrawer}>
        <SMTPForm
          companyId={company.id}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseDrawer}
          initialData={editingSmtp}
        />
      </SheetDrawer>
    </Box>
  );
};

export default SmtpCard;
