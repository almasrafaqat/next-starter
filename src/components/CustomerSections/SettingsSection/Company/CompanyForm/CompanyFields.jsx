import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
  FormControlLabel,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  CircularProgress,
  Chip,
  InputAdornment,
  alpha,
  styled,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import BusinessIcon from "@mui/icons-material/Business";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LanguageIcon from "@mui/icons-material/Language";
import PublicIcon from "@mui/icons-material/Public";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import BadgeIcon from "@mui/icons-material/Badge";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MapIcon from "@mui/icons-material/Map";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IOSSwitch } from "@/components/ui/switch/CustomSwitch";
import PrimaryButton from "@/components/ui/Button/PrimaryButton";
import CancelButton from "@/components/ui/Button/CancelButton";

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0.6,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const HeaderBadge = styled(Chip)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  height: 22,
  fontSize: 12,
  fontWeight: 600,
}));

const ShrinkTextField = (props) => (
  <TextField
    fullWidth
    size="small"
    variant={props.variant || "outlined"}
    InputLabelProps={{ shrink: true, ...(props.InputLabelProps || {}) }}
    {...props}
  />
);

// Decorative section wrapper (soft background + border)
const SectionBox = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(2),
  background: alpha(theme.palette.primary.main, 0.03),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
}));

// Gradient divider between major blocks
const SoftDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderColor: alpha(theme.palette.divider, 0.2),
}));

const CompanyFields = ({
  control,
  errors,
  handleSubmit,
  reset,
  getValues,
  setValue,
  watch,
  loading = false,
  mode = "create",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXS350 = useMediaQuery("(max-width:350px)");

  const [isEditing, setIsEditing] = useState(mode === "create");
  const [originalValues, setOriginalValues] = useState(null);

  // Only display existing logo URL (logic unchanged)
  const logoUrlField = watch("logoUrl") ?? watch("logo_url");
  const normalizeUrl = (u) => (u ? u.replace(/([^:]\/)\/+/g, "$1") : u);
  const resolvedLogoSrc = React.useMemo(() => {
    if (typeof logoUrlField === "string" && logoUrlField) {
      return normalizeUrl(logoUrlField);
    }
    return null;
  }, [logoUrlField]);

  const handleEditToggle = () => {
    if (isEditing && mode === "edit") {
      if (originalValues) reset(originalValues);
      setIsEditing(false);
    } else {
      setOriginalValues(getValues());
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    handleSubmit();
    if (mode === "edit") setIsEditing(false);
  };

  const logoSize = isXS350 ? 72 : isMobile ? 84 : 100;
  const headerAvatarSize = isXS350 ? 34 : isMobile ? 38 : 40;
  const titleVariant = isXS350 ? "subtitle1" : isMobile ? "subtitle1" : "h6";

  return (
    <Card sx={{ overflow: "hidden", borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Box
            sx={{
              width: headerAvatarSize,
              height: headerAvatarSize,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: (t) =>
                `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.primary.dark})`,
              color: "white",
              flexShrink: 0,
            }}
          >
            <BusinessIcon sx={{ fontSize: headerAvatarSize * 0.55 }} />
          </Box>
        }
        title={
          <Box display="flex" alignItems="center" gap={1} minWidth={0} sx={{ flexWrap: "wrap" }}>
            <Typography
              variant={titleVariant}
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: { xs: "100%", sm: "auto" },
              }}
            >
              {mode === "create" ? "Create Company" : "Company Profile"}
            </Typography>
            <HeaderBadge
              size="small"
              label={mode === "create" ? "New" : isEditing ? "Editing" : "View"}
              sx={{
                height: 20,
                fontSize: 11,
                borderRadius: 1,
                px: 0.75,
              }}
            />
          </Box>
        }
        subheader={
          <Typography
            variant={isMobile ? "caption" : "body2"}
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              pr: { sm: 6 }, // space from right actions on desktop
            }}
          >
            Manage your company profile used across invoices, emails, and settings.
          </Typography>
        }
        action={
          // Hide top actions on extra-small to avoid overflow
          <Box display={{ xs: "none", sm: "flex" }} gap={1}>
            {mode === "edit" && !isEditing ? (
              <Tooltip title="Edit Company Information">
                <IconButton color="primary" onClick={handleEditToggle}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={loading ? <CircularProgress size={18} /> : <SaveIcon />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  {mode === "create" ? "Create" : "Save"}
                </Button>
                {mode === "edit" && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={handleEditToggle}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
          </Box>
        }
        sx={{ pb: 1 }}
      />

      {/* Compact sticky actions for mobile (keeps actions accessible) */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 2,
          py: 1,
          gap: 1,
          flexWrap: "wrap",
          backdropFilter: "blur(6px)",
        }}
      >
        {mode === "edit" && !isEditing ? (
          <Button
            onClick={handleEditToggle}
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            sx={{ flex: 1 }}
          >
            Edit
          </Button>
        ) : (
          <>
            {mode === "edit" && (
              <Button
                onClick={handleEditToggle}
                variant="outlined"
                color="error"
                size="small"
                startIcon={<CancelIcon />}
                sx={{ flex: 1 }}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={handleSave}
              variant="contained"
              size="small"
              startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}
              sx={{ flex: 2 }}
              disabled={loading}
            >
              {mode === "create" ? "Create" : "Save"}
            </Button>
          </>
        )}
      </Box>

      <CardContent sx={{ pt: 0 }}>
        <Grid
          container
          spacing={isXS350 ? 1.5 : 2}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {/* Logo with glow ring */}
          <Grid item xs={12}>
            <SectionTitle>Company Logo</SectionTitle>
            <SectionBox
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: isXS350 ? 1.5 : 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: logoSize,
                  height: logoSize,
                  borderRadius: "50%",
                  background: (t) =>
                    `radial-gradient(60% 60% at 50% 50%, ${alpha(
                      t.palette.primary.main,
                      0.18
                    )} 0%, ${alpha(t.palette.primary.main, 0.04)} 100%)`,
                  boxShadow: (t) => `0 8px 24px ${alpha(t.palette.primary.main, 0.12)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: (t) => `2px solid ${alpha(t.palette.primary.main, 0.2)}`,
                }}
              >
                <Avatar
                  src={resolvedLogoSrc || undefined}
                  alt="Company logo"
                  sx={{
                    width: logoSize - 8,
                    height: logoSize - 8,
                    bgcolor: "primary.light",
                    fontSize: (logoSize - 8) * 0.4,
                    border: (t) => `2px solid ${t.palette.background.paper}`,
                  }}
                >
                  {!resolvedLogoSrc && <BusinessIcon sx={{ fontSize: (logoSize - 8) * 0.55 }} />}
                </Avatar>
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", lineHeight: 1.4 }}
                >
                  Used across invoices and branding emails.
                </Typography>
                <Typography variant="caption" sx={{ color: "text.disabled" }}>
                  Manage/change logo from the company card header.
                </Typography>
              </Box>
            </SectionBox>
          </Grid>

          <Grid item xs={12}>
            <SoftDivider />
          </Grid>

          {/* Identity + Contact */}
          <Grid item xs={12} md={12}>
            <SectionBox>
              <Grid container spacing={isXS350 ? 1.25 : 2}>
                <Grid item xs={12}>
                  <SectionTitle>Identity</SectionTitle>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Company Name *"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <BusinessIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <SectionTitle>Contact</SectionTitle>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Email"
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailOutlineIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <SectionTitle sx={{ visibility: "hidden" }}>Contact</SectionTitle>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Phone"
                        placeholder="+92-3151112222"
                        error={!!errors.phone}
                        helperText={errors.phone?.message || "Format: +CountryCode-Number"}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocalPhoneIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </SectionBox>
          </Grid>

          {/* Web + Address */}
          <Grid item xs={12}>
            <SoftDivider />
          </Grid>

          <Grid item xs={12} md={12}>
            <SectionBox>
              <Grid container spacing={isXS350 ? 1.25 : 2}>
                <Grid item xs={12} sm={6}>
                  <SectionTitle>Web Presence</SectionTitle>
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Website"
                        placeholder="https://example.com"
                        error={!!errors.website}
                        helperText={errors.website?.message}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <LanguageIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <SectionTitle>Address</SectionTitle>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Address"
                        multiline
                        rows={2}
                        error={!!errors.address}
                        helperText={errors.address?.message}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <MapIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </SectionBox>
          </Grid>

          {/* Business details */}
          <Grid item xs={12}>
            <SoftDivider />
          </Grid>

          <Grid item xs={12}>
            <SectionBox>
              <SectionTitle>Business Details</SectionTitle>
              <Grid container spacing={isXS350 ? 1.25 : 2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="tax_number"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Tax Number"
                        error={!!errors.tax_number}
                        helperText={errors.tax_number?.message}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ConfirmationNumberIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="registration_number"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Registration Number"
                        error={!!errors.registration_number}
                        helperText={errors.registration_number?.message}
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <BadgeIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </SectionBox>
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <SoftDivider />
          </Grid>

          <Grid item xs={12}>
            <SectionBox>
              <SectionTitle>Location</SectionTitle>
              <Grid container spacing={isXS350 ? 1.25 : 2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Country"
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <PublicIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="State"
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ApartmentIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="City"
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCityIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="zip_code"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Zip Code"
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{
                          readOnly: !isEditing,
                          startAdornment: (
                            <InputAdornment position="start">
                              <BadgeIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </SectionBox>
          </Grid>

          {/* Settings */}
          <Grid item xs={12}>
            <SoftDivider />
          </Grid>

          <Grid item xs={12}>
            <SectionBox>
              <SectionTitle>Settings</SectionTitle>
              <Grid container spacing={isXS350 ? 1 : 2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="language"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Language"
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <ShrinkTextField
                        {...field}
                        label="Currency"
                        variant={isEditing ? "outlined" : "filled"}
                        InputProps={{ readOnly: !isEditing }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    label="Active"
                    control={
                      <Controller
                        name="is_active"
                        control={control}
                        render={({ field }) => (
                          <IOSSwitch
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            disabled={!isEditing}
                          />
                        )}
                      />
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    label="Default Company"
                    control={
                      <Controller
                        name="is_default"
                        control={control}
                        render={({ field }) => (
                          <IOSSwitch
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            disabled={!isEditing}
                          />
                        )}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </SectionBox>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <SoftDivider />
          </Grid>

          <Grid item xs={12}>
            <SectionBox>
              <SectionTitle>Description</SectionTitle>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <ShrinkTextField
                    {...field}
                    label="Description"
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    variant={isEditing ? "outlined" : "filled"}
                    InputProps={{ readOnly: !isEditing }}
                  />
                )}
              />
            </SectionBox>
          </Grid>
        </Grid>

        {/* Tips */}
        <SoftDivider />
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          sx={{ mt: isXS350 ? 0.5 : 0 }}
        >
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Phone format: +92-3157961436 (include country code)"
            size="small"
            variant="outlined"
            color="info"
          />
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Tip: Add your website for branded links in emails"
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Set Default to auto-select this company across the app"
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>

      {/* Bottom actions stay visible on all breakpoints */}
      <CardActions
        sx={{
          px: 3,
          pb: 3,
          pt: 0,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        {mode === "edit" && !isEditing ? (
          <Button variant="outlined" onClick={handleEditToggle} startIcon={<EditIcon />}>
            Edit
          </Button>
        ) : (
          <>
            {mode === "edit" && (
              <CancelButton startIcon={<CancelIcon />} onClick={handleEditToggle} disabled={loading}>
                Cancel
              </CancelButton>
            )}
            <PrimaryButton
              variant="contained"
              color="primary"
              startIcon={loading ? <CircularProgress size={18} /> : <SaveIcon />}
              onClick={handleSave}
              disabled={loading}
            >
              {mode === "create" ? "Create Company" : "Save Changes"}
            </PrimaryButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CompanyFields;
