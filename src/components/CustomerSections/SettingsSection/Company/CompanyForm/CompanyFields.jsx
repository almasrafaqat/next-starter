import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

export const CompanyFields = ({ control, errors, handleSubmit, reset, getValues }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      // If canceling edit, reset form to original values
      reset(getValues());
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      await handleSubmit((data) => {
        console.log('Saving data:', data);
        // Here you would typically call your API to save the data
        setIsEditing(false);
      })();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header with Edit/Save/Cancel buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Company Information</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isEditing ? (
            <Tooltip title="Edit Company Information">
              <IconButton onClick={handleEditToggle} color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <Tooltip title="Save Changes">
                <IconButton onClick={handleSave} color="success">
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel Changes">
                <IconButton onClick={handleEditToggle} color="error">
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Company Name */}
        <Grid item xs={12} md={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name *"
                fullWidth
                disabled={!isEditing}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                type="email"
                disabled={!isEditing}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Phone */}
        <Grid item xs={12} md={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                disabled={!isEditing}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Website */}
        <Grid item xs={12} md={6}>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Website"
                fullWidth
                disabled={!isEditing}
                error={!!errors.website}
                helperText={errors.website?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
                error={!!errors.address}
                helperText={errors.address?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Business Details
          </Typography>
        </Grid>

        {/* Tax Number */}
        <Grid item xs={12} md={6}>
          <Controller
            name="tax_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Tax Number"
                fullWidth
                disabled={!isEditing}
                error={!!errors.tax_number}
                helperText={errors.tax_number?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Registration Number */}
        <Grid item xs={12} md={6}>
          <Controller
            name="registration_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Registration Number"
                fullWidth
                disabled={!isEditing}
                error={!!errors.registration_number}
                helperText={errors.registration_number?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Location Fields */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Location
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
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
              <TextField
                {...field}
                label="State"
                fullWidth
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
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
              <TextField
                {...field}
                label="City"
                fullWidth
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
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
              <TextField
                {...field}
                label="Zip Code"
                fullWidth
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Settings */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>
            Settings
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Language"
                fullWidth
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Currency"
                fullWidth
                disabled={!isEditing}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>

        {/* Boolean Fields */}
        <Grid item xs={12} md={6}>
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    disabled={!isEditing}
                  />
                }
                label="Active"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="is_default"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value}
                    disabled={!isEditing}
                  />
                }
                label="Default Company"
              />
            )}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={3}
                disabled={!isEditing}
                error={!!errors.description}
                helperText={errors.description?.message}
                variant={isEditing ? "outlined" : "filled"}
                InputProps={{
                  readOnly: !isEditing,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyFields;

