"use client"

import { styled, keyframes, alpha } from "@mui/material/styles"
import { Box, ButtonBase } from "@mui/material"

// Subtle pulse ring animation
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.14); }
  70% { box-shadow: 0 0 0 10px rgba(0,0,0,0); }
  100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
`

// Soft shimmer
const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`

// Floating Action Button style (mobile-first)
export const FloatingButton = styled(ButtonBase)(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.tooltip + 1,
  bottom: 16,
  left: 16,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 999,
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  color: theme.palette.text.primary,
  boxShadow: `0 0 0 0 ${alpha(theme.palette.primary.main, 0.16)}`,
  animation: `${pulse} 2.6s ease-out infinite`,
  transition: theme.transitions.create(["transform", "box-shadow"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[6],
  },
}))

// Shimmer pill (nice on desktop headers)
export const ShimmerPill = styled(ButtonBase)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 999,
  color: theme.palette.primary.contrastText,
  background: theme.gradientBg,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 3.5s linear infinite`,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create(["transform", "box-shadow", "filter"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[6],
    filter: "brightness(1.03)",
  },
}))

// Left edge rail handle (peeks from edge)
export const RailHandle = styled(Box)(({ theme }) => ({
  position: "fixed",
  zIndex: theme.zIndex.tooltip + 1,
  top: "50%",
  left: 0,
  transform: "translateY(-50%)",
  width: 18,
  height: 80,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  backgroundColor: theme.palette.background.alternate,
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: "none",
  boxShadow: theme.shadows[3],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(["transform", "box-shadow"], {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    transform: "translateY(-50%) translateX(1px)",
    boxShadow: theme.shadows[6],
  },
}))
