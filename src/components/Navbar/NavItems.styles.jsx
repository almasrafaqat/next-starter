"use client"
import { styled, alpha } from "@mui/material/styles"
import { Box, ButtonBase, Typography, Chip } from "@mui/material"

export const NavContainer = styled("nav")(({ theme }) => ({
  width: "100%",
}))

export const NavList = styled("ul")(({ theme, $orientation = "horizontal" }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: $orientation === "vertical" ? "column" : "row",
  gap: $orientation === "vertical" ? theme.spacing(0.5) : theme.spacing(1),
  alignItems: $orientation === "vertical" ? "stretch" : "center",
  justifyContent: "flex-start",
  overflowX: $orientation === "horizontal" ? "auto" : "visible",
  WebkitOverflowScrolling: "touch",
}))

export const NavItemLi = styled("li")(() => ({
  display: "flex",
  marginBottom: 2,
}))

export const NavButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "$active" && prop !== "$orientation" && prop !== "$collapsed",
})(({ theme, $active = false, $orientation = "horizontal", $collapsed = false }) => {
  const activeBg = theme.palette.primary.gradientBg
  const hoverBg = theme.palette.action.hover
  const basePaddingX = $collapsed ? 0.75 : 1.25
  const basePaddingY = 0.75

  return {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing($collapsed ? 0 : 1),
    padding: theme.spacing(basePaddingY, basePaddingX),
    borderRadius: 12,
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition: theme.transitions.create(["background-color", "box-shadow", "transform", "color"], {
      duration: theme.transitions.duration.shorter,
    }),
    color: $active ? theme.palette.primary.white : theme.palette.text.secondary,
    background: $active ? activeBg : "transparent",
    boxShadow: $active ? theme.shadows[2] : "none",

    // Hover uses neutral interaction token when not active
    "&:hover": {
      background: $active ? activeBg : hoverBg,
    },
    "&:active": {
      transform: "translateY(0.5px)",
    },

    // Focus-visible ring for a11y
    "&.Mui-focusVisible": {
      outline: `2px solid ${alpha(theme.palette.primary.main, 0.35)}`,
      outlineOffset: 2,
    },

    // Vertical layout specifics
    ...($orientation === "vertical" && {
      justifyContent: $collapsed ? "center" : "flex-start",
      width: "100%",
      position: "relative",
      // Left active rail
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0,
        top: 6,
        bottom: 6,
        width: 3,
        borderRadius: 2,
        backgroundColor: $active ? theme.palette.primary.main : "transparent",
        transition: theme.transitions.create(["background-color"], {
          duration: theme.transitions.duration.shortest,
        }),
      },
    }),
  }
})

export const IconBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "$active",
})(({ theme, $active }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  color: $active ? theme.palette.primary.white : theme.palette.text.secondary,
  "& svg": {
    fontSize: 20,
  },
}))

export const Label = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "$active",
})(({ theme, $active }) => ({
  fontSize: 14,
  fontWeight: $active ? 600 : 500,
  letterSpacing: 0.2,
  color: "inherit",
}))

export const BadgeChip = styled(Chip)(({ theme }) => ({
  height: 20,
  "& .MuiChip-label": {
    padding: "0 6px",
    fontSize: 11,
    fontWeight: 600,
  },
}))
