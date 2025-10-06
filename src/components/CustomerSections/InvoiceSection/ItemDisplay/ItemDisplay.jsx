import {
  Box,
  Typography,
  Chip,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InvoiceFormatPrice from "@/components/FormatPrice/InvoiceFormatPrice";
import ItemDiscountDisplay from "../ItemDiscountDisplay/ItemDiscountDisplay";

function MobileView({ items, currency }) {
  return (
    <Box sx={{ mt: 2, p: 1, border: "1px solid #eee", borderRadius: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Items Summary
      </Typography>
      <Stack direction="column" spacing={1}>
        {items.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              p: 1,
              bgcolor: "#fafafa",
              borderRadius: 2,
            }}
          >
            <Chip
              label={item.title || "Untitled"}
              size="small"
              sx={{ mb: 0.5 }}
            />
            <Typography variant="caption" sx={{ fontSize: "0.85rem" }}>
              Qty: {item.quantity || 1}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "0.85rem" }}>
              Price:{" "}
              <InvoiceFormatPrice price={item.price || 0} currency={currency} />
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.85rem", color: "success.main" }}
            >
              Subtotal:{" "}
              <InvoiceFormatPrice
                price={(item.quantity || 1) * (item.price || 0)}
                currency={currency}
              />
            </Typography>
            <ItemDiscountDisplay item={item} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

function DesktopView({ items, currency }) {
  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Items Summary
      </Typography>
      <Stack direction="column" spacing={2}>
        {items.map((item, idx) => (
          <Box key={idx}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1" fontWeight={600}>
                {item.title || "Untitled"}
              </Typography>
              <Typography variant="body2">x{item.quantity || 1}</Typography>
              <Typography variant="body2">
                <InvoiceFormatPrice
                  price={item.price || 0}
                  currency={currency}
                />
              </Typography>
              <Typography variant="body2" fontWeight={700} sx={{ ml: 2 }}>
                = Total:{" "}
                <InvoiceFormatPrice
                  price={(item.quantity || 1) * (item.price || 0)}
                  currency={currency}
                />
              </Typography>
            </Box>
            <ItemDiscountDisplay item={item} />
            {idx < items.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default function ItemDisplay({ items, currency = "USD" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!items || items.length === 0) return null;

  return isMobile ? (
    <MobileView items={items} currency={currency} />
  ) : (
    <DesktopView items={items} currency={currency} />
  );
}
