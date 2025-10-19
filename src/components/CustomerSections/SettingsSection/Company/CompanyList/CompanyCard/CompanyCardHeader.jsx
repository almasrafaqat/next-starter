import CustomTypography from "@/components/Typography/CustomTypography";
import { icons } from "@/config/routeIcons";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  alpha,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import React from "react";
import CompanyLogo from "../../CompanyLogo/ComponyLogo";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";

const CompanyCardHeader = ({ company, actions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:400px)");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const companyId = company?.id;

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

  // Shared Actions Menu Component
  const actionsMenu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleCloseMenu}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        elevation: 8,
        sx: {
          minWidth: 200,
          mt: 1,
          borderRadius: 2,
          overflow: "visible",
          boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}`,
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
          "& .MuiMenuItem-root": {
            px: 2,
            py: 1.25,
            borderRadius: 1.5,
            mx: 1,
            my: 0.5,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              transform: "translateX(4px)",
            },
          },
        },
      }}
    >
      {actions.map((action, index) => (
        <MenuItem
          key={index}
          onClick={() => handleAction(action)}
          sx={{
            color: action.color || "text.primary",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: action.color || "inherit",
            }}
          >
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
      ))}
    </Menu>
  );

  // Mobile View (< 600px)
  const mobileView = (
    <Box>
      {/* Top Row: Logo + Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
      >
        <CompanyLogo
          companyId={companyId}
          logoUrl={company.logoUrl || company.logo_url}
          logoPath={company.logo}
          size={isExtraSmall ? 70 : 80}
          editable
          showLabel={false}
          onUploaded={() => {}}
          onRemoved={() => {}}
        />

        <Tooltip title="More Options" arrow>
          <IconButton
            size="small"
            onClick={handleOpenMenu}
            sx={{
              bgcolor: alpha(theme.palette.action.hover, 0.5),
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                transform: "rotate(90deg)",
              },
            }}
          >
            <icons.MORE />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Company Name + Badges */}
      <Box mb={1.5}>
        <Box
          display="flex"
          alignItems="center"
          gap={0.75}
          flexWrap="wrap"
          mb={0.5}
        >
          <CustomTypography
            variant={isExtraSmall ? "subtitle1" : "h6"}
            fontWeight="700"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              wordBreak: "break-word",
            }}
          >
            {company.name}
          </CustomTypography>

          {company.is_default && (
            <Chip
              icon={<StarIcon sx={{ fontSize: 12 }} />}
              label="Default"
              size="small"
              sx={{
                height: 20,
                fontSize: "0.65rem",
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
          )}

          {company.is_active && (
            <VerifiedIcon sx={{ fontSize: 16, color: "success.main" }} />
          )}
        </Box>
      </Box>

      {/* Contact Info - Stacked */}
      <Box display="flex" flexDirection="column" gap={1}>
        <Box
          sx={{
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <icons.MAIL
            sx={{ fontSize: 14, color: "primary.main", flexShrink: 0 }}
          />
          <CustomTypography
            variant="caption"
            sx={{
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {company.email || "No email"}
          </CustomTypography>
        </Box>

        <Box
          sx={{
            px: 1.5,
            py: 0.75,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.success.main, 0.08),
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <icons.PHONE
            sx={{ fontSize: 14, color: "success.main", flexShrink: 0 }}
          />
          <CustomTypography
            variant="caption"
            sx={{
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {company.phone || "No phone"}
          </CustomTypography>
        </Box>
      </Box>

      {/* Optional Metadata */}
      {(company.website || company.country) && (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mt={1}
          flexWrap="wrap"
        >
          {company.website && (
            <Chip
              label="Website"
              size="small"
              variant="outlined"
              sx={{ height: 18, fontSize: "0.6rem" }}
            />
          )}
          {company.country && (
            <CustomTypography
              variant="caption"
              sx={{ fontSize: "0.65rem", color: "text.disabled" }}
            >
              📍 {company.country}
            </CustomTypography>
          )}
        </Box>
      )}

      {actionsMenu}
    </Box>
  );

  // Desktop View (≥ 600px)
  const desktopView = (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={3}
      >
        {/* Left: Logo + Info */}
        <Box display="flex" alignItems="center" gap={3} flex={1} minWidth={0}>
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <CompanyLogo
              companyId={companyId}
              logoUrl={company.logoUrl || company.logo_url}
              logoPath={company.logo}
              size={100}
              editable
              showLabel={false}
              onUploaded={() => {}}
              onRemoved={() => {}}
            />
          </Box>

          <Box flex={1} minWidth={0}>
            {/* Name + Badges */}
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              flexWrap="wrap"
              mb={0.5}
            >
              <CustomTypography
                variant="h5"
                fontWeight="700"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {company.name}
              </CustomTypography>

              {/* Default Company Badge */}
              {company.is_default && (
                <Tooltip title="Default Company" arrow>
                  <Chip
                    icon={<StarIcon sx={{ fontSize: 14 }} />}
                    label="Default"
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                      color: "white",
                      "& .MuiChip-icon": { color: "white" },
                    }}
                  />
                </Tooltip>
              )}

              {/* Active Badge */}
              {company.is_active && (
                <Tooltip title="Active Company" arrow>
                  <VerifiedIcon sx={{ fontSize: 18, color: "success.main" }} />
                </Tooltip>
              )}
            </Box>

            {/* Contact Pills - Horizontal */}
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
              sx={{
                "& > *": { display: "flex", alignItems: "center", gap: 0.5 },
              }}
            >
              <Tooltip title="Email used on invoices" arrow placement="top">
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <icons.MAIL sx={{ fontSize: 14, color: "primary.main" }} />
                  <CustomTypography
                    variant="caption"
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "text.secondary",
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {company.email || "No email"}
                  </CustomTypography>
                </Box>
              </Tooltip>

              <Tooltip title="Phone used on invoices" arrow placement="top">
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.08),
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.success.main, 0.15),
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <icons.PHONE sx={{ fontSize: 14, color: "success.main" }} />
                  <CustomTypography
                    variant="caption"
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "text.secondary",
                      maxWidth: 140,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {company.phone || "No phone"}
                  </CustomTypography>
                </Box>
              </Tooltip>
            </Box>

            {/* Metadata */}
            {(company.website || company.country) && (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mt={0.5}
                flexWrap="wrap"
              >
                {company.website && (
                  <Chip
                    label="Website"
                    size="small"
                    variant="outlined"
                    sx={{ height: 20, fontSize: "0.65rem" }}
                  />
                )}
                {company.country && (
                  <CustomTypography
                    variant="caption"
                    sx={{ fontSize: "0.7rem", color: "text.disabled" }}
                  >
                    📍 {company.country}
                  </CustomTypography>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: "flex", alignItems: "flex-start", flexShrink: 0 }}>
          <Tooltip title="More Options" arrow>
            <IconButton
              size="small"
              onClick={handleOpenMenu}
              sx={{
                bgcolor: alpha(theme.palette.action.hover, 0.5),
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transform: "rotate(90deg)",
                },
              }}
            >
              <icons.MORE />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {actionsMenu}
    </Box>
  );

  return isMobile ? mobileView : desktopView;
};

export default CompanyCardHeader;
