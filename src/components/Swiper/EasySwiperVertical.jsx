import React from "react";
import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Box, styled } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
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
  // 👇 Force vertical slides to shrink to content height
  "& .swiper-slide": {
    height: "auto",
    flex: "0 0 auto",
  },
}));

const EasySwiperVertical = ({
  children,
  autoplay = false,
  loop = true,
  pagination = true,
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
        direction="vertical"
        slidesPerView="auto"
        autoHeight={true}
       
        dir={isRtl ? "rtl" : "ltr"}
        autoplay={
          autoplay ? { delay: 3000, disableOnInteraction: false } : false
        }
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        speed={speed}
        loop={loop}
        spaceBetween={spaceBetween}
        scrollbar={{ draggable: true }}
        modules={[ Navigation, Pagination, Autoplay]}
        style={style}
      >
        {children}
      </Swiper>
    </ThemedSwiperWrapper>
  );
};

export default EasySwiperVertical;
