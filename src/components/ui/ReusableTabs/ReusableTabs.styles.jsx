import { styled } from "@mui/material/styles"
import {
  Tabs,
  Tab,
  Box,
  Paper,
  IconButton,
  Badge,
  Chip
} from "@mui/material"

// Main tabs container
export const StyledTabsContainer = styled(Paper, {
  shouldForwardProp: (prop) => !["styleProps"].includes(prop),
})(({ theme, styleProps }) => ({
  width: "100%",
  backgroundColor: styleProps?.variant === "transparent" ? "transparent" : theme.palette.background.paper,
  boxShadow: styleProps?.elevation !== undefined ? theme.shadows[styleProps.elevation] : theme.shadows[1],
  borderRadius: styleProps?.borderRadius || theme.shape.borderRadius,
  overflow: "hidden",

  // Mobile-first responsive design
  [theme.breakpoints.down("sm")]: {
    margin: 0,
    borderRadius: styleProps?.mobileFullWidth ? 0 : theme.shape.borderRadius,
  },
}))

// Tabs header
export const StyledTabs = styled(Tabs, {
  shouldForwardProp: (prop) => !["styleProps"].includes(prop),
})(({ theme, styleProps }) => ({
  minHeight: styleProps?.compact ? 40 : 48,
  backgroundColor: styleProps?.headerBg || theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,

  "& .MuiTabs-flexContainer": {
    gap: styleProps?.tabSpacing || 0,
  },

  "& .MuiTabs-indicator": {
    height: styleProps?.indicatorHeight || 3,
    backgroundColor: styleProps?.indicatorColor || theme.palette.primary.main,
    borderRadius: "2px 2px 0 0",
  },

  // Scrollable tabs
  "& .MuiTabs-scrollButtons": {
    color: theme.palette.text.secondary,
    "&.Mui-disabled": {
      opacity: 0.3,
    },
  },

  // Mobile responsive
  [theme.breakpoints.down("sm")]: {
    minHeight: styleProps?.compact ? 36 : 44,
    "& .MuiTabs-flexContainer": {
      gap: 0,
    },
  },
}))

// Individual tab
export const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => !["styleProps", "tabType"].includes(prop),
})(({ theme, styleProps, tabType }) => ({
  minHeight: styleProps?.compact ? 40 : 48,
  minWidth: styleProps?.minTabWidth || 90,
  maxWidth: styleProps?.maxTabWidth || 300,
  padding: theme.spacing(1, 2),
  fontSize: styleProps?.fontSize || "0.875rem",
  fontWeight: 500,
  textTransform: styleProps?.textTransform || "none",
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(["color", "background-color"], {
    duration: theme.transitions.duration.short,
  }),

  // Tab types
  ...(tabType === "wizard" && {
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: -8,
      width: 0,
      height: 0,
      borderTop: "12px solid transparent",
      borderBottom: "12px solid transparent",
      borderLeft: `8px solid ${theme.palette.background.default}`,
      transform: "translateY(-50%)",
    },
    "&:first-of-type::before": {
      display: "none",
    },
  }),

  // States
  "&.Mui-selected": {
    color: styleProps?.activeColor || theme.palette.primary.main,
    backgroundColor: styleProps?.activeBg || "transparent",
    fontWeight: 600,
  },

  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    opacity: 0.6,
  },

  "&:hover:not(.Mui-selected):not(.Mui-disabled)": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.hover,
  },

  // Mobile responsive
  [theme.breakpoints.down("sm")]: {
    minHeight: styleProps?.compact ? 36 : 44,
    minWidth: styleProps?.mobileMinWidth || 80,
    padding: theme.spacing(0.5, 1),
    fontSize: "0.8125rem",
  },

  [theme.breakpoints.down("xs")]: {
    minWidth: 60,
    padding: theme.spacing(0.5),
    "& .MuiTab-iconWrapper": {
      marginBottom: 2,
    },
  },
}))

// Tab content container
export const StyledTabPanel = styled(Box, {
  shouldForwardProp: (prop) => !["styleProps"].includes(prop),
})(({ theme, styleProps }) => ({
  padding: styleProps?.contentPadding || theme.spacing(3),
  minHeight: styleProps?.minHeight || 200,
  backgroundColor: styleProps?.contentBg || "transparent",

  // Animation
  opacity: 1,
  transform: "translateX(0)",
  transition: theme.transitions.create(["opacity", "transform"], {
    duration: theme.transitions.duration.short,
  }),

  // Mobile responsive
  [theme.breakpoints.down("sm")]: {
    padding: styleProps?.mobilePadding || theme.spacing(2),
    minHeight: styleProps?.mobileMinHeight || 150,
  },

  [theme.breakpoints.down("xs")]: {
    padding: theme.spacing(1),
  },
}))

// Tab with icon and badge
export const StyledTabContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "100%",

  "& .tab-icon": {
    fontSize: "1.125rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },

  "& .tab-label": {
    flex: 1,
    textAlign: "left",

    [theme.breakpoints.down("xs")]: {
      display: "none", // Hide labels on very small screens, show only icons
    },
  },

  "& .tab-badge": {
    marginLeft: "auto",
  },
}))

// Close button for closable tabs
export const StyledCloseButton = styled(IconButton)(({ theme }) => ({
  padding: 2,
  marginLeft: theme.spacing(0.5),
  color: theme.palette.text.secondary,

  "&:hover": {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.light + "20",
  },

  [theme.breakpoints.down("sm")]: {
    padding: 1,
    "& .MuiSvgIcon-root": {
      fontSize: "0.875rem",
    },
  },
}))

// Loading overlay
export const StyledLoadingOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper + "CC",
  backdropFilter: "blur(2px)",
  zIndex: 1,
}))

// Tab badge
export const StyledTabBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    fontSize: "0.625rem",
    height: 16,
    minWidth: 16,
    padding: "0 4px",
  },
}))

// Tab chip for additional info
export const StyledTabChip = styled(Chip)(({ theme }) => ({
  height: 20,
  fontSize: "0.625rem",

  "& .MuiChip-label": {
    padding: "0 6px",
  },
}))
