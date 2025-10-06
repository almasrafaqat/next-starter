import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Grid, TextField, MenuItem, Button, Box, Typography, Divider } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { timezones } from "@/utils/timezones";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ReminderFields({ control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "reminders",
  });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reminders
      </Typography>
      {fields.map((field, idx) => (
        <Box
          key={field.id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #eee",
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reminders.${idx}.timezone`}
                control={control}
                defaultValue="UTC"
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Timezone"
                    fullWidth
                    helperText="Select the timezone for this reminder."
                    error={!!errors?.reminders?.[idx]?.timezone}
                  >
                    {timezones.map((tz) => (
                      <MenuItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reminders.${idx}.schedule_date`}
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Schedule Date & Time"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        helperText: "When should the reminder be sent?",
                        error: !!errors?.reminders?.[idx]?.schedule_date,
                      },
                    }}
                    value={field.value || null}
                    onChange={field.onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name={`reminders.${idx}.expiry_date`}
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="Expiry Date & Time"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        helperText:
                          "Set when this reminder expires. The customer will receive reminders only before this date/time. No reminders will be sent after expiry.",
                        error: !!errors?.reminders?.[idx]?.expiry_date,
                      },
                    }}
                    value={field.value || null}
                    onChange={field.onChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => remove(idx)}
                sx={{ mt: 1 }}
              >
                Remove Reminder
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() =>
          append({
            timezone: "UTC",
            schedule_date: null,
            expirey_date: null,
          })
        }
      >
        Add Reminder
      </Button>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}