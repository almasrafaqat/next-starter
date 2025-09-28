"use client";

import { forwardRef, useCallback, useMemo } from "react";
import {
  Button,
  Typography,
  Box,
  Slide,
  Fade,
  Grow,
  Zoom,
  TextField,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Backdrop,
} from "@mui/material";
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import { useDialog } from "@/hooks/useDialog";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  IconContainer,
  CloseButton,
} from "./ReusableDialog.styles";

// Transition components
const transitions = {
  fade: Fade,
  slide: forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
  )),
  grow: Grow,
  zoom: Zoom,
};

// Variant icons
const variantIcons = {
  warning: WarningIcon,
  error: ErrorIcon,
  success: SuccessIcon,
  info: InfoIcon,
  help: HelpIcon,
};

/**
 * Ultra-advanced reusable dialog component with comprehensive features
 * Supports multiple layouts, animations, responsive design, and accessibility
 */
const ReusableDialog = forwardRef((props, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const isXSmall = useMediaQuery(theme.breakpoints.down(350));

  const {
    isOpen,
    title,
    content,
    children,
    style,
    layout,
    actions,
    inputValue,
    type,
    close,
    updateInputValue,
  } = useDialog();

  const {
    size = "medium",
    variant = "standard",
    animation = "fade",
    backdrop = true,
    persistent = false,
    fullScreen = false,
    maxWidth = "sm",
    disableEscapeKeyDown = false,
    disableBackdropClick = false,
    keepMounted = false,
    scroll = "paper",
    TransitionComponent = null,
    transitionDuration = 300,
    elevation = 24,
    borderRadius = "default",
    padding = "default",
    gap = "default",
    className = "",
    headerProps = {},
    contentProps = {},
    footerProps = {},
    inputProps = {},
  } = style || {};

  // Memoized style props for performance
  const styleProps = useMemo(
    () => ({
      size: isMobile ? "small" : size,
      variant,
      borderRadius,
      elevation,
      padding,
      gap,
      layout,
    }),
    [size, variant, borderRadius, elevation, padding, gap, layout, isMobile]
  );

  // Dynamic transition component
  const TransitionComp = TransitionComponent || transitions[animation] || Fade;

  // Handle close with callback
  const handleClose = useCallback(
    (event, reason) => {
      if (persistent) return;
      if (disableBackdropClick && reason === "backdropClick") return;
      if (disableEscapeKeyDown && reason === "escapeKeyDown") return;

      close();
    },
    [close, persistent, disableBackdropClick, disableEscapeKeyDown]
  );

  // Handle action clicks
  const handleActionClick = useCallback(
    (action) => {
      if (action.action && typeof action.action === "function") {
        action.action();
      }
      if (!action.keepOpen) {
        close();
      }
    },
    [close]
  );

  // Render variant icon
  const renderIcon = () => {
    if (!type || !variantIcons[type]) return null;

    const IconComponent = variantIcons[type];
    return (
      <IconContainer variant={type}>
        <IconComponent />
      </IconContainer>
    );
  };

  // Render content based on layout
  const renderContent = () => {
    switch (layout) {
      case "loading":
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <CircularProgress size={48} />
            <Typography variant="body1" color="textSecondary">
              {content}
            </Typography>
          </Box>
        );

      case "confirm":
      case "alert":
        return (
          <Box display="flex" flexDirection="column" alignItems="center">
            {renderIcon()}
            <Typography variant="body1" textAlign="center">
              {content}
            </Typography>
          </Box>
        );

      case "prompt":
        return (
          <Box>
            {content && (
              <Typography variant="body1" mb={2}>
                {content}
              </Typography>
            )}
            <TextField
              fullWidth
              variant="outlined"
              autoFocus={type === "prompt"}
              value={inputValue}
              onChange={(e) => updateInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const confirmAction = actions?.confirm;
                  if (confirmAction && confirmAction.action) {
                    confirmAction.action();
                  }
                }
              }}
              {...inputProps}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        );

      default:
        return (
          children ||
          (typeof content === "string" ? (
            <Typography variant="body1">{content}</Typography>
          ) : (
            content
          ))
        );
    }
  };

  // Render action buttons
  const renderActions = () => {
    if (!actions) return null;

    return Object.entries(actions).map(([key, action]) => (
      <Button
        key={key}
        variant={
          action.variant || (key === "cancel" ? "outlined" : "contained")
        }
        color={action.color || (key === "cancel" ? "inherit" : "primary")}
        size={isMobile ? "large" : "medium"}
        onClick={() => handleActionClick(action)}
        disabled={action.disabled}
        startIcon={action.icon}
        sx={{
          minWidth: isMobile ? "auto" : 100,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          ...(action.sx || {}),
        }}
      >
        {action.text}
      </Button>
    ));
  };

  return (
    <StyledDialog
      ref={ref}
      open={isOpen}
      disableAutoFocus={false}
      disableRestoreFocus={false}
      closeAfterTransition={false}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth
      // fullScreen={fullScreen || (isXSmall && layout !== "loading")}
      fullScreen={typeof fullScreen === "boolean" ? fullScreen : (isXSmall && layout !== "loading")}
      keepMounted={keepMounted}
      scroll={scroll}
      styleProps={styleProps}
      className={className}
      TransitionComponent={TransitionComp}
      transitionDuration={transitionDuration}
      BackdropComponent={backdrop ? Backdrop : undefined}
      BackdropProps={{
        sx: { zIndex: (theme) => theme.zIndex.modal + 5 },
        timeout: transitionDuration,
      }}
      PaperProps={{
        elevation: elevation,
        sx: { zIndex: (theme) => theme.zIndex.modal + 5 },
      }}
    >
      {title && (
        <StyledDialogTitle styleProps={styleProps} {...headerProps}>
          <Typography variant="h6" component="span">
            {title}
          </Typography>

          {!persistent && (
            <CloseButton onClick={() => close()} size="small">
              <CloseIcon fontSize="small" />
            </CloseButton>
          )}
        </StyledDialogTitle>
      )}

      <StyledDialogContent styleProps={styleProps} {...contentProps}>
        {renderContent()}
      </StyledDialogContent>

      {(actions ||
        layout === "confirm" ||
        layout === "alert" ||
        layout === "prompt") && (
        <StyledDialogActions styleProps={styleProps} {...footerProps}>
          {renderActions()}
        </StyledDialogActions>
      )}
    </StyledDialog>
  );
});

ReusableDialog.displayName = "ReusableDialog";

export default ReusableDialog;
