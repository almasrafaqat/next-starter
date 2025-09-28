"use client"

import { Box } from "@mui/material"
import {
  LinearProgressWithLabel,
  DashboardSkeleton,
  ShimmerLoader,
  DotsLoader,
  BrandedLoader,
  PulseLoader,
} from "@/components/ui/LoadingComponents"
import { LOADING_TYPES } from "./types"



export default function AppLoader({ type = LOADING_TYPES.BRANDED, message, fullHeight = true, fullPage = false }) {
  // Select the appropriate loader based on type
  const renderLoader = () => {
    switch (type) {
      case LOADING_TYPES.LINEAR:
        return <LinearProgressWithLabel message={message} />
      case LOADING_TYPES.SKELETON:
        return <DashboardSkeleton />
      case LOADING_TYPES.SHIMMER:
        return <ShimmerLoader message={message} />
      case LOADING_TYPES.DOTS:
        return <DotsLoader message={message} />
      case LOADING_TYPES.BRANDED:
        return <BrandedLoader message={message} />
      case LOADING_TYPES.PULSE:
        return <PulseLoader message={message} />
      default:
        return <BrandedLoader message={message} />
    }
  }

  // For full page loading (covers entire viewport)
  if (fullPage) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
        }}
      >
        {renderLoader()}
      </Box>
    )
  }

  // For component loading
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: fullHeight ? "100vh" : "auto",
        width: "100%",
        py: fullHeight ? 0 : 4,
      }}
    >
      {renderLoader()}
    </Box>
  )
}
