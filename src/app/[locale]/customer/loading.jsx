import AppLoader from "@/components/AppLoader/AppLoader";
import { LOADING_TYPES } from "@/components/AppLoader/types";
import { Box } from "@mui/material";

const loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
      }}
    >
      <AppLoader type={LOADING_TYPES.DOTS} message="Loading Dashboard" />
    </Box>
  );
};

export default loading;
