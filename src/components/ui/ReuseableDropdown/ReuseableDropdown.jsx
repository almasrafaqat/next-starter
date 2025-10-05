import { Button } from "@mui/material";
import React, { useState } from "react";
import { responsiveText } from "@/styles/globalStyles";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import {
  Box,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Divider,
  Stack,
} from "@mui/material";
import { useTranslations } from "next-intl";
import PrimaryButton from "../Button/PrimaryButton";
import CancelButton from "../Button/CancelButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ReuseableDropdown = ({
  title,
  children,
  startIcon = null,
  endIcon = null,
  width = 350,
}) => {
  const anchorRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  const { isRtl } = useResponsiveDevice();
  const trans = useTranslations("translations");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        startIcon={startIcon}
        endIcon={
          endIcon ? (
            endIcon
          ) : open ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )
        }
        sx={{
          ...responsiveText,
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          ...(isRtl && {
            "& .MuiButton-startIcon": {
              marginLeft: 1,
              marginRight: -0.5,
            },
            "& .MuiButton-endIcon": {
              marginRight: 1,
              marginLeft: -0.5,
            },
          }),
        }}
      >
        {title}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        
        sx={{ zIndex: 1300}}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              elevation={3}
              sx={{
                mt: 1,
                p: 2,
                width: width,
                ...(isRtl && {
                  direction: "rtl",
                }),
              }}
            >
              <ClickAwayListener onClickAway={() => {}}>
                <Stack spacing={2}>
                  {/* Language Section */}
                  {title}
                  <Divider />
                  {/* Currency Info */}
                  <Box
                    sx={{
                      gap: 1.5,
                      bgcolor: "info.lighter",
                      p: 1.5,
                      borderRadius: 1,
                      ...(isRtl && {
                        flexDirection: "row-reverse",
                      }),
                    }}
                  >
                    {children}
                  </Box>
                  {/* Action Buttons */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      ...(isRtl && {
                        flexDirection: "row-reverse",
                      }),
                    }}
                  >
                    <CancelButton
                      onClick={() => setOpen(false)}
                      sx={{
                        flex: 1,
                        ...(isRtl ? { ml: 1 } : { mr: 1 }),
                      }}
                    >
                      {trans("common.cancel")}
                    </CancelButton>
                    <PrimaryButton
                      onClick={() => {}}
                      sx={{
                        flex: 1,
                        ...(isRtl ? { mr: 1 } : { ml: 1 }),
                      }}
                    >
                      {trans("common.save")}
                    </PrimaryButton>
                  </Box>
                </Stack>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ReuseableDropdown;
