import { styled, Typography } from "@mui/material";

export const Heading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "borderColor" && prop !== "underline",
})(({ theme, borderColor, align, underline }) => ({
  textAlign: align || "left",
  fontWeight: 600,
  color: theme.palette.secondary.dark, // ✅ match this color
  fontSize: theme.typography.h6.fontSize, // ✅ use MUI's variant size
  lineHeight: theme.typography.h6.lineHeight, // optional
  borderBottom: underline ? `1px solid ${theme.palette.divider}` : "none",
  paddingBottom: underline ? "0.3rem" : 0,
  position: "relative",

  "&::after": underline
    ? {
        content: '""',
        width: "80px",
        height: "2px",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: borderColor || theme.palette.primary.main,
        [theme.breakpoints.down("sm")]: {
          width: "60px",
        },
      }
    : {},
}));