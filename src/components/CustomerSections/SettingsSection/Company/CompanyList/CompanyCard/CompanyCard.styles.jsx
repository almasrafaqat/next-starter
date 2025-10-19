import { Box, Card, styled, Tooltip } from "@mui/material";

// Styled Components
export const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

export const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
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

export const ToggleRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1.5),
}));