import { Card, IconButton, styled, Tooltip, alpha } from "@mui/material";

// FIX: Filter out isDefault prop from DOM
export const SMTPCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isDefault",
})(({ theme, isDefault }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: isDefault
    ? alpha(theme.palette.success.main, 0.08)
    : theme.palette.background.paper,
  border: isDefault
    ? `1px solid ${theme.palette.success.main}`
    : `1px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease",
}));

// FIX: Filter out expanded prop from DOM
export const ExpandButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "expanded",
})(({ theme, expanded }) => ({
  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  "& .MuiTooltip-tooltip": {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    fontSize: 12,
    padding: theme.spacing(1, 1.5),
  },
  "& .MuiTooltip-arrow": {
    color: theme.palette.grey[800],
  },
}));
