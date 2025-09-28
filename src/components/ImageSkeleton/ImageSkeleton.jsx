import { useState } from "react";
import Image from "next/image";
import { Box, Skeleton } from "@mui/material";

const DEFAULT_PLACEHOLDER = "/imgs/image-placeholder.png";

const ImageSkeleton = ({
  src,
  alt = "Image",
  width,
  height,
  className,
  sizes,
  priority,
  fallbackSrc = DEFAULT_PLACEHOLDER,
  layout,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use fallbackSrc if src is empty or undefined
  const imageSrc = src && src.trim() !== "" ? src : fallbackSrc;

  const imageProps = {
    src: imageSrc,
    alt,
    width,
    height,
    priority,
    sizes,
    onLoad: () => setIsLoading(false),
    onError: () => setHasError(true),
  };

  // Remove undefined or null values to avoid Next.js warnings
  Object.keys(imageProps).forEach(
    (key) => imageProps[key] === undefined && delete imageProps[key]
  );

  return (
    <Box
      position="relative"
      width={typeof width === "number" ? `${width}px` : width}
      height={typeof height === "number" ? `${height}px` : height}
    >
      {isLoading && !hasError && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: className?.includes("rounded-full")
              ? "50%"
              : className?.includes("rounded")
              ? "8px"
              : undefined,
          }}
        />
      )}
      {!hasError ? (
        <Image
          {...imageProps}
          className={className}
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s",
            borderRadius: className?.includes("rounded-full")
              ? "50%"
              : className?.includes("rounded")
              ? "8px"
              : undefined,
            objectFit: className?.includes("object-cover")
              ? "cover"
              : "contain",
          }}
        />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={width}
          height={height}
          bgcolor="grey.300"
          borderRadius="12px"
        >
          <Image
            src={fallbackSrc || "/placeholder.svg"}
            alt="Fallback image"
            width={width}
            height={height}
            style={{ objectFit: "cover" }}
            priority={priority}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageSkeleton;
