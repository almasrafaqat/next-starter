import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  Autocomplete,
  Chip,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { DatePicker } from "@mui/x-date-pickers";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import { ActiveFiltersBar } from "./ActiveFiltersBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  backgroundImage: "none",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Filters = ({
  filters,
  onChange,
  onReset,
  filterConfigs = [],
  actions = [],
  sx,
}) => {
  const { isSmallScreen } = useResponsiveDevice();

  const handleFieldChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  // Group filters by section for headings
  const groupedFilters = filterConfigs.reduce((acc, filter) => {
    const section = filter.section || "Other";
    if (!acc[section]) acc[section] = [];
    acc[section].push(filter);
    return acc;
  }, {});

  return (
    <Box
      sx={{
        mb: 2,
        px: isSmallScreen ? 1 : 2,
        py: isSmallScreen ? 1 : 2,
        bgcolor: isSmallScreen ? "background.default" : "background.paper",
        borderRadius: 3,
        boxShadow: isSmallScreen ? 0 : 1,
        border: isSmallScreen ? "1px solid" : "none",
        borderColor: "divider",
        ...sx,
      }}
    >
      <ActiveFiltersBar
        filters={filters}
        filterConfigs={filterConfigs}
        onClear={onReset}
        // onDelete={(key, empty) => handleFieldChange(key, empty)}
      />

      <Grid container spacing={2}>
        {Object.entries(groupedFilters).map(
          ([section, filtersInSection], idx) => (
            <React.Fragment key={section}>
              <Grid xs={12} item>
                <HeadingTitle
                  title={section}
                  variant="subtitle2"
                  align="left"
                  sx={{
                    mb: 1,
                    color: "primary.main",
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                    borderBottom: "2px solid",
                    borderColor: "primary.light",
                    pb: 0.5,
                    background: "none",
                    boxShadow: "none",
                  }}
                  underline={false}
                />
              </Grid>
              {filtersInSection.map((config, colIdx) => (
                <Grid key={config.key} xs={12} sm={6} md={6} item>
                  <Item>
                    {(() => {
                      switch (config.type) {
                        case "search":
                          return (
                            <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                              placeholder={config.label}
                              value={filters[config.key] || ""}
                              onChange={(e) =>
                                handleFieldChange(config.key, e.target.value)
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{ bgcolor: "background.paper" }}
                            />
                          );
                        case "select":
                          return (
                            <TextField
                              fullWidth
                              select
                              size="small"
                              label={config.label}
                              value={filters[config.key] || ""}
                              onChange={(e) =>
                                handleFieldChange(config.key, e.target.value)
                              }
                              sx={{ bgcolor: "background.paper" }}
                            >
                              <MenuItem value="">
                                {config.allLabel || `All ${config.label}`}
                              </MenuItem>
                              {config.options?.map((option) => (
                                <MenuItem
                                  key={option.key || option.value}
                                  value={option.key || option.value}
                                >
                                  {option.icon && (
                                    <Box
                                      component="span"
                                      mr={1}
                                      display="inline-flex"
                                      alignItems="center"
                                    >
                                      <option.icon fontSize="small" />
                                    </Box>
                                  )}
                                  {option.label || option.name}
                                </MenuItem>
                              ))}
                            </TextField>
                          );
                        case "date":
                          return (
                            <DatePicker
                              label={config.label}
                              value={filters[config.key] || null}
                              onChange={(date) =>
                                handleFieldChange(config.key, date)
                              }
                              slotProps={{
                                textField: {
                                  fullWidth: true,
                                  size: "small",
                                  sx: { bgcolor: "background.paper" },
                                },
                              }}
                            />
                          );
                        case "autocomplete":
                          return (
                            <Autocomplete
                              multiple={!!config.multiple}
                              options={config.options || []}
                              getOptionLabel={(option) =>
                                option.label || option.name || ""
                              }
                              value={
                                config.multiple
                                  ? config.options?.filter((opt) =>
                                      (filters[config.key] || []).includes(
                                        opt.key
                                      )
                                    )
                                  : config.options?.find(
                                      (opt) => opt.key === filters[config.key]
                                    ) || null
                              }
                              onChange={(_, value) =>
                                handleFieldChange(
                                  config.key,
                                  config.multiple
                                    ? value.map((v) => v.key)
                                    : value
                                    ? value.key
                                    : ""
                                )
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label={config.label}
                                  fullWidth
                                  size="small"
                                  sx={{ bgcolor: "background.paper" }}
                                />
                              )}
                            />
                          );
                        case "text":
                          return (
                            <TextField
                              fullWidth
                              size="small"
                              label={config.label}
                              value={filters[config.key] || ""}
                              onChange={(e) =>
                                handleFieldChange(config.key, e.target.value)
                              }
                              sx={{ bgcolor: "background.paper" }}
                            />
                          );
                        default:
                          return null;
                      }
                    })()}
                  </Item>
                </Grid>
              ))}
            </React.Fragment>
          )
        )}
        {/* Actions and Reset button in a full-width row */}
        <Grid xs={12} item>
          <Box
            display="flex"
            gap={1}
            justifyContent="flex-end"
            alignItems="center"
            mt={1}
          >
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={onReset}
              startIcon={<FilterAltIcon />}
              sx={{
                fontWeight: 700,
                borderRadius: 2,
                bgcolor: "primary.gradientBg",
                ":hover": { bgcolor: "primary.gradientBgHover" },
              }}
            >
              Reset
            </Button>
            {actions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant || "contained"}
                color={action.color || "primary"}
                size="small"
                onClick={action.onClick}
                sx={{
                  fontWeight: 700,
                  borderRadius: 2,
                  bgcolor: "primary.gradientBg",
                  ":hover": { bgcolor: "primary.gradientBgHover" },
                }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
