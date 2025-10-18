import { Box, Divider, Switch, Tooltip } from "@mui/material";
import React from "react";
import CompanyCardHeader from "./CompanyCardHeader";
import CompanyCardFooter from "./CompanyCardFooter";
import { icons } from "@/config/routeIcons";
import CustomTypography from "@/components/Typography/CustomTypography";
import { AndroidSwitch, IOSSwitch, MaterialUISwitch } from "@/components/ui/switch/CustomSwitch";

const CompanyCard = ({ company, actions }) => {
  const handleActiveToggle = (event) => {
    if (onToggleActive) {
      onToggleActive(company.id, event.target.checked);
    }
  };

  const handleDefaultToggle = (event) => {
    if (onToggleDefault) {
      onToggleDefault(company.id, event.target.checked);
    }
  };

  return (
    <Box>
      <CompanyCardHeader company={company} actions={actions} />
      <Box mt={1} mb={2} display="flex" alignItems="center" gap={1}>
        <Tooltip
          title="This address will be used on invoices"
          arrow
          placement="top"
          sx={{ cursor: "pointer" }}
        >
          <icons.INFO />
        </Tooltip>
        {company.address ? (
          <CustomTypography variant="body2" color="text.secondary">
            {company.address}
          </CustomTypography>
        ) : (
          <CustomTypography variant="body2" color="text.secondary">
            No address provided
          </CustomTypography>
        )}
      </Box>
      <Box mt={1} mb={2} display="flex" alignItems="center" gap={1}>
        <Tooltip
          title="This website will be used on invoices"
          arrow
          placement="top"
          sx={{ cursor: "pointer" }}
        >
          <icons.INFO />
        </Tooltip>
        {company.email ? (
          <CustomTypography variant="body2" color="text.secondary">
            {company.website}
          </CustomTypography>
        ) : (
          <CustomTypography variant="body2" color="text.secondary">
            No website provided
          </CustomTypography>
        )}
      </Box>
      <Box mt={1} mb={2} display="flex" alignItems="center" gap={1}>
        <Tooltip
          title="This registration number will be used on invoices"
          arrow
          placement="top"
          sx={{ cursor: "pointer" }}
        >
          <icons.INFO />
        </Tooltip>
        {company.email ? (
          <CustomTypography variant="body2" color="text.secondary">
            {company.registration_number}
          </CustomTypography>
        ) : (
          <CustomTypography variant="body2" color="text.secondary">
            No registration number provided
          </CustomTypography>
        )}
      </Box>

      <Box>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box mt={1} mb={2} display="flex" alignItems="center" gap={1}>
            <Tooltip
              title="Activated Company can generate invoices and others features"
              arrow
              placement="top"
              sx={{ cursor: "pointer" }}
            >
              <icons.INFO />
            </Tooltip>
            <CustomTypography>Company Active</CustomTypography>
          </Box>

          <Switch defaultChecked={company.is_active} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box mt={1} mb={2} display="flex" alignItems="center" gap={1}>
            <Tooltip
              title="The Default Company will be used for create invoice, sending and more..."
              arrow
              placement="top"
              sx={{ cursor: "pointer" }}
            >
              <icons.INFO />
            </Tooltip>
            <CustomTypography>Company Default</CustomTypography>
          </Box>

          <Switch defaultChecked={company.is_default} />
          <AndroidSwitch
            checked={company.is_default}
            onChange={handleDefaultToggle}
            disabled={company.is_default}
          />
        </Box>
      </Box>
      <CompanyCardFooter company={company} actions={actions} />
    </Box>
  );
};

export default CompanyCard;
