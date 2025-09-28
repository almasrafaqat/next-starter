"use client"
import { Button, CircularProgress, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"

const StyledLoadMoreButton = styled(Button)(({ theme, variant = "primary" }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  fontWeight: theme.typography.button.fontWeight,
  textTransform: theme.typography.button.textTransform,
  transition: theme.transitions.create(["background-color", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.short,
  }),
  minHeight: 48,
  position: "relative",

  // Primary variant (default)
  ...(variant === "primary" && {
    // backgroundColor: theme.palette.primary.main,
    background: theme.gradientBg,
    color: theme.palette.primary.contrastText,
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      // backgroundColor: theme.palette.primary.dark,
      background: theme.gradientBgHover,
      // borderColor: theme.palette.primary.dark,
      boxShadow: theme.shadows[4],
    },
    "&:disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabledBackground,
    },
  }),

  // Secondary variant
  ...(variant === "secondary" && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    border: `2px solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.dark,
      boxShadow: theme.shadows[4],
    },
    "&:disabled": {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabledBackground,
    },
  }),

  // Outlined variant
  ...(variant === "outlined" && {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      boxShadow: theme.shadows[2],
    },
    "&:disabled": {
      backgroundColor: "transparent",
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabled,
    },
  }),
}))

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: "inherit",
}))

const LoadMore = ({
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  children = "Load More",
  loadingText = "Loading...",
  startIcon,
  endIcon,
  sx = {},
  ...props
}) => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: fullWidth ? "100%" : "auto",
        ...sx,
      }}
    >
      <StyledLoadMoreButton
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={loading ? <LoadingSpinner size={16} /> : startIcon}
        endIcon={!loading ? endIcon : null}
        {...props}
      >
        {loading ? loadingText : children}
      </StyledLoadMoreButton>
    </Box>
  )
}

export default LoadMore
