import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollContainer, ScrollWrapper, ArrowButton } from "./ScrollableContent.styles";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ScrollableContent = ({ children, gap = 0 }) => {
  const { isRtl } = useResponsiveLayout();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollButtons = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [isRtl, checkScrollButtons]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollWrapper>
      {showLeftArrow && (
        <ArrowButton
          onClick={() => scroll("left")}
          className="left"
        >
          <KeyboardDoubleArrowLeftIcon color="primary" />
        </ArrowButton>
      )}

      <ScrollContainer
        ref={scrollRef}
        onScroll={checkScrollButtons}
        isRtl={isRtl}
        gap={gap}
      >
        {children}
      </ScrollContainer>

      {showRightArrow && (
        <ArrowButton
          onClick={() => scroll("right")}
          className="right"
        >
          <KeyboardDoubleArrowRightIcon color="primary" />
        </ArrowButton>
      )}
    </ScrollWrapper>
  );
};

export default ScrollableContent;

