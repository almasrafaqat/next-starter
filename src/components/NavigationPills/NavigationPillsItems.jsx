import { Box, Chip, Typography } from "@mui/material";
import EasySwiperHorizontal from "../Swiper/EasySwiperHorizontal";
import { SwiperSlide } from "swiper/react";
import React from "react";
import { BorderBottom } from "@mui/icons-material";

export const PillsItems = ({ items, selected, handleItemClick }) => {
  return (
    <EasySwiperHorizontal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 0",
      }}
      centerSlides={false}
    >
      {items.map((item) => (
        <SwiperSlide
          key={item.key}
          style={{
            width: "auto", // let pills size adapt to content
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 4px",
          }}
        >
          <Chip
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, }}>
                {/* Optional icon */}
                {item.icon && (
                  <Box
                    component="span"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {React.cloneElement(item.icon, {
                      sx: {
                        fontSize: { xs: "1.1rem", sm: "1.35rem" }, // responsive size
                        verticalAlign: "middle",
                      },
                    })}
                  </Box>
                )}

                {/* Label text */}
                <Box
                  component="span"
                  sx={{
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    lineHeight: 1.4,
                  }}
                >
                  {item.label}
                </Box>

                {/* Optional badge */}
                {item.badge && (
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "12px",
                      px: 0.75,
                      fontSize: { xs: "0.65rem", sm: "0.75rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
              </Box>
            }
            clickable
            onClick={() => handleItemClick(item.key)}
            sx={{
              borderRadius: "50px",
              px: { xs: 1.5, sm: 2 }, // smaller padding on mobile
              fontSize: { xs: "0.75rem", sm: "0.875rem" }, // responsive font size
              bgcolor: selected === item.key ? "primary.main" : "transparent",
              color: selected === item.key ? "white" : "text.primary",
              whiteSpace: "nowrap", // prevent text wrapping
              "&:hover": {
                bgcolor:
                  selected === item.key ? "primary.dark" : "rgba(0,0,0,0.04)",
              },
              transition: "all 0.2s ease",
            }}
          />
        </SwiperSlide>
      ))}
    </EasySwiperHorizontal>
  );
};
