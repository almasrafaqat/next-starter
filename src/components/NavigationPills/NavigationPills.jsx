import React, { useCallback, useEffect } from "react";
import {
  Box,
  ClickAwayListener,
  Divider,
  Slide,
  Typography,
} from "@mui/material";
import EasyScrollableContainer from "../Swiper/EasyScrollableContainer";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { PillsItems } from "./NavigationPillsItems";
import { usePills } from "@/hooks/usePills";

const NavigationPills = ({
  items,
  isScrollable = true,
  boxShadow = true,
  showLabel = false,
  sx = {},
}) => {
  const { selected, setSelected } = usePills();
  const { isSmallScreen } = useResponsiveDevice();

  const firstSelected = items.find((m) => m.selected === true);

  const handleFirstKey = useCallback(() => {
    if (firstSelected) {
      setSelected(firstSelected.key);
    }
  }, [firstSelected, setSelected]);

  useEffect(() => {
    handleFirstKey();
  }, []);

  const handleClose = () => void 0;

    const handleItemClick = (key) => {
    const item = items.find((m) => m.key === key);
    if (item?.action) {
      item.action(); // perform action
      setSelected(null); // optionally close slide if action only
    } else if (item?.component) {
      setSelected(key); // show content in slide
    }
  };


  const selectedItem = items.find((m) => m.key === selected);
  const Content = selectedItem?.component;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        {/* Pills row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "#f5f5f5",
            borderRadius: "50px",

            ...(boxShadow && { boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }),
            ...sx,
          }}
        >
          <PillsItems
            items={items}
            selected={selected}
            handleItemClick={handleItemClick}
          />
        </Box>

        {/* Slide-down content under pills */}
        {selectedItem && typeof Content === "function" && (
          <Slide
            direction="up"
            in
            mountOnEnter
            unmountOnExit
            timeout={{ enter: 300, exit: 200 }}
          >
            <Box
              sx={{
                mt: 1,
                p: { xs: 1, sm: 2 },
                borderRadius: 2,
                bgcolor: "background.paper",
                ...(boxShadow && { boxShadow: 2 }),
                ...(isScrollable && {
                  maxHeight: isSmallScreen ? "50vh" : "60vh",
                  overflow: "hidden",
                }),
              }}
            >
              {showLabel && (
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {selectedItem.label}
                </Typography>
              )}

              {isScrollable ? (
                <EasyScrollableContainer
                  style={{ maxHeight: isSmallScreen ? "40vh" : "50vh" }}
                >
                  <Content />
                </EasyScrollableContainer>
              ) : (
                <Content />
              )}
            </Box>
          </Slide>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default NavigationPills;
