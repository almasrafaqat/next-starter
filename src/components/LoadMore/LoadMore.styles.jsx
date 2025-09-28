import { styled } from "@mui/material/styles"
import { Button, CircularProgress } from "@mui/material"

// Alternative styled components approach for more complex styling needs
export const LoadMoreContainer = styled("div")(({ theme, fullWidth }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: fullWidth ? "100%" : "auto",
  margin: theme.spacing(2, 0),
}))

export const AnimatedLoadMoreButton = styled(Button)(({ theme, variant = "primary" }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius,
  fontWeight: theme.typography.button.fontWeight,
  textTransform: theme.typography.button.textTransform,
  minHeight: 48,
  position: "relative",
  overflow: "hidden",

  // Animated background effect
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
    transition: theme.transitions.create("left", {
      duration: theme.transitions.duration.complex,
    }),
  },

  "&:hover::before": {
    left: "100%",
  },

  // Primary variant styling
  ...(variant === "primary" && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: `2px solid ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark,
      transform: "translateY(-2px)",
      boxShadow: `0 6px 20px rgba(${Number.parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${Number.parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${Number.parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.3)`,
    },
  }),

  // Secondary variant styling
  ...(variant === "secondary" && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    border: `2px solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.dark,
      transform: "translateY(-2px)",
      boxShadow: `0 6px 20px rgba(${Number.parseInt(theme.palette.secondary.main.slice(1, 3), 16)}, ${Number.parseInt(theme.palette.secondary.main.slice(3, 5), 16)}, ${Number.parseInt(theme.palette.secondary.main.slice(5, 7), 16)}, 0.3)`,
    },
  }),

  // Transition effects
  transition: theme.transitions.create(["background-color", "transform", "box-shadow", "border-color"], {
    duration: theme.transitions.duration.short,
  }),

  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
    borderColor: theme.palette.action.disabledBackground,
    transform: "none",
    boxShadow: "none",
  },
}))

export const PulsingSpinner = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: "inherit",
  animation: "pulse 1.5s ease-in-out infinite",
  "@keyframes pulse": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      opacity: 1,
    },
  },
}))
