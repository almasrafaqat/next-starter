import { Box } from "@mui/material";
import NavigationPills from "@/components/NavigationPills/NavigationPills";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import {
  AccountCircle,
  Add,
  GradeSharp,
  PlaylistAddCheck,
} from "@mui/icons-material";
import { useDialog } from "@/hooks/useDialog";

const DemoPills = () => {
  const {
    alert,
    confirm,
    prompt,
    loading: showLoading,
    componentLayout,
  } = useDialog();

  const itemsPills = [
    {
      key: "alert",
      label: "Show Alert",
      icon: <AccountCircle />,
      action: () =>
        alert({
          title: "Alert Example",
          message: "This is an alert dialog.",
        }),
      component: () => <Box>Alert dialog example</Box>,
    },
    {
      key: "confirm",
      label: "Show Confirm",
      icon: <GradeSharp />,
      action: () =>
        confirm({
          title: "Confirm Example",
          message: "Are you sure you want to proceed?",
          onConfirm: () =>
            alert({
              title: "Confirmed!",
              message: "You confirmed the action.",
            }),
        }),
      component: () => <Box>Confirm dialog example</Box>,
    },
    {
      key: "prompt",
      label: "Show Prompt",
      icon: <Add />,
      action: () =>
        prompt({
          title: "Prompt Example",
          message: "Please enter your name:",
          onConfirm: (value) =>
            alert({ title: "Prompt Result", message: `You entered: ${value}` }),
        }),
      component: () => <Box>Prompt dialog example</Box>,
    },
    {
      key: "loading",
      label: "Show Loading",
      icon: <PlaylistAddCheck />,
      action: () => {
        showLoading({ title: "Loading...", message: "Please wait..." });
        setTimeout(
          () => alert({ title: "Done", message: "Loading finished!" }),
          1500
        );
      },
      component: () => <Box>Loading dialog example</Box>,
    },
    {
      key: "component",
      label: "Show Custom",
      icon: <GradeSharp />,
      // action: () =>
      //   componentLayout({
      //     title: "Custom Component",
      //     component: <Box sx={{ p: 2 }}>This is a custom dialog layout!</Box>,
      //   }),
      component: () => <Box>Custom component dialog example</Box>,
    },
    {
      key: "overview",
      label: "Overview",
      badge: 2,
      selected: true,
      component: () => <Box>Overview Content</Box>,
    },
    {
      key: "profile",
      label: "Profile",
      badge: 1,
      selected: false,
      component: () => <Box>Profile Content</Box>,
    },
    {
      key: "settings",
      label: "Settings",
      badge: 0,
      selected: false,
      component: () => <Box>Settings Content</Box>,
    },
  ];

  return (
    <Box>
      <HeadingTitle title="NavigationPills Component" />
      <DisplayMessage
        type="info"
        title="NavigationPills"
        description="Horizontal pill navigation for switching between sections or views. Supports badges and custom content."
      />
      <NavigationPills items={itemsPills} isScrollable={false} />
    </Box>
  );
};

export default DemoPills;
