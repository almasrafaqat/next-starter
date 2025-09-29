import DashboardTemplate from "@/components/DashboardTemplate/DashboardTemplate";
import CustomTypography from "@/components/Typography/CustomTypography";
import React from "react";

const CustomerPage = () => {
  return (
    <DashboardTemplate group="CUSTOMER">
      <CustomTypography variant="h4" gutterBottom>
        Customer Dashboard
      </CustomTypography>
      <CustomTypography variant="body1">
        Welcome to the customer dashboard! Here you can manage your profile,
        view orders, and access other customer-related features.
      </CustomTypography>
    </DashboardTemplate>
  );
};

export default CustomerPage;
