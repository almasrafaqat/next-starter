import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Paper } from "@mui/material";

export const AppShell = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.03
  )} 0%, ${theme.palette.background.default} 400px)`,
  position: "relative",
}));

export const HeaderBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(12px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.05)}`,
}));

export const CardSurface = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(3),
  border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.02
  )}, ${alpha(theme.palette.background.paper, 1)})`,
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: alpha(theme.palette.primary.main, 0.4),
    transform: "translateY(-2px)",
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
  },
}));

export const FabBar = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  background: `linear-gradient(180deg, transparent, ${alpha(
    theme.palette.background.paper,
    0.95
  )} 20%, ${theme.palette.background.paper} 100%)`,
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  backdropFilter: "blur(12px)",
  boxShadow: `0 -4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    gap: theme.spacing(1.5),
  },
}));