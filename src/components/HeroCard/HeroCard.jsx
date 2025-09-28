"use client";

import {
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent
} from "@mui/material";

export default function HeroCard({
  title,
  subtitle,
  description,
  content
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mt: { xs: -6, sm: -12 },
        zIndex: 10,
      }}
    >


      {/* White Card Section */}
      <Card
        elevation={4}
        sx={{
          borderRadius: 2,
          p: 0.5,
          position: "relative",
          zIndex: 30,
        }}
      >
        <CardContent>
          {title && (
            <Typography
              color="secondary.dark"
              variant="h6"
              fontWeight={600} mt={0.5}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {description}
            </Typography>
          )}
          {content}
        </CardContent>
      </Card>
    </Box>
  );
}
