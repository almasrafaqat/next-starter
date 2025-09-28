import { Box } from "@mui/material";
import ReusableTabs from "@/components/ui/ReusableTabs/ReusableTabs";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";

const DemoTabs = () => (
  <Box>
    <HeadingTitle title="ReusableTabs Component" />
    <DisplayMessage
      type="info"
      title="ReusableTabs"
      description="Advanced tab system with presets, dynamic tabs, navigation, and wizard flows. Use for dashboards, forms, and more."
    />
    <ReusableTabs id="demoTabs" allowCloseTabs showNavigation />
  </Box>
);

export default DemoTabs;