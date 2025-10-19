"use client";

import React from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { CardSurface } from "@/components/features/DocToPdf/DocToPdf.styles";

export default function DocxPreview({ file, onRendered }) {
  const containerRef = React.useRef(null);
  const onRenderedRef = React.useRef(onRendered);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    onRenderedRef.current = onRendered;
  }, [onRendered]);

  const fileKey = file ? `${file.name}-${file.size}-${file.lastModified}` : null;

  React.useEffect(() => {
    let cancelled = false;

    if (!file) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // Important: use browser build
        const mammoth = await import("mammoth/mammoth.browser");

        if (cancelled) return;

        const arrayBuffer = await file.arrayBuffer();

        const result = await mammoth.convertToHtml(
          { arrayBuffer },
          {
            includeDefaultStyleMap: true,
            styleMap: [
              "p[style-name='Heading 1'] => h1:fresh",
              "p[style-name='Heading 2'] => h2:fresh",
              "p[style-name='Heading 3'] => h3:fresh",
              "p[style-name='Title'] => h1.title:fresh",
              "p[style-name='Normal (Web)'] => p:fresh",
            ],
            convertImage: mammoth.images.inline(async (el) => {
              const b64 = await el.read("base64");
              return { src: `data:${el.contentType};base64,${b64}` };
            }),
          }
        );

        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = result.value || "";

        // Optional: group warnings once (no spam)
        if (process.env.NODE_ENV !== "production" && result.messages?.length) {
          const grouped = result.messages.reduce((a, m) => {
            a[m.message] = (a[m.message] || 0) + 1;
            return a;
          }, {});
          console.warn("Mammoth conversion warnings:", grouped);
        }

        requestAnimationFrame(() => {
          if (!cancelled && containerRef.current) {
            onRenderedRef.current?.(containerRef.current.scrollHeight);
            setLoading(false);
          }
        });
      } catch (err) {
        console.error("DOCX preview error:", err);
        if (!cancelled) {
          setError(err?.message || "Failed to render document");
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fileKey]);

  return (
    <CardSurface>
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
        Word Preview
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <CircularProgress size={40} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        id="docx-renderer"
        ref={containerRef}
        sx={{
          width: "100%",
          overflow: "auto",
          background: "white",
          borderRadius: 1,
          border: "1px solid rgba(0,0,0,0.08)",
          p: 3,
          maxHeight: 520,
          minHeight: loading ? 200 : "auto",
          "& h1": { fontSize: "1.8rem", fontWeight: 700, mb: 2 },
          "& h2": { fontSize: "1.5rem", fontWeight: 600, mb: 1.5 },
          "& h3": { fontSize: "1.2rem", fontWeight: 600, mb: 1 },
          "& p": { mb: 1, lineHeight: 1.6 },
          "& ul, & ol": { pl: 3, mb: 1 },
          "& table": { width: "100%", borderCollapse: "collapse", mb: 2 },
          "& td, & th": { border: "1px solid #ddd", p: 1 },
          "& img": { maxWidth: "100%", height: "auto" },
        }}
      />
    </CardSurface>
  );
}