import React from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Box, styled } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";

const ThemedSwiperWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .swiper-pagination-bullet": {
    backgroundColor: theme.palette.text.disabled,
    opacity: 0.5,
    width: "8px",
    height: "8px",
  },
  "& .swiper-pagination-bullet-active": {
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
    transform: "scale(1.2)",
  },
  "& .swiper-button-next, & .swiper-button-prev": {
    color: theme.palette.primary.main,
    "&:after": {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  "& .swiper-button-disabled": {
    color: theme.palette.text.disabled,
  },
  "& .swiper-scrollbar": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .swiper-scrollbar-drag": {
    backgroundColor: theme.palette.primary.main,
  },
  // 👇 Force slides to shrink to content instead of filling the row
  "& .swiper-slide": {
    width: "auto",
    flex: "0 0 auto",
  },
}));

const EasySwiperHorizontal = ({
  children,
  autoplay = false,
  loop = true,
  pagination = false,
  navigation = false,
  speed = 500,
  spaceBetween = 0,
  style = {},
  centerSlides = true,
}) => {
  const { isRtl } = useResponsiveLayout();

  return (
    <ThemedSwiperWrapper>
      <Swiper
        direction="horizontal"
        slidesPerView="auto"
        autoHeight={false}
        centeredSlides={centerSlides} 
        dir={isRtl ? "rtl" : "ltr"}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        speed={speed}
        loop={loop}
        spaceBetween={spaceBetween}
        modules={[Navigation, Pagination, Autoplay]}
        style={style}
      >
        {children}
      </Swiper>
    </ThemedSwiperWrapper>
  );
};

export default EasySwiperHorizontal;
