import { Box, Stack } from "@mui/material";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";

const DemoDisplayMessage = () => (
  <Box>
    <HeadingTitle title="DisplayMessage Component" />
    <Stack spacing={2}>
      <DisplayMessage type="success" title="Success" description="This is a success message." />
      <DisplayMessage type="info" title="Info" description="This is an info message." />
      <DisplayMessage type="warning" title="Warning" description="This is a warning message." />
      <DisplayMessage type="error" title="Error" description="This is an error message." />
    </Stack>
  </Box>
);

export default DemoDisplayMessage;