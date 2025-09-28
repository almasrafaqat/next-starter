import React from "react";
import { Box, Chip, Button, Paper } from "@mui/material";

export const ActiveFiltersBar = ({
  filters,
  filterConfigs,
  onClear,
  onDelete,
  sx,
}) => {
  const chips = Object.entries(filters)
    .filter(([key, value]) => value && value !== "")
    .map(([key, value]) => {
      const config = filterConfigs.find((f) => f.key === key);
      if (!config) return null;
      let label = config.label + ": ";
      if (config.type === "search") {
        label = "";
      } else {
        label = config.label + ": ";
      }
      if (config.type === "select" || config.type === "autocomplete") {
        if (config.multiple && Array.isArray(value)) {
          label += value
            .map((val) => {
              const option = config.options?.find(
                (o) => o.key === val || o.value === val
              );
              return option?.label || option?.name || val;
            })
            .join(", ");
        } else {
          const option = config.options?.find(
            (o) => o.key === value || o.value === value
          );
          label += option?.label || option?.name || value;
        }
      } else if (config.type === "date" && value) {
        label += new Date(value).toLocaleDateString();
      } else {
        label += value;
      }
      return (
        <Chip
          key={key}
          label={label}
          color="primary"
          size="small"
          onDelete={() =>
            onDelete ? onDelete(key, config.multiple ? [] : "") : undefined
          }
          sx={{
            bgcolor: "primary.light",
            color: "primary.contrastText",
            fontWeight: 500,
            mr: 1,
            mb: 1,
          }}
        />
      );
    });

  if (chips.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        p: 1,
        bgcolor: "primary.lighter",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        ...sx,
      }}
    >
      <Box
        component="span"
        sx={{
          fontWeight: 700,
          color: "primary.main",
          fontSize: "0.95rem",
          mr: 1,
          letterSpacing: "0.04em",
        }}
      >
        Active Filters:
      </Box>
      {chips}
      {onClear && (
        <Button
          size="small"
          color="primary"
          variant="text"
          onClick={onClear}
          sx={{
            ml: 1,
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: "0.85rem",
          }}
        >
          Clear All
        </Button>
      )}
    </Paper>
  );
};
