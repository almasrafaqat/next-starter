"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Box, styled, useTheme } from "@mui/material"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout"

const ThemedSwiperWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  // Pagination bullets styling
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
  // Navigation arrows styling
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
  // Scrollbar styling (if used)
  "& .swiper-scrollbar": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .swiper-scrollbar-drag": {
    backgroundColor: theme.palette.primary.main,
  },
}))
const SwiperWrapper = ({
  children,
  slidesPerView = 1.2,
  spaceBetween = 10,
  autoplay = false,
  loop = false,
  pagination = false,
  navigation = false,
  breakpoints = {},
  speed = 500,
  enableBreakpoints = true,
}) => {

  const { isRtl } = useResponsiveLayout()

  const defaultBreakpoints = {
    0: {
      slidesPerView: 1.2,
    },
    480: {
      slidesPerView: 1.5,
    },
    640: {
      slidesPerView: 2,
    },
    960: {
      slidesPerView: 2.5,
    },
  }


  const swiperBreakpoints = enableBreakpoints
    ? {
      ...defaultBreakpoints,
      ...breakpoints, // Custom breakpoints override defaults
    }
    : undefined // No breakpoints when disabled

  return (
    <ThemedSwiperWrapper>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        dir={isRtl ? "rtl" : "ltr"}
        speed={speed}
        modules={[Pagination, Navigation, Autoplay]}
        style={{ paddingBottom: pagination ? 30 : 10 }}
        breakpoints={swiperBreakpoints}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </ThemedSwiperWrapper>
  )
}

export default SwiperWrapper

{
  /*<SwiperWrapper
   autoplay={true}
  pagination={true}
  navigation={true}
  loop={true}
  breakpoints={{
    320: { slidesPerView: 1.1 },
    768: { slidesPerView: 2.5 },
    1024: { slidesPerView: 3.5 },
  }}
/> */
}
