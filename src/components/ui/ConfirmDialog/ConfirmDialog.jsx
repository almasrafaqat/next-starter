"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Box,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Help as HelpIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";

/**
 * A reusable confirmation dialog component
 *
 * @param {Object} props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {string} props.title - The dialog title
 * @param {string} props.message - The dialog message
 * @param {string} props.confirmText - Text for the confirm button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {string} props.type - Dialog type: 'delete', 'warning', 'info', or 'confirm'
 * @param {Function} props.onConfirm - Function to call when confirmed
 * @param {Function} props.onCancel - Function to call when canceled
 * @param {boolean} props.disableBackdropClick - Whether to disable closing on backdrop click
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText,
  cancelText,
  type = "confirm",
  loading = false,
  onConfirm,
  onCancel,
  disableBackdropClick = false,
}) {
  const trans = useTranslations("translations");
  const theme = useTheme();

  // Default texts based on translations
  const defaultConfirmText =
    type === "delete" ? trans("common.delete") : trans("common.confirm");
  const defaultCancelText = trans("common.cancel");

  // Icon and color based on type
  const getIconAndColor = () => {
    switch (type) {
      case "delete":
        return {
          icon: <ErrorIcon fontSize="large" />,
          color: theme.palette.error.main,
          bgColor: alpha(theme.palette.error.main, 0.1),
        };
      case "warning":
        return {
          icon: <WarningIcon fontSize="large" />,
          color: theme.palette.warning.main,
          bgColor: alpha(theme.palette.warning.main, 0.1),
        };
      case "info":
        return {
          icon: <InfoIcon fontSize="large" />,
          color: theme.palette.info.main,
          bgColor: alpha(theme.palette.info.main, 0.1),
        };
      default:
        return {
          icon: <HelpIcon fontSize="large" />,
          color: theme.palette.primary.main,
          bgColor: alpha(theme.palette.primary.main, 0.1),
        };
    }
  };

  const { icon, color, bgColor } = getIconAndColor();

  const handleClose = (event, reason) => {
    if (disableBackdropClick && reason === "backdropClick") {
      return;
    }
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      maxWidth="xs"
      fullWidth
      sx={{ zIndex: theme.zIndex.modal + 1 }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          aria-label="close"
          onClick={onCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 3,
            px: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: bgColor,
              color: color,
              mb: 2,
            }}
          >
            {icon}
          </Box>

          <DialogTitle
            id="confirm-dialog-title"
            sx={{ p: 0, textAlign: "center" }}
          >
            {title}
          </DialogTitle>
        </Box>

        <DialogContent sx={{ pt: 1, pb: 2, px: 3 }}>
          <DialogContentText
            id="confirm-dialog-description"
            sx={{ textAlign: "center" }}
          >
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3, px: 3 }}>
          <Button
            onClick={onCancel}
            color="inherit"
            variant="outlined"
            sx={{ minWidth: 100 }}
            disabled={loading}
          >
            {cancelText || defaultCancelText}
          </Button>
          <Button
            onClick={onConfirm}
            color={type === "delete" ? "error" : "primary"}
            variant="contained"
            autoFocus
            disabled={loading}
            sx={{ minWidth: 100 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              confirmText || defaultConfirmText
            )}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
