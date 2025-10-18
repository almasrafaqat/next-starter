import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
  Divider,
  Button,
  Chip,
  Autocomplete,
  styled,
  alpha,
  MenuItem,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IOSSwitch } from "@/components/ui/switch/CustomSwitch";
import {
  smtpDefaultValues,
  smtpFormSchema,
  formatSmtpForSubmission,
  smtpPresets,
  encryptionOptions,
} from "@/utils/formatSmtpData";

// Header badge
const HeaderBadge = styled(Chip)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.12),
  color: theme.palette.primary.main,
  height: 22,
  fontSize: 12,
  fontWeight: 600,
}));

// Section title
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0.6,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const ShrinkTextField = (props) => (
  <TextField
    variant="outlined"
    size="small"
    fullWidth
    InputLabelProps={{ shrink: true, ...(props.InputLabelProps || {}) }}
    {...props}
  />
);

export default function SMTPForm({
  companyId,
  onSubmit,
  initialData,
  onTestConnection, // optional
  onCancel, // optional
}) {
  console.log("initialData", initialData);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset, // ADD
  } = useForm({
    resolver: zodResolver(smtpFormSchema),
    defaultValues: initialData || smtpDefaultValues,
    mode: "onBlur",
  });

  // IMPORTANT: reinitialize form when initialData changes (edit mode)
  useEffect(() => {
    if (initialData) reset({ ...smtpDefaultValues, ...initialData });
    else reset(smtpDefaultValues);
  }, [initialData, reset]);

  const [showPassword, setShowPassword] = React.useState(false);
  const encryptionValue = watch("encryption");

  console.log("errors", errors);
  console.log("form values", watch());

  const presetOptions = useMemo(
    () =>
      Object.entries(smtpPresets).map(([key, p]) => ({
        key,
        label: p.label,
        host: p.host,
        port: p.port,
        encryption: p.encryption,
      })),
    []
  );

  const handlePresetChange = (_, preset) => {
    if (!preset) return;
    setValue("host", preset.host, { shouldValidate: true });
    setValue("port", preset.port, { shouldValidate: true });
    setValue("encryption", preset.encryption, { shouldValidate: true });
  };

  const submit = (data) => onSubmit(formatSmtpForSubmission(data, companyId));

  return (
    <Card key={`smtp-form-${initialData?.id ?? "new"}`}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">
              {initialData ? "Edit SMTP" : "Add SMTP"}
            </Typography>
            <HeaderBadge label={initialData ? "Update" : "New"} size="small" />
          </Box>
        }
        subheader="Configure your outgoing email server used for invoices and notifications."
        action={
          <Box display="flex" alignItems="center" gap={1.5}>
            <Typography variant="caption" color="text.secondary">
              Active
            </Typography>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <IOSSwitch
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </Box>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 2 }}>
        {/* Presets */}
        <Box mb={2}>
          <SectionTitle>Quick presets</SectionTitle>
          <Autocomplete
            options={presetOptions}
            getOptionLabel={(o) => o.label}
            onChange={handlePresetChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select a provider (Gmail, Outlook, etc.)"
                size="small"
              />
            )}
            sx={{ maxWidth: 380 }}
          />
        </Box>

        <Grid container spacing={2}>
          {/* Server */}
          <Grid item xs={12} md={6}>
            <SectionTitle>Server</SectionTitle>

            <Controller
              name="host"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  label="SMTP Host"
                  placeholder="smtp.yourprovider.com"
                  error={!!errors.host}
                  helperText={errors.host?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="port"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  type="number"
                  label="Port"
                  error={!!errors.port}
                  helperText={
                    errors.port?.message ||
                    (encryptionValue === "ssl" ? "Usually 465" : "Usually 587")
                  }
                />
              )}
            />
          </Grid>

          {/* Credentials */}
          <Grid item xs={12} md={6}>
            <SectionTitle>Credentials</SectionTitle>

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  label="Username"
                  placeholder="noreply@domain.com"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  label="Password / App Password"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={showPassword ? "Hide" : "Show"}>
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Sender */}
          <Grid item xs={12} md={6}>
            <SectionTitle>Sender</SectionTitle>

            <Controller
              name="from_name"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  label="From Name"
                  placeholder="Your Company"
                  error={!!errors.from_name}
                  helperText={errors.from_name?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="from_email"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  {...field}
                  label="From Email"
                  placeholder="noreply@domain.com"
                  error={!!errors.from_email}
                  helperText={errors.from_email?.message}
                />
              )}
            />
          </Grid>

          {/* Security */}
          <Grid item xs={12} md={6}>
            <SectionTitle>Security</SectionTitle>

            <Controller
              name="encryption"
              control={control}
              render={({ field }) => (
                <ShrinkTextField
                  select
                  label="Encryption"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.encryption}
                  helperText={errors.encryption?.message}
                  sx={{ mb: 2 }}
                >
                  {encryptionOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </ShrinkTextField>
              )}
            />

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip title="Use this SMTP as default for sending emails">
                  <InfoOutlinedIcon fontSize="small" color="info" />
                </Tooltip>
                <Typography variant="body2">Set as Default</Typography>
              </Box>
              <Controller
                name="is_default"
                control={control}
                render={({ field }) => (
                  <IOSSwitch
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Tips */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Gmail: use App Password (2FA required)"
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Office365: TLS on port 587"
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<InfoOutlinedIcon />}
            label="Ensure SPF/DKIM are set for your domain"
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
        <Box>
          {onCancel && (
            <Button onClick={onCancel} color="inherit" sx={{ mr: 1 }}>
              Cancel
            </Button>
          )}
        </Box>
        <Box display="flex" gap={1}>
          {onTestConnection && (
            <Button
              variant="outlined"
              onClick={handleSubmit((data) =>
                onTestConnection(formatSmtpForSubmission(data, companyId))
              )}
              disabled={isSubmitting}
            >
              Test Connection
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit(submit)}
            disabled={isSubmitting}
          >
            {initialData ? "Update" : "Save"} SMTP
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
