import CustomTypography from "@/components/Typography/CustomTypography";
import { icons } from "@/config/routeIcons";
import { Email } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";

const CompanyCardHeader = ({ company, actions }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    action.onClick(company);
    handleCloseMenu();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Box mt={1} sx={{color: 'primary.main'}} mb={2} display="flex" alignItems="center" gap={1}>
            <icons.BUSINESS
              sx={{
                fontSize: "24px",
                verticalAlign: "middle",
              }}
            />
            <CustomTypography
              color="theme.primary.main"
              fontWeight="bold"
              display="block"
            >
              {company.name}
            </CustomTypography>
          </Box>

          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip
                title="This email will be used on invoices"
                arrow
                placement="top"
                sx={{ cursor: "pointer" }}
              >
                <icons.MAIL
                  sx={{ fontSize: "16px", verticalAlign: "middle" }}
                />
              </Tooltip>
              {company.email ? (
                <CustomTypography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {company.email}
                </CustomTypography>
              ) : (
                <CustomTypography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  No email provided
                </CustomTypography>
              )}
              <Box display="flex" alignItems="center" gap={1}>
                <Tooltip
                  title="This phone number will be used on invoices"
                  arrow
                  placement="top"
                  sx={{ cursor: "pointer" }}
                >
                  <icons.PHONE
                    sx={{ fontSize: "16px", verticalAlign: "middle" }}
                  />
                </Tooltip>
                {company.phone ? (
                  <CustomTypography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    {company.phone}
                  </CustomTypography>
                ) : (
                  <CustomTypography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    No phone number provided
                  </CustomTypography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="More Options">
            <IconButton size="small" onClick={handleOpenMenu}>
              <icons.MORE />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            mt: 0.5,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1,
              borderRadius: 1,
              mx: 0.5,
              "&:hover": {
                bgcolor: "action.hover",
              },
            },
          },
        }}
      >
        {actions.map((action, index) => {
          const isDisabled = false;

          return (
            <MenuItem
              key={index}
              onClick={() => !isDisabled && handleAction(action)}
              disabled={isDisabled}
              sx={{
                color: action.color || "text.primary",
                "&.Mui-disabled": {
                  opacity: 0.5,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {<action.icon />}
              </ListItemIcon>
              <ListItemText
                primary={action.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default CompanyCardHeader;
