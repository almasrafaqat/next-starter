import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Button } from "@mui/material";

export const HeaderBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: "blur(10px)",
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

export const Brand = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: theme.palette.text.primary,
  textDecoration: "none",
  "& .logo": {
    color: theme.palette.primary.main,
    fontSize: 28,
  },
  "& .text": {
    fontWeight: 900,
    letterSpacing: -0.4,
    fontSize: 18,
    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(
      theme.palette.text.primary,
      0.6
    )})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

export const NavGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

export const NavLinkBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
  },
}));

export const CtaButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 800,
  borderRadius: 10,
  boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.28)}`,
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
  },
}));

export const MobileOnly = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: { display: "inline-flex" },
}));

export const DesktopOnly = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  [theme.breakpoints.down("sm")]: { display: "none" },
}));

export const Glow = styled("div")(({ theme }) => ({
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  background: `radial-gradient(800px 200px at 50% -100px, ${alpha(
    theme.palette.primary.main,
    0.15
  )}, transparent 60%)`,
  zIndex: 0,
}));