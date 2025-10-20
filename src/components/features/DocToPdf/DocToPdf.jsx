"use client";

import React from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Tooltip,
  useMediaQuery,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SettingsIcon from "@mui/icons-material/Settings";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from "@mui/icons-material/Download";
import "swiper/css";
import Uploader from "@/components/FeatureTools/Uploader/Uploader";
import ExcelPreview from "@/components/FeatureTools/ExcelPreview/ExcelPreview";
import DocxPreview from "@/components/FeatureTools/DocxPreview/DocxPreview";
import OptionsDrawer from "@/components/FeatureTools/OptionsDrawer/OptionsDrawer";
import { useDocToPdf } from "@/hooks/featureTools/useDocToPdf";
import { AppShell, HeaderBar, FabBar } from "./DocToPdf.styles";
import { Home } from "@mui/icons-material";
import { useRouter } from "@/i18n/routing";

export default function DocToPdfApp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const {
    state,
    actions,
    canConvert,
    resetAll,
    convertToPdf,
    exporting,
    setExporting,
    snackbar,
    setSnackbar,
    fileInputRef,
  } = useDocToPdf();

  const onUpload = async (file) => {
    await actions.loadFile(file);
  };

  const handleConvert = async () => {
    setExporting(true);
    try {
      await convertToPdf();
      setSnackbar({
        open: true,
        type: "success",
        msg: "PDF created successfully! 🎉",
      });
    } catch (e) {
      console.error(e);
      setSnackbar({
        open: true,
        type: "error",
        msg: e?.message || "Failed to create PDF.",
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      {/* <SiteHeader onUpload={actions.triggerUpload} /> */}
      {/* Hidden input that triggerUpload() clicks */}
   
      <AppShell>
        {/* Elegant Header */}
        <HeaderBar position="sticky" color="default" elevation={0}>
          <Toolbar sx={{ gap: 1, minHeight: { xs: 64, sm: 72 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flex: { xs: 1, sm: 0 },
              }}
            >
              <IconButton
                onClick={() => router.push("/")}
                color="primary"
                size="large"
              >
                <Home />
              </IconButton>
              <Avatar
                sx={{
                  width: { xs: 36, sm: 42 },
                  height: { xs: 36, sm: 42 },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                }}
              >
                <DescriptionIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </Avatar>
              <Box>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{
                    width: "300px",
                    fontWeight: 800,
                    letterSpacing: -0.5,
                    lineHeight: 1.2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Document to PDF
                </Typography>
                {!isMobile && (
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    Convert Excel & Word instantly
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ flex: 1 }} />

            {!isMobile && state.file && (
              <Chip
                label={state.fileType === "excel" ? "Excel" : "Word"}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}

            <Tooltip title="Settings">
              <span>
                <IconButton
                  onClick={() => actions.setDrawerOpen(true)}
                  disabled={!state.file}
                  color="primary"
                  sx={{
                    "&:hover": {
                      transform: "rotate(45deg)",
                      transition: "transform 0.3s ease",
                    },
                  }}
                >
                  <SettingsIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Reset">
              <IconButton
                onClick={resetAll}
                sx={{
                  "&:hover": {
                    color: "error.main",
                  },
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Divider />
        </HeaderBar>

        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            minHeight: "calc(100vh - 200px)",
          }}
        >
          {/* Hero Section when no file */}
          {!state.file && (
            <Box>
              {/* Hero Header */}
              <Box
                sx={{
                  textAlign: "center",
                  mb: { xs: 4, sm: 6 },
                  px: { xs: 2, sm: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2,
                    px: 2.5,
                    py: 1,
                    borderRadius: 8,
                    background: alpha(theme.palette.primary.main, 0.08),
                  }}
                >
                  <DescriptionIcon
                    sx={{
                      fontSize: { xs: 32, sm: 40 },
                      color: "primary.main",
                    }}
                  />
                  <PictureAsPdfIcon
                    sx={{
                      fontSize: { xs: 32, sm: 40 },
                      color: "error.main",
                    }}
                  />
                </Box>

                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{
                    fontWeight: 900,
                    mb: 1.5,
                    letterSpacing: -0.5,
                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.text.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Word to PDF Converter
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    maxWidth: 600,
                    mx: "auto",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
                >
                  Turn your Word document into an easy-to-share PDF in an
                  instant.
                </Typography>
              </Box>

              {/* Upload Card */}
              <Uploader onUpload={onUpload} />

              {/* How-to Steps */}
              <Box sx={{ mt: { xs: 6, sm: 8 }, mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    textAlign: "center",
                    mb: { xs: 3, sm: 5 },
                    letterSpacing: -0.3,
                  }}
                >
                  How to Convert a Word Document to PDF
                </Typography>

                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 3, md: 4 }}
                  justifyContent="center"
                >
                  {[
                    {
                      step: "1",
                      title: "Upload",
                      desc: "Select the Word document you need to convert.",
                      icon: <CloudUploadIcon sx={{ fontSize: 32 }} />,
                      color: theme.palette.info.main,
                    },
                    {
                      step: "2",
                      title: "Start processing",
                      desc: "Our free Word to PDF converter will copy the formatting and text from your Word document and turn it into a PDF.",
                      icon: <AutoAwesomeIcon sx={{ fontSize: 32 }} />,
                      color: theme.palette.warning.main,
                    },
                    {
                      step: "3",
                      title: "Download",
                      desc: "The PDF will be ready to download in an instant. Any remaining copies of submitted files are deleted from our server, ensuring your data remains secure.",
                      icon: <DownloadIcon sx={{ fontSize: 32 }} />,
                      color: theme.palette.success.main,
                    },
                  ].map((item, idx) => (
                    <Card
                      key={idx}
                      sx={{
                        flex: 1,
                        borderRadius: 3,
                        border: `1px solid ${alpha(item.color, 0.2)}`,
                        background: alpha(item.color, 0.02),
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 8px 24px ${alpha(item.color, 0.15)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: "center", p: 3 }}>
                        <Avatar
                          sx={{
                            width: { xs: 56, sm: 64 },
                            height: { xs: 56, sm: 64 },
                            mx: "auto",
                            mb: 2,
                            bgcolor: item.color,
                            fontSize: { xs: 24, sm: 28 },
                            fontWeight: 900,
                          }}
                        >
                          {item.step}
                        </Avatar>

                        <Box
                          sx={{
                            mb: 1.5,
                            color: item.color,
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 800, mb: 1 }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", lineHeight: 1.6 }}
                        >
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              </Box>
            </Box>
          )}

          {/* Preview Section */}
          {state.file && state.fileType === "excel" && (
            <ExcelPreview
              sheets={state.excel.sheets}
              onSheetIndexChange={(i) => actions.setActiveSheet(i)}
              activeIndex={state.excel.activeSheet}
              themeMode={state.options.theme}
            />
          )}

          {state.file && state.fileType === "docx" && (
            <DocxPreview
              file={state.file}
              onRendered={(h) => actions.setDocxHeight(h)}
            />
          )}
        </Container>

        {/* Floating Action Bar */}
        {state.file && (
          <FabBar>
            <Tooltip title="Upload New">
              <IconButton
                color="primary"
                size="large"
                onClick={() => actions.triggerUpload()}
                sx={{
                  background: alpha(theme.palette.primary.main, 0.08),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.15),
                  },
                }}
              >
                <UploadFileIcon />
              </IconButton>
            </Tooltip>

            <Button
              startIcon={<PictureAsPdfIcon />}
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={handleConvert}
              disabled={!canConvert || exporting}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.2, sm: 1.5 },
                fontWeight: 800,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                borderRadius: 3,
                boxShadow: `0 4px 12px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
                textTransform: "none",
                letterSpacing: 0.3,
                "&:hover": {
                  boxShadow: `0 6px 20px ${alpha(
                    theme.palette.primary.main,
                    0.4
                  )}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Convert to PDF
            </Button>

            <Tooltip title="Options">
              <IconButton
                color="primary"
                size="large"
                onClick={() => actions.setDrawerOpen(true)}
                disabled={!state.file}
                sx={{
                  background: alpha(theme.palette.primary.main, 0.08),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.15),
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </FabBar>
        )}

        <OptionsDrawer
          open={state.drawerOpen}
          onClose={() => actions.setDrawerOpen(false)}
          options={state.options}
          setOptions={actions.setOptions}
        />

        {/* Export Progress Dialog */}
        <Dialog
          open={exporting}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: `linear-gradient(180deg, ${
                theme.palette.background.paper
              }, ${alpha(theme.palette.primary.main, 0.03)})`,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              pb: 1,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
              }}
            >
              <PictureAsPdfIcon />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" fontWeight={800}>
                Exporting PDF
              </Typography>
            </Box>
            <IconButton onClick={() => setExporting(false)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Converting your document. This will only take a moment...
            </Typography>
            <LinearProgress
              sx={{
                height: 6,
                borderRadius: 3,
                background: alpha(theme.palette.primary.main, 0.1),
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={snackbar.type}
            variant="filled"
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: `0 4px 12px ${alpha("#000", 0.2)}`,
            }}
          >
            {snackbar.msg}
          </Alert>
        </Snackbar>
      </AppShell>
      {/* <SiteFooter /> */}
    </>
  );
}
