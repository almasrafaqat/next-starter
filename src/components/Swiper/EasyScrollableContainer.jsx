import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, styled } from "@mui/material";
import { FreeMode, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const ThemedSwiperWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  "& .swiper-scrollbar": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .swiper-scrollbar-drag": {
    backgroundColor: theme.palette.primary.main,
  },
  "& .swiper-slide": {
    width: "100%", // full width for content
    height: "auto",
  },
}));

const EasyScrollableContainer = ({
  children,
  direction = "vertical",
  freeMode = true,
  scrollbar = true,
  mousewheel = true,
  style = {},
}) => {
  const { isRtl } = useResponsiveLayout();

  return (
    <ThemedSwiperWrapper>
      <Swiper
        direction={direction}
        slidesPerView="auto"
        freeMode={freeMode}
        scrollbar={scrollbar}
        mousewheel={mousewheel}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[FreeMode, Scrollbar, Mousewheel]}
        style={style}
      >
        <SwiperSlide>{children}</SwiperSlide>
      </Swiper>
    </ThemedSwiperWrapper>
  );
};

export default EasyScrollableContainer;
