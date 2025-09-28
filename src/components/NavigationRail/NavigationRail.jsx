import React, { useEffect } from "react";
import { Slide, ClickAwayListener, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  StyledRailMenuContainer,
  StyledFloatingButton,
  StyledRail,
  StyledOverlay,
  StyledRailArrow,
} from "./NavigationRail.styles";
import { Close } from "@mui/icons-material";
import {
  MobileMenuItems,
  MobileSlide,
  PcMenuItems,
  PCSlide,
} from "./RailItems";
import { useResponsiveDevice } from "@/hooks/useResponsiveDevice";
import { MenuRailHandle } from "../NavigationBars/NavigationBars";
import { useRailNavigation } from "@/hooks/useRailNavigation";

const NavigationRail = ({ items, isScrollable = true }) => {
  const { selected, setSelected, expanded, setExpanded, open, setOpen } =
    useRailNavigation();

  useEffect(() => {
    setOpen(true);
  }, []);

  // Open/collapse rail on Fab click or hover
  const handleFabOpen = () => setOpen(true);
  const handleFabHover = () => setOpen(true);

  // Expand rail on hover
  const handleRailMouseEnter = () => setExpanded(true);
  const handleRailMouseLeave = () => {
    // setExpanded(false);
  };

  const handleClose = () => {
    setOpen(true);
    setExpanded(false);
    setSelected(null);
  };
  // const handleItemClick = (key) => setSelected(key);
  const handleItemClick = (key) => {
    const item = items.find((m) => m.key === key);
    if (item?.action) {
      item.action(); // perform action
      setSelected(null); // optionally close slide if action only
    } else if (item?.component) {
      setSelected(key); // show content in slide
    }
  };

  const { isSmallScreen } = useResponsiveDevice();

  return (
    <>
      {!isSmallScreen && (
        <StyledFloatingButton
          onClick={handleFabOpen}
          onMouseEnter={handleFabHover}
        >
          {/* <MenuRailHandle
            onOpen={handleFabOpen}
            title={open ? "Close menu" : "Open menu"}
            open={open}
            iconPlacement={open ? "left" : "right"}
          /> */}
        </StyledFloatingButton>
      )}
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <StyledOverlay>
          <ClickAwayListener onClickAway={() => void 0}>
            <StyledRailMenuContainer>
              {!isSmallScreen && (
                <StyledRailArrow
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  p={1}
                >
                  <IconButton onClick={handleClose}>
                    {expanded ? <Close /> : <ChevronLeftIcon />}
                  </IconButton>
                </StyledRailArrow>
              )}
              {isSmallScreen ? (
                <>
                  {/* Horizontal navigation at bottom */}
                  <MobileMenuItems
                    items={items}
                    selected={selected}
                    expanded={expanded}
                    handleItemClick={handleItemClick}
                  />

                  <MobileSlide
                    items={items}
                    selected={selected}
                    setSelected={setSelected}
                    isScrollable={isScrollable}
                  />
                </>
              ) : (
                <>
                  <StyledRail
                    expanded={expanded}
                    onMouseEnter={handleRailMouseEnter}
                    onMouseLeave={handleRailMouseLeave}
                  >
                    <PcMenuItems
                      items={items}
                      selected={selected}
                      expanded={expanded}
                      setSelected={setSelected}
                      handleItemClick={handleItemClick}
                    />
                  </StyledRail>
                  <PCSlide
                    items={items}
                    selected={selected}
                    setSelected={setSelected}
                    isScrollable={isScrollable}
                  />
                </>
              )}
            </StyledRailMenuContainer>
          </ClickAwayListener>
        </StyledOverlay>
      </Slide>
    </>
  );
};

export default NavigationRail;
