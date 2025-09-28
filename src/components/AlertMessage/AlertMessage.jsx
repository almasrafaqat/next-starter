import { Alert, AlertTitle, Typography, Box } from "@mui/material";
import { CheckCircle, Info, Warning, Error } from "@mui/icons-material";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import { useAlert } from "@/hooks/useAlert";

const getAlertStyles = (severity) => {
  const styles = {
    success: {
      backgroundColor: "#4caf50",
      color: "#ffffff",
      icon: <CheckCircle sx={{ color: "#ffffff" }} />,
    },
    info: {
      backgroundColor: "#2196f3",
      color: "#ffffff",
      icon: <Info sx={{ color: "#ffffff" }} />,
    },
    warning: {
      backgroundColor: "#ff9800",
      color: "#ffffff",
      icon: <Warning sx={{ color: "#ffffff" }} />,
    },
    error: {
      backgroundColor: "#f44336",
      color: "#ffffff",
      icon: <Error sx={{ color: "#ffffff" }} />,
    },
  };

  return styles[severity];
};

export const AlertMessage = () => {
  const { open, message, severity, closeAlert } = useAlert();
  const alertStyles = getAlertStyles(severity);
  const { isRtl } = useResponsiveLayout();

  if (!open || !message) return null;

  return (
    <Alert
      onClose={closeAlert}
      severity={severity}
      icon={alertStyles.icon}
      sx={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: alertStyles.backgroundColor,
        color: alertStyles.color,
        "& .MuiAlert-icon": {
          color: alertStyles.color,
        },
        mb: 2,
      }}
    >
      <AlertTitle
        sx={{
          textTransform: "capitalize",
          marginRight: isRtl ? "8px" : "0",
          color: "inherit",
        }}
      >
        {severity}
      </AlertTitle>
      <Box sx={{ mt: 1, maxHeight: "150px", overflowY: "auto" }}>
        <Typography color="inherit" variant="body2">
          {message}
        </Typography>
      </Box>
    </Alert>
  );
};

