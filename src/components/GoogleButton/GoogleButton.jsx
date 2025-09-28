import PrimaryButton from "../ui/Button/PrimaryButton";
import { Google } from "@mui/icons-material";

const GoogleButton = ({ handleSignIn }) => {
  return (
    <PrimaryButton
      startIcon={<Google />}
      sx={{
        mt: 2,
        py: 1.5,
        borderRadius: 2,
        color: "info.contrastText",
        backgroundColor: "error.main",
        "&:hover": {
          backgroundColor: "error.dark",
        },
      }}
      onClick={handleSignIn}
    >
      Sign in with Google
    </PrimaryButton>
  );
};

export default GoogleButton;
