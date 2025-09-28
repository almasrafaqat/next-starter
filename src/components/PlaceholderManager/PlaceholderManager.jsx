import { Box } from "@mui/material"
import OrderCardPlaceholder from "../Placeholders/OrderCardPlaceholder"

const PlaceholderManager = ({
  count = 3,
  spacing = 2,
  component = OrderCardPlaceholder,
  columns = { xs: 1, sm: 1, md: 3, lg: 3, xl: 3 },
  containerProps = {},
  gridItemProps = {},
  ...placeholderProps
}) => {
  // Create array of specified length
  const placeholderArray = Array.from({ length: count }, (_, index) => index)

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto", // Center the container
        display: "grid",
        gridTemplateColumns: {
          xs: `repeat(${columns.xs || 1}, 1fr)`,
          sm: `repeat(${columns.sm || 1}, 1fr)`,
          md: `repeat(${columns.md || 3}, 1fr)`,
          lg: `repeat(${columns.lg || 4}, 1fr)`,
          xl: `repeat(${columns.xl || 4}, 1fr)`,
        },
        gap: {
          xs: 2, // 16px on mobile
          sm: 2, // 16px on small screens
          md: 3, // 24px on medium screens
          lg: 3, // 24px on large screens
        },
        padding: {
          xs: 2, // Add padding on mobile
          sm: 2,
          md: 3,
          lg: 3,
        },
        ...containerProps.sx,
      }}
      {...containerProps}
    >
      {placeholderArray.map((index) => {
        const PlaceholderComponent = component
        return (
          <Box
            key={`placeholder-${index}`}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            {...gridItemProps}
          >
            <PlaceholderComponent {...placeholderProps} />
          </Box>
        )
      })}
    </Box>
  )
}


export default PlaceholderManager
