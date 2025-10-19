import React, { useState } from "react";
import {
  Box,
  CardContent,
  Divider,
} from "@mui/material";
import CompanyCardHeader from "./CompanyCardHeader";
import { icons } from "@/config/routeIcons";
import CustomTypography from "@/components/Typography/CustomTypography";
import {  IOSSwitch } from "@/components/ui/switch/CustomSwitch";
import SmtpCard from "../SmtpCard/SmtpCard";
import { StyledCard,InfoRow, StyledTooltip, ToggleRow } from "./CompanyCard.styles";



const CompanyCard = ({ company, actions, onToggleActive, onToggleDefault }) => {
  const handleActiveToggle = (event) => {
    if (onToggleActive) {
      onToggleActive(company, event.target.checked);
    }
  };

  const handleDefaultToggle = (event) => {
    if (onToggleDefault) {
      onToggleDefault(company, event.target.checked);
    }
  };

  return (
    <StyledCard sx={{marginBottom: 2}}>
      <CardContent sx={{ pb: 2 }}>
        {/* Header */}
        <CompanyCardHeader company={company} actions={actions} />

        {/* Company Info Sections */}
        <Box sx={{ mt: 2 }}>
          {/* Address */}
          <InfoRow>
            <StyledTooltip
              title="This address will be used on invoices"
              arrow
              placement="top"
            >
              <icons.INFO
                sx={{
                  fontSize: 18,
                  color: "info.main",
                  cursor: "help",
                  mt: 0.2,
                  flexShrink: 0,
                }}
              />
            </StyledTooltip>
            <CustomTypography variant="body2" color="text.secondary">
              {company.address || "No address provided"}
            </CustomTypography>
          </InfoRow>

          {/* Website */}
          <InfoRow>
            <StyledTooltip
              title="This website will be used on invoices"
              arrow
              placement="top"
            >
              <icons.INFO
                sx={{
                  fontSize: 18,
                  color: "info.main",
                  cursor: "help",
                  mt: 0.2,
                  flexShrink: 0,
                }}
              />
            </StyledTooltip>
            <CustomTypography variant="body2" color="text.secondary">
              {company.website || "No website provided"}
            </CustomTypography>
          </InfoRow>

          {/* Registration Number */}
          <InfoRow>
            <StyledTooltip
              title="This registration number will be used on invoices"
              arrow
              placement="top"
            >
              <icons.INFO
                sx={{
                  fontSize: 18,
                  color: "info.main",
                  cursor: "help",
                  mt: 0.2,
                  flexShrink: 0,
                }}
              />
            </StyledTooltip>
            <CustomTypography variant="body2" color="text.secondary">
              {company.registration_number || "No registration number provided"}
            </CustomTypography>
          </InfoRow>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Toggle Switches */}
        <Box>
          {/* Company Active */}
          <ToggleRow>
            <Box display="flex" alignItems="center" gap={1}>
              <StyledTooltip
                title="Activated company can generate invoices and use other features"
                arrow
                placement="top"
              >
                <icons.INFO
                  sx={{
                    fontSize: 18,
                    color: "info.main",
                    cursor: "help",
                  }}
                />
              </StyledTooltip>
              <CustomTypography variant="body2" sx={{ fontWeight: 500 }}>
                Company Active
              </CustomTypography>
            </Box>
            <IOSSwitch
              checked={company.is_active}
              onChange={handleActiveToggle}
            />
          </ToggleRow>

          {/* Company Default */}
          <ToggleRow>
            <Box display="flex" alignItems="center" gap={1}>
              <StyledTooltip
                title="The default company will be used for creating invoices, sending and more..."
                arrow
                placement="top"
              >
                <icons.INFO
                  sx={{
                    fontSize: 18,
                    color: "warning.main",
                    cursor: "help",
                  }}
                />
              </StyledTooltip>
              <CustomTypography variant="body2" sx={{ fontWeight: 500 }}>
                Company Default
              </CustomTypography>
            </Box>
            <IOSSwitch
              checked={company.is_default}
              onChange={handleDefaultToggle}
              disabled={company.is_default}
            />
          </ToggleRow>
        </Box>

        {/* SMTP Settings Section */}

        <Divider sx={{ my: 2 }} />
        <SmtpCard company={company} />
      </CardContent>
    </StyledCard>
  );
};

export default CompanyCard;
