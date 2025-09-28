import { Snackbar, Paper, Typography, Box, CircularProgress, LinearProgress, IconButton } from "@mui/material";
import { useSnackbar } from "@/hooks/useSnackbar";
import { CheckCircle, Info, Warning, Error, Close } from "@mui/icons-material";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const getIconAndColor = (severity) => {
  const styles = {
    success: {
      backgroundColor: "#4caf50",
      color: "#ffffff",
      icon: <CheckCircle />,
    },
    info: {
      backgroundColor: "#2196f3",
      color: "#ffffff",
      icon: <Info />,
    },
    warning: {
      backgroundColor: "#ff9800",
      color: "#ffffff",
      icon: <Warning />,
    },
    error: {
      backgroundColor: "#f44336",
      color: "#ffffff",
      icon: <Error />,
    },
  };

  return styles[severity] || styles.info;
};

export const ReusableSnackbar = () => {
  const {
    open,
    message,
    severity,
    progress,
    showProgress,
    action,
    position,
    closeSnackbar,
  } = useSnackbar();

  const { isRtl } = useResponsiveLayout();
  const { backgroundColor, color, icon } = getIconAndColor(severity);

  // Use a custom Paper component instead of Alert to have more control
  const CustomSnackbarContent = (
    <Paper
      elevation={6}
      sx={{
        backgroundColor,
        color,
        padding: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        minWidth: showProgress ? 350 : 'auto',
        maxWidth: showProgress ? 450 : 400,
      }}
    >
      {/* Header with icon and close button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: showProgress ? 1 : 0 }}>
        {!showProgress && (
          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
            {icon}
          </Box>
        )}

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          gap: 1
        }}>
          {showProgress && (
            <CircularProgress
              size={20}
              color="inherit"
              sx={{ flexShrink: 0 }}
            />
          )}
          <Typography
            variant="body1"
            color="white"
            sx={{ fontWeight: showProgress ? 'normal' : 'medium' }}>
            {message}
          </Typography>
        </Box>

        {!showProgress && (
          <IconButton
            size="small"
            onClick={closeSnackbar}
            sx={{
              color: 'inherit',
              opacity: 0.7,
              '&:hover': { opacity: 1 },
              ml: 1,
              p: 0.5
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Progress bar */}
      {showProgress && progress !== null && (
        <Box sx={{ width: '100%', mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.3)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 3,
              }
            }}
          />
          <Typography
            variant="caption"
            sx={{ display: 'block', textAlign: 'right', mt: 0.5, opacity: 0.8 }}
          >
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      )}

      {/* Warning message */}
      {showProgress && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 1,
            opacity: 0.8,
            textAlign: 'center'
          }}
        >
          Please do not close the browser
        </Typography>
      )}

      {/* Custom action if provided */}
      {action && (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {action}
        </Box>
      )}
    </Paper>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={showProgress ? null : 6000}
      onClose={closeSnackbar}
      anchorOrigin={
        position ||
        { vertical: "bottom", horizontal: "center" }
      }
      sx={{
        '& .MuiSnackbarContent-root': {
          padding: 0,
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }
      }}
    >
      {CustomSnackbarContent}
    </Snackbar>
  );
};