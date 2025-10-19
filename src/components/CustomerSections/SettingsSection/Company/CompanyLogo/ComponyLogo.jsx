import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Typography,
  alpha,
  Fade,
} from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCompany } from "@/hooks/customer/useCompany";

const VisuallyHiddenInput = muiStyled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const LogoContainer = muiStyled(Box)(({ theme, size }) => ({
  position: "relative",
  width: size,
  height: size,
  borderRadius: "50%",
  cursor: "pointer",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover .overlay": {
    opacity: 1,
  },
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const HoverOverlay = muiStyled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.common.black,
    0.7
  )}, ${alpha(theme.palette.common.black, 0.5)})`,
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  zIndex: 2,
}));

const ActionButton = muiStyled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  color: theme.palette.primary.main,
  width: 36,
  height: 36,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    transform: "scale(1.1)",
  },
  "&.delete": {
    color: theme.palette.error.main,
  },
  "&.success": {
    color: theme.palette.success.main,
    pointerEvents: "none",
  },
}));

const ChangeIndicator = muiStyled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: -4,
  right: -4,
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 2px 8px ${alpha(theme.palette.warning.main, 0.4)}`,
  zIndex: 3,
  animation: "pulse 2s ease-in-out infinite",
  "@keyframes pulse": {
    "0%, 100%": {
      transform: "scale(1)",
      boxShadow: `0 2px 8px ${alpha(theme.palette.warning.main, 0.4)}`,
    },
    "50%": {
      transform: "scale(1.05)",
      boxShadow: `0 4px 12px ${alpha(theme.palette.warning.main, 0.6)}`,
    },
  },
}));

function isAbsolute(url) {
  return /^https?:\/\//i.test(url || "");
}
function normalizeUrl(u) {
  return u ? u.replace(/([^:]\/)\/+/g, "$1") : u;
}

export default function CompanyLogo({
  companyId,
  logoUrl,
  logoPath,
  size = 120,
  editable = true,
  onUploaded,
  onRemoved,
  showLabel = true,
}) {
  const {
    uploadCompanyLogo,
    removeCompanyLogo,
    uploadCompanyLogoResult,
    removeCompanyLogoResult,
  } = useCompany();

  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [justUploaded, setJustUploaded] = React.useState(false);

  const displaySrc = React.useMemo(() => {
    if (preview) return preview;
    if (logoUrl) return normalizeUrl(logoUrl);
    if (logoPath) {
      if (isAbsolute(logoPath)) return normalizeUrl(logoPath);
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      return normalizeUrl(`${base}/${logoPath}`);
    }
    return null;
  }, [preview, logoUrl, logoPath]);

  const handleFilePick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    // Validate file size (max 2MB)
    if (f.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }
    
    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result);
    r.readAsDataURL(f);
  };

  const handleClearLocal = () => {
    setFile(null);
    setPreview(null);
    setJustUploaded(false);
  };

  const handleSave = async () => {
    if (!file || !companyId) return;
    try {
      await uploadCompanyLogo({ id: companyId, file });
      setFile(null);
      setPreview(null);
      setJustUploaded(true);
      setTimeout(() => setJustUploaded(false), 3000);
      onUploaded?.();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleRemoveServer = async () => {
    if (!companyId) return;
    try {
      await removeCompanyLogo({ id: companyId });
      setJustUploaded(false);
      onRemoved?.();
    } catch (error) {
      console.error("Remove failed:", error);
    }
  };

  const isUploading = !!uploadCompanyLogoResult?.isPending;
  const isRemoving = !!removeCompanyLogoResult?.isPending;
  const isProcessing = isUploading || isRemoving;
  const hasLogo = !!(displaySrc && !preview);

  return (
    <Box>
      <LogoContainer size={size}>
        {/* Avatar */}
        <Avatar
          src={displaySrc || undefined}
          alt="Company logo"
          sx={{
            width: size,
            height: size,
            bgcolor: "primary.light",
            fontSize: size * 0.4,
            boxShadow: (t) =>
              `0 8px 24px ${alpha(t.palette.primary.main, 0.15)}`,
            border: (t) => `3px solid ${t.palette.background.paper}`,
          }}
        >
          {!displaySrc && <BusinessIcon sx={{ fontSize: size * 0.5 }} />}
        </Avatar>

        {/* Hover overlay for upload/delete */}
        {editable && !isProcessing && (
          <HoverOverlay className="overlay">
            <Box display="flex" gap={1}>
              {/* Upload button */}
              <Tooltip title="Change Logo" arrow placement="top">
                <ActionButton component="label" size="small">
                  <CameraAltIcon fontSize="small" />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleFilePick}
                  />
                </ActionButton>
              </Tooltip>

              {/* Delete button (only if logo exists and no pending upload) */}
              {hasLogo && !preview && (
                <Tooltip title="Remove Logo" arrow placement="top">
                  <ActionButton
                    className="delete"
                    size="small"
                    onClick={handleRemoveServer}
                  >
                    <DeleteIcon fontSize="small" />
                  </ActionButton>
                </Tooltip>
              )}
            </Box>
          </HoverOverlay>
        )}

        {/* Processing spinner */}
        {isProcessing && (
          <HoverOverlay>
            <CircularProgress
              size={size * 0.3}
              thickness={3}
              sx={{ color: "white" }}
            />
          </HoverOverlay>
        )}

        {/* Pending upload indicator */}
        {preview && !isProcessing && (
          <Fade in>
            <ChangeIndicator>
              <Tooltip title="Save new logo" arrow>
                <IconButton
                  size="small"
                  onClick={handleSave}
                  sx={{
                    color: "white",
                    width: "100%",
                    height: "100%",
                    "&:hover": { bgcolor: "transparent" },
                  }}
                >
                  <CloudUploadIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </ChangeIndicator>
          </Fade>
        )}

        {/* Just uploaded success indicator */}
        {justUploaded && (
          <Fade in>
            <ChangeIndicator sx={{ bgcolor: "success.main" }}>
              <CheckCircleIcon sx={{ color: "white", fontSize: 18 }} />
            </ChangeIndicator>
          </Fade>
        )}

        {/* Discard button for pending upload */}
        {preview && !isProcessing && (
          <Box
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              zIndex: 4,
            }}
          >
            <Tooltip title="Cancel" arrow>
              <IconButton
                size="small"
                onClick={handleClearLocal}
                sx={{
                  bgcolor: "error.main",
                  color: "white",
                  width: 28,
                  height: 28,
                  boxShadow: (t) => `0 2px 8px ${alpha(t.palette.error.main, 0.4)}`,
                  "&:hover": {
                    bgcolor: "error.dark",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </LogoContainer>

      {/* Optional label */}
      {showLabel && (
        <Box mt={1.5} textAlign="center">
          <Typography variant="caption" color="text.secondary" display="block">
            {isUploading
              ? "Uploading..."
              : isRemoving
              ? "Removing..."
              : preview
              ? "Click orange icon to save"
              : "Hover to change logo"}
          </Typography>
          {editable && !preview && !isProcessing && (
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontSize: "0.7rem",
              }}
            >
              Max 2MB • JPG, PNG, GIF
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}