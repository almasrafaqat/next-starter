import { styled, alpha } from "@mui/material/styles";
import { Box, Button, Link as MuiLink } from "@mui/material";

export const FooterWrap = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: `${theme.spacing(6)} 0`,
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)}, transparent 200px)`,
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
}));

export const FooterBrand = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  "& .logo": {
    color: theme.palette.primary.main,
    fontSize: 28,
  },
  "& .text": {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1,
  },
  "& strong": {
    fontWeight: 900,
    letterSpacing: -0.3,
  },
  "& span": {
    color: theme.palette.text.secondary,
    fontSize: 12,
    marginTop: 4,
  },
}));

export const FooterLink = styled(MuiLink)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.text.secondary,
  textDecoration: "none",
  width: "fit-content",
  "&:hover": {
    color: theme.palette.text.primary,
    textDecoration: "underline",
    textUnderlineOffset: 4,
  },
}));

export const SocialBtn = styled(Button)(({ theme }) => ({
  minWidth: 42,
  height: 42,
  borderRadius: 12,
  padding: 0,
  color: theme.palette.text.secondary,
  border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    color: theme.palette.primary.main,
  },
}));

export const FooterBottom = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));