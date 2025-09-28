"use client";
import { Box, Typography } from "@mui/material";
import CustomTypography from "@/components/Typography/CustomTypography";

const CustomerProfile = () => {
  return (
    <Box>
      <CustomTypography variant="h5" gutterBottom>
        Customer Profile
      </CustomTypography>
      <Typography variant="body1">
        This is the customer profile section. Display customer details here.
      </Typography>
    </Box>
  );
};

export default CustomerProfile;
