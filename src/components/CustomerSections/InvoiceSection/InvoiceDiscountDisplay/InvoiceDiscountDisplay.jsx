import { Box, Typography, Chip, Stack, IconButton } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

function MobileView({ discountType, discountValue, discountName, affectedItems, getDiscountedPrice }) {
  const [showDetail, setShowDetail] = useState(false);

  if (!affectedItems.length) return null;

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
          Invoice Discount
        </Typography>
        <IconButton
          size="small"
          aria-label="Show invoice discount details"
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
            <LocalOfferIcon color="primary" fontSize="small" />
            {discountType === "percentage"
              ? `${discountName ? discountName + ": " : ""}${discountValue}% off`
              : discountType === "fixed"
              ? `${discountName ? discountName + ": " : ""}${discountValue} off`
              : ""}
          </Typography>
          <Stack direction="column" spacing={0.5}>
            {affectedItems.map(item => {
              const qty = Number(item.quantity) || 0;
              const price = Number(item.price) || 0;
              const original = qty * price;
              const discounted = getDiscountedPrice(item);
              const discountAmount = original - discounted;
              return (
                <Box key={item.title} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip label={item.title} size="small" />
                  <Typography variant="caption" sx={{ color: "#616161", display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PriceCheckIcon fontSize="small" color="action" />
                    {original.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#388e3c", display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PriceCheckIcon fontSize="small" color="success" />
                    {discounted.toFixed(2)}
                    
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function DesktopView({ discountType, discountValue, discountName, affectedItems, getDiscountedPrice }) {
  if (!affectedItems.length) return null;

  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Invoice Discount Details
      </Typography>
      <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocalOfferIcon color="primary" fontSize="small" />
        {discountType === "percentage"
          ? `${discountName ? discountName + ": " : ""}${discountValue}% off`
          : discountType === "fixed"
          ? `${discountName ? discountName + ": " : ""}${discountValue} off`
          : ""}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Applied Items:
      </Typography>
      <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
        {affectedItems.map(item => {
          const qty = Number(item.quantity) || 0;
          const price = Number(item.price) || 0;
          const original = qty * price;
          const discounted = getDiscountedPrice(item);

          return (
            <Box key={item.title} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip label={item.title} />
              <Typography variant="body2" sx={{ color: "#616161", display: "flex", alignItems: "center", gap: 0.5 }}>
                <PriceCheckIcon fontSize="small" color="action" />
                Original: <strong>{original.toFixed(2)}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: "#388e3c", display: "flex", alignItems: "center", gap: 0.5 }}>
                <PriceCheckIcon fontSize="small" color="success" />
                Discounted: <strong>{discounted.toFixed(2)}</strong>
              </Typography>
              <Typography variant="body2" color="primary.main">
                {discountType === "percentage"
                  ? `(${discountValue}% off)`
                  : discountType === "fixed"
                  ? `(-${discountValue})`
                  : ""}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

export default function InvoiceDiscountDisplay({ discountType, discountValue, items, discountName }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (discountType === "none" || !discountValue) return null;

  const affectedItems = items.filter(
    item => !item.itemHasDiscount && !item.excludeFromInvoiceDiscount
  );

  const getDiscountedPrice = (item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    const original = qty * price;
    let discounted = original;

    if (discountType === "percentage") {
      discounted = original - (original * Number(discountValue)) / 100;
    } else if (discountType === "fixed") {
      discounted = original - Number(discountValue);
    }
    return discounted > 0 ? discounted : 0;
  };

  if (isMobile) {
    return (
      <MobileView
        discountType={discountType}
        discountValue={discountValue}
        discountName={discountName}
        affectedItems={affectedItems}
        getDiscountedPrice={getDiscountedPrice}
      />
    );
  }

  return (
    <DesktopView
      discountType={discountType}
      discountValue={discountValue}
      discountName={discountName}
      affectedItems={affectedItems}
      getDiscountedPrice={getDiscountedPrice}
    />
  );
}