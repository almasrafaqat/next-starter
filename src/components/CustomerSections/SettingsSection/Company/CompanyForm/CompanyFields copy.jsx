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
  Badge,
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [isEditing, setIsEditing] = useState(mode === "create");
  const [originalValues, setOriginalValues] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const logo = watch("logo");
  const logoUrlField = watch("logoUrl") ?? watch("logo_url"); // support either field

  // Normalize double slashes and build full URL if only a path is stored
  const normalizeUrl = (u) => (u ? u.replace(/([^:]\/)\/+/g, "$1") : u);

  const resolvedLogoSrc = React.useMemo(() => {
    // 3) GraphQL computed full URL field
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

  return (
    <Card
      sx={{
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: (t) =>
                `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.primary.dark})`,
              color: "white",
            }}
          >
            <BusinessIcon sx={{ fontSize: 22 }} />
          </Box>
        }
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">
              {mode === "create" ? "Create Company" : "Company Profile"}
            </Typography>
            <HeaderBadge
              size="small"
              label={mode === "create" ? "New" : isEditing ? "Editing" : "View"}
            />
          </Box>
        }
        subheader="Manage your company profile used across invoices, emails, and settings."
        action={
          <Box display="flex" gap={1}>
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
                  startIcon={
                    loading ? <CircularProgress size={18} /> : <SaveIcon />
                  }
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

      <CardContent sx={{ pt: 0 }}>
        {/* Identity */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SectionTitle>Company Logo</SectionTitle>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={resolvedLogoSrc}
                alt="Company logo"
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "primary.light",
                  fontSize: 40,
                }}
              >
                {!resolvedLogoSrc && <BusinessIcon sx={{ fontSize: 50 }} />}
              </Avatar>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={3}>
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

          <Grid item xs={12} md={3}>
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
                  helperText={
                    errors.phone?.message || "Format: +CountryCode-Number"
                  }
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

          {/* Web + Address */}
          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
            <SectionTitle>Address</SectionTitle>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  label="Address"
                  multiline
                  rows={isEditing ? 2 : 2}
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

          {/* Business details */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <SectionTitle>Business Details</SectionTitle>
          </Grid>

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          {/* Location */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <SectionTitle>Location</SectionTitle>
          </Grid>

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          {/* Settings */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <SectionTitle>Settings</SectionTitle>
          </Grid>

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          {/* Description */}
          <Grid item xs={12}>
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
          </Grid>
        </Grid>

        {/* Tips */}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" gap={1} flexWrap="wrap">
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
          <Button
            variant="outlined"
            onClick={handleEditToggle}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        ) : (
          <>
            {mode === "edit" && (
              <CancelButton
                startIcon={<CancelIcon />}
                onClick={handleEditToggle}
                disabled={loading}
              >
                Cancel
              </CancelButton>
            )}
            <PrimaryButton
              variant="contained"
              color="primary"
              startIcon={
                loading ? <CircularProgress size={18} /> : <SaveIcon />
              }
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
