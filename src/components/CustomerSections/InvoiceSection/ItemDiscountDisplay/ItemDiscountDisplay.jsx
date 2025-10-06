import { Box, Typography, Stack, IconButton } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import BlockIcon from "@mui/icons-material/Block";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

export default function ItemDiscountDisplay({ item }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDetail, setShowDetail] = useState(false);

  const qty = Number(item.quantity) || 0;
  const price = Number(item.price) || 0;
  const original = qty * price;

  let discountText = "";
  let discounted = original;
  let discountIcon = null;

  if (item.itemHasDiscount && item.itemDiscountType !== "none") {
    const val = Number(item.itemDiscountValue) || 0;
    discountIcon = (
      <LocalOfferIcon
        color="primary"
        fontSize="small"
        sx={{ verticalAlign: "middle" }}
      />
    );
    if (item.itemDiscountType === "percentage") {
      discounted = original - (original * val) / 100;
      discountText = `${val}% off`;
    } else if (item.itemDiscountType === "fixed") {
      discounted = original - val;
      discountText = `${val} off`;
    }
  } else if (
    !item.excludeFromInvoiceDiscount &&
    item.invoiceDiscountType &&
    item.invoiceDiscountType !== "none"
  ) {
    const val = Number(item.invoiceDiscountValue) || 0;
    discountIcon = (
      <LocalOfferIcon
        color="secondary"
        fontSize="small"
        sx={{ verticalAlign: "middle" }}
      />
    );
    if (item.invoiceDiscountType === "percentage") {
      discounted = original - (original * val) / 100;
      discountText = `${val}% off (invoice)`;
    } else if (item.invoiceDiscountType === "fixed") {
      discounted = original - val;
      discountText = `${val} off (invoice)`;
    }
  }

  // If excluded, show message with icon
  if (item.excludeFromInvoiceDiscount) {
    return (
      <Box
        sx={{
          p: isMobile ? 0.5 : 1,
          border: "1px solid #ffe082",
          borderRadius: 2,
          mb: 1,
          bgcolor: "#fffde7",
        }}
      >
        <Typography
          variant={isMobile ? "caption" : "body2"}
          color="warning.main"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: isMobile ? "0.8rem" : undefined,
          }}
        >
          <BlockIcon color="warning" fontSize={isMobile ? "small" : "medium"} />
          <strong>{item.title}</strong> —{" "}
          <span style={{ color: "#ff9800" }}>
            Excluded from invoice discount
          </span>
        </Typography>
      </Box>
    );
  }

  // If no discount and not excluded, show nothing
  if (
    !item.itemHasDiscount &&
    (!item.invoiceDiscountType || item.invoiceDiscountType === "none")
  ) {
    return null;
  }

  // MOBILE: name and icon inline, details below
  if (isMobile) {
    return (
      <Box sx={{ mb: 1 }}>
        <Box
          sx={{
            p: 0.5,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            bgcolor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{ fontSize: "0.95rem" }}
          >
            {item.title}
          </Typography>
          <IconButton
            size="small"
            aria-label="Show discount details"
            onClick={() => setShowDetail((v) => !v)}
          >
            <InfoOutlinedIcon
              color={showDetail ? "primary" : "action"}
              fontSize="small"
            />
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
            <Stack direction="column" spacing={0.5}>
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                {discountIcon}{" "}
                <span style={{ color: "#1976d2" }}>{discountText}</span>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#616161",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <PriceCheckIcon fontSize="small" color="action" />
                Original: <strong>{original.toFixed(2)}</strong>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#388e3c",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <PriceCheckIcon fontSize="small" color="success" />
                Discounted:{" "}
                <strong>
                  {discounted > 0 ? discounted.toFixed(2) : "0.00"}
                </strong>
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    );
  }

  // DESKTOP: show full inline info
  return (
    <Box
      sx={{
        p: 1,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        mb: 1,
        bgcolor: "#fafafa",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        <Typography variant="body2" fontWeight={700} sx={{ minWidth: 80 }}>
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color:
              discountIcon?.props.color === "primary"
                ? "primary.main"
                : "secondary.main",
          }}
        >
          {discountIcon} {discountText}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#616161",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <PriceCheckIcon fontSize="small" color="action" />
          Original: <strong>{original.toFixed(2)}</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#388e3c",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <PriceCheckIcon fontSize="small" color="success" />
          Discounted:{" "}
          <strong>{discounted > 0 ? discounted.toFixed(2) : "0.00"}</strong>
        </Typography>
      </Stack>
    </Box>
  );
}
