import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: theme.palette.primary.main,
}));
