import { styled, alpha } from "@mui/material/styles";
import { Box, Paper, Chip } from "@mui/material";

export const SectionWrap = styled("section")(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(
    theme.palette.background.default,
    1
  )} 40%)`,
}));

export const Glow = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  background: `radial-gradient(900px 240px at 50% -120px, ${alpha(
    theme.palette.primary.main,
    0.2
  )}, transparent 60%)`,
}));

export const HeroWrap = styled("div")(({ theme }) => ({
  padding: `${theme.spacing(6)} 0`,
  [theme.breakpoints.up("md")]: { padding: `${theme.spacing(10)} 0` },
}));

export const Badge = styled("span")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
}));

export const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
  background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 1)}, ${alpha(
    theme.palette.primary.main,
    0.02
  )})`,
  display: "grid",
  gap: 8,
  height: "100%",
  transition: "transform .25s ease, box-shadow .25s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 12px 30px ${alpha(theme.palette.common.black, 0.12)}`,
  },
}));

export const IconCircle = styled("div")(({ theme }) => ({
  width: 44,
  height: 44,
  display: "grid",
  placeItems: "center",
  borderRadius: 12,
  color: theme.palette.primary.main,
  background: alpha(theme.palette.primary.main, 0.1),
  marginBottom: 4,
  "& svg": { fontSize: 22 },
}));

export const MiniInvoice = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 18,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
  background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 1)}, ${alpha(
    theme.palette.primary.main,
    0.03
  )})`,
  position: "relative",
  zIndex: 1,
}));

export const TotalsRow = styled("div")(({ theme, bold }) => ({
  marginTop: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontWeight: bold ? 800 : 600,
}));

export const StatusPill = styled(Chip)(({ theme }) => ({
  fontWeight: 700,
  "& .MuiChip-label": { paddingInline: 10 },
}));

export const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.divider, 0.25)}`,
  background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 1)}, ${alpha(
    theme.palette.primary.main,
    0.02
  )})`,
}));

export const SwiperWrap = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBottom: theme.spacing(1),
  // Clip slides to the column to prevent overlap with the invoice panel
  "& .swiper": { overflow: "hidden" },
  "& .swiper-wrapper": { alignItems: "stretch" },
  "& .swiper-slide": { height: "auto" },
  "& .swiper-pagination": {
    position: "relative",
    marginTop: theme.spacing(2),
  },
  "& .swiper-pagination-bullet": {
    background: theme.palette.text.disabled,
    opacity: 0.5,
    width: 8,
    height: 8,
  },
  "& .swiper-pagination-bullet-active": {
    background: theme.palette.primary.main,
    opacity: 1,
    transform: "scale(1.2)",
  },
}));