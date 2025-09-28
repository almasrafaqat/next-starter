import { styled, alpha } from "@mui/material/styles"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box
} from "@mui/material"

// Advanced styled components with responsive design
export const StyledDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "styleProps",
})(({ theme, styleProps }) => {
  const { size, variant, borderRadius, elevation } = styleProps || {}

  return {
    "& .MuiDialog-paper": {
      borderRadius:
        borderRadius === "none"
          ? 0
          : borderRadius === "small"
            ? theme.spacing(1)
            : borderRadius === "large"
              ? theme.spacing(3)
              : theme.spacing(2),
      boxShadow: theme.shadows[elevation || 24],
      background:
        variant === "glass" ? `${alpha(theme.palette.background.paper, 0.8)}` : theme.palette.background.paper,
      backdropFilter: variant === "glass" ? "blur(20px)" : "none",
      border: variant === "outlined" ? `1px solid ${theme.palette.divider}` : "none",
      overflow: "hidden",

      // Responsive sizing
      [theme.breakpoints.down(350)]: {
        margin: theme.spacing(1),
        width: `calc(100vw - ${theme.spacing(2)})`,
        maxWidth: "none",
        maxHeight: `calc(100vh - ${theme.spacing(2)})`,
      },
      [theme.breakpoints.between(350, 600)]: {
        margin: theme.spacing(2),
        width: `calc(100vw - ${theme.spacing(4)})`,
        // maxWidth: size === "small" ? 320 : size === "large" ? 480 : 400,
      },
      [theme.breakpoints.between(600, 960)]: {
        maxWidth:
          size === "small" ? 360 : size === "medium" ? 480 : size === "large" ? 600 : size === "xlarge" ? 720 : 480,
      },
      [theme.breakpoints.up(960)]: {
        maxWidth:
          size === "small" ? 400 : size === "medium" ? 600 : size === "large" ? 800 : size === "xlarge" ? 1000 : 600,
      },
    },

    "& .MuiBackdrop-root": {
      backgroundColor:
        variant === "glass" ? alpha(theme.palette.common.black, 0.3) : alpha(theme.palette.common.black, 0.5),
    },
  }
})

export const StyledDialogTitle = styled(DialogTitle, {
  shouldForwardProp: (prop) => prop !== "styleProps",
})(({ theme, styleProps }) => {
  const { variant, padding } = styleProps || {}

  return {
    padding:
      padding === "compact" ? theme.spacing(2) : padding === "comfortable" ? theme.spacing(3) : theme.spacing(2.5),
    paddingBottom: theme.spacing(1),
    background:
      variant === "gradient"
        ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
        : "transparent",
    color: variant === "gradient" ? theme.palette.primary.contrastText : "inherit",
    borderBottom: variant === "outlined" ? `1px solid ${theme.palette.divider}` : "none",

    "& .MuiTypography-root": {
      fontWeight: 600,
      fontSize: "1.25rem",
      [theme.breakpoints.down(600)]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.down(350)]: {
        fontSize: "1rem",
      },
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 56,

    [theme.breakpoints.down(600)]: {
      minHeight: 48,
    },
  }
})

export const StyledDialogContent = styled(DialogContent, {
  shouldForwardProp: (prop) => prop !== "styleProps",
})(({ theme, styleProps }) => {
  const { padding, gap, layout } = styleProps || {}

  return {
    padding:
      padding === "none"
        ? 0
        : padding === "compact"
          ? theme.spacing(2)
          : padding === "comfortable"
            ? theme.spacing(3)
            : theme.spacing(2.5),
    paddingTop: `${theme.spacing(2)} !important`,

    "& > *:not(:last-child)": {
      marginBottom: gap === "compact" ? theme.spacing(1) : gap === "comfortable" ? theme.spacing(3) : theme.spacing(2),
    },

    // Layout-specific styles
    ...(layout === "loading" && {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 120,
      textAlign: "center",
    }),

    ...(layout === "confirm" && {
      textAlign: "center",
    }),

    [theme.breakpoints.down(600)]: {
      padding: padding === "none" ? 0 : theme.spacing(2),
    },
  }
})

export const StyledDialogActions = styled(DialogActions, {
  shouldForwardProp: (prop) => prop !== "styleProps",
})(({ theme, styleProps }) => {
  const { padding, layout } = styleProps || {}

  return {
    padding:
      padding === "compact" ? theme.spacing(1.5) : padding === "comfortable" ? theme.spacing(3) : theme.spacing(2),
    paddingTop: theme.spacing(1),
    gap: theme.spacing(1),

    ...(layout === "stacked" && {
      flexDirection: "column",
      "& > *": {
        width: "100%",
      },
    }),

    [theme.breakpoints.down(600)]: {
      flexDirection: layout === "responsive" ? "column" : "row",
      "& > *": {
        ...(layout === "responsive" && {
          width: "100%",
        }),
      },
    },

    [theme.breakpoints.down(350)]: {
      flexDirection: "column",
      "& > *": {
        width: "100%",
      },
    },
  }
})

export const IconContainer = styled(Box)(({ theme, variant }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 48,
  height: 48,
  borderRadius: "50%",
  marginBottom: theme.spacing(2),
  backgroundColor:
    variant === "warning"
      ? alpha(theme.palette.warning.main, 0.1)
      : variant === "error"
        ? alpha(theme.palette.error.main, 0.1)
        : variant === "success"
          ? alpha(theme.palette.success.main, 0.1)
          : variant === "info"
            ? alpha(theme.palette.info.main, 0.1)
            : variant === "help"
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.main, 0.1),

  "& .MuiSvgIcon-root": {
    fontSize: 24,
    color:
      variant === "warning"
        ? theme.palette.warning.main
        : variant === "error"
          ? theme.palette.error.main
          : variant === "success"
            ? theme.palette.success.main
            : variant === "info"
              ? theme.palette.info.main
              : variant === "help"
                ? theme.palette.primary.main
                : theme.palette.primary.main,
  },
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
  zIndex: 1,

  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.1),
  },

  [theme.breakpoints.down(600)]: {
    right: theme.spacing(0.5),
    top: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
}))
