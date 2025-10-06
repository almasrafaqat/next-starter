import { Box, Typography, Stack, Chip, IconButton } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

function MobileView({ taxType, taxValue, taxAmount, items }) {
  const [showDetail, setShowDetail] = useState(false);

  if (taxType === "none" || !taxValue) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          p: 1,
          border: "1px solid #ccc",
          borderRadius: 2,
          bgcolor: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" fontWeight={700}>
          Invoice Tax
        </Typography>
        <IconButton
          size="small"
          aria-label="Show tax details"
          onClick={() => setShowDetail((v) => !v)}
        >
          <InfoOutlinedIcon color={showDetail ? "primary" : "action"} fontSize="small" />
        </IconButton>
      </Box>
      {showDetail && (
        <Box
          sx={{
            mt: 1,
            p: 1,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            bgcolor: "#f5f5f5",
          }}
        >
          <Typography variant="caption" sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
            <ReceiptLongIcon color="primary" fontSize="small" />
            {taxType === "percentage"
              ? `${taxValue}% tax`
              : taxType === "fixed"
              ? `${taxValue} fixed tax`
              : ""}
          </Typography>
          <Stack direction="column" spacing={0.5}>
            <Typography variant="caption" sx={{ color: "#616161", display: "flex", alignItems: "center", gap: 0.5 }}>
              <PriceCheckIcon fontSize="small" color="action" />
              Tax Amount: <strong>{taxAmount.toFixed(2)}</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: "#616161", display: "flex", alignItems: "center", gap: 0.5 }}>
              Applied to {items.length} items
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function DesktopView({ taxType, taxValue, taxAmount, items }) {
  if (taxType === "none" || !taxValue) return null;

  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Invoice Tax Details
      </Typography>
      <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ReceiptLongIcon color="primary" fontSize="small" />
        {taxType === "percentage"
          ? `${taxValue}% tax`
          : taxType === "fixed"
          ? `${taxValue} fixed tax`
          : ""}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Tax Amount: <strong>{taxAmount.toFixed(2)}</strong>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Applied to {items.length} items
      </Typography>
    </Box>
  );
}

export default function TaxDisplay({ taxType, taxValue, taxAmount, items }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <MobileView
        taxType={taxType}
        taxValue={taxValue}
        taxAmount={taxAmount}
        items={items}
      />
    );
  }

  return (
    <DesktopView
      taxType={taxType}
      taxValue={taxValue}
      taxAmount={taxAmount}
      items={items}
    />
  );
}