import { Box } from "@mui/material";
import SwiperWrapper from "@/components/Swiper/SwiperWrapper";
import HeadingTitle from "@/components/HeadingTitle/HeadingTitle";
import DisplayMessage from "@/components/DisplayMessage/DisplayMessage";

const slides = [
  { title: "Slide 1", description: "This is the first slide." },
  { title: "Slide 2", description: "This is the second slide." },
  { title: "Slide 3", description: "This is the third slide." },
];

const DemoSwiper = () => (
  <Box>
    <HeadingTitle title="SwiperWrapper Component" />
    <DisplayMessage
      type="info"
      title="SwiperWrapper"
      description="Responsive carousel/swiper for showcasing images, cards, or any content. Supports autoplay, navigation, and pagination."
    />
    <SwiperWrapper autoplay pagination navigation loop>
      {slides.map((slide, idx) => (
        <Box key={idx} sx={{ p: 3, minHeight: 120, bgcolor: "#f5f5f5", borderRadius: 2 }}>
          <strong>{slide.title}</strong>
          <div>{slide.description}</div>
        </Box>
      ))}
    </SwiperWrapper>
  </Box>
);

export default DemoSwiper;