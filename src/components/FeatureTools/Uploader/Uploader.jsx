"use client";

import React from "react";
import { Box, Button, Typography, alpha } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CardSurface } from "@/components/features/DocToPdf/DocToPdf.styles";

export default function Uploader({ onUpload }) {
  const inputRef = React.useRef(null);
  const handlePick = () => inputRef.current?.click();
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) onUpload(f);
  };

  return (
    <CardSurface sx={{ textAlign: "center", py: 6 }}>
      <UploadFileIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h6" fontWeight={800}>
        Import Excel or Word
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Supported: .xlsx, .xls, .csv, .docx
      </Typography>
      <Button variant="contained" onClick={handlePick}>
        Choose File
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv,.docx"
        hidden
        onChange={handleChange}
      />
    </CardSurface>
  );
}