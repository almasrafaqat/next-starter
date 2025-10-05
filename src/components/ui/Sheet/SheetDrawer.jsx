import { SwipeableDrawer, Box, styled } from "@mui/material";

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: "#808080",
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#808080",
  }),
}));

const SheetDrawer = ({
  open,
  onClose,
  onOpen,
  anchor = "bottom", // "bottom" or "top"
  children,
  showPuller = true,
  minHeight = 200,
  sx,
  zIndex = 2400, // default zIndex
  ...props
}) => (
  <SwipeableDrawer
    anchor={anchor}
    open={open}
    onClose={onClose}
    onOpen={onOpen}
    swipeAreaWidth={56}
    slotProps={{
      paper: {
        sx: { zIndex, ...sx },
      },
    }}
    {...props}
  >
    <Box
      sx={{
        position: "relative",
        px: 2,
        pt: 2,
        pb: 4,
        minHeight,
        ...sx,
      }}
    >
      {showPuller && <Puller />}
      {children}
    </Box>
  </SwipeableDrawer>
);

export default SheetDrawer;
