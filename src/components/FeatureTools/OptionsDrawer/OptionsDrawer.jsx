"use client";

import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Slider,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function OptionsDrawer({ open, onClose, options, setOptions }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: { xs: 300, sm: 360 }, p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" fontWeight={800}>
            Export Options
          </Typography>
          <Box flex={1} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
          Page Size
        </Typography>
        <ToggleButtonGroup
          value={options.pageSize}
          exclusive
          onChange={(_, v) => v && setOptions({ pageSize: v })}
          sx={{ mb: 2 }}
          size="small"
        >
          <ToggleButton value="a4">A4</ToggleButton>
          <ToggleButton value="letter">Letter</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
          Orientation
        </Typography>
        <ToggleButtonGroup
          value={options.orientation}
          exclusive
          onChange={(_, v) => v && setOptions({ orientation: v })}
          sx={{ mb: 2 }}
          size="small"
        >
          <ToggleButton value="portrait">Portrait</ToggleButton>
          <ToggleButton value="landscape">Landscape</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
          Table Theme
        </Typography>
        <ToggleButtonGroup
          value={options.theme}
          exclusive
          onChange={(_, v) => v && setOptions({ theme: v })}
          sx={{ mb: 2 }}
          size="small"
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
          Margins
        </Typography>
        <Slider
          size="small"
          min={5}
          max={40}
          step={1}
          value={options.margin}
          onChange={(_, v) => setOptions({ margin: v })}
          sx={{ mb: 2 }}
        />

        <TextField
          label="File name"
          size="small"
          fullWidth
          value={options.filename}
          onChange={(e) => setOptions({ filename: e.target.value })}
        />
      </Box>
    </Drawer>
  );
}