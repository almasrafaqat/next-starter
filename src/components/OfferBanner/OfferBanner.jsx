"use client";

import { Box, Typography, Button, Stack } from "@mui/material";

export default function OfferBanner({ data }) {
  if (!data) return null;

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        backgroundColor: "#FFF4E5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        textAlign: { xs: "center", sm: "left" },
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={600}>
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {data.subtitle}
        </Typography>
        <Button variant="contained" color="primary" size="small" sx={{ mt: 2 }}>
          {data.cta}
        </Button>
      </Box>

      {data.image && (
        <Box
          component="img"
          src={data.image}
          alt={data.title}
          sx={{ width: 120, height: 120, objectFit: "contain" }}
        />
      )}
    </Box>
  );
}
