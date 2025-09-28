import React, { useState, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { DemoTableView } from "./DemoTableView";
import DemoPills from "./DemoPills";
import DemoTabs from "./DemoTabs";
import DemoTranslations from "./DemoTranslations";
import DemoBulkActions from "./DemoBulkActions";
import DemoDisplayMessage from "./DemoDisplayMessage";
import RailMenuDemo from "./RailMenuDemo";
import DemoSwiper from "./DemoSwiper";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import TabsManager from "@/components/TabsManager/TabsManager";

const DemoManager = () => (
  <Box sx={{ p: { xs: 1, md: 4 }, maxWidth: 1200, mx: "auto" }}>
    <HeadingTitle
      title="NextStarter UI/UX Component Showcase"
      variant="h4"
      align="center"
      sx={{ mb: 4 }}
    />
    <RailMenuDemo />
    <Stack spacing={5}>
      <DemoBulkActions />
      <DemoPills />
      <DemoTableView />
      <TabsManager />
      <DemoDisplayMessage />

      <DemoTabs />
      <DemoTranslations />

      <DemoSwiper />
    </Stack>
  </Box>
);

export default DemoManager;
