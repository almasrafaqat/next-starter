import { Box, Skeleton, Stack, Divider, styled, Card } from "@mui/material"
import ReusableCard from "../ReusableCard/ReuseableCard"

const RestaurantItemCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  border: "1px solid #f0f0f0",
}))

const OrderCardPlaceholder = () => {
  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, bgcolor: "background.paper" }} >
      {/* Order Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Skeleton variant="text" width={100} height={24} />
          <Skeleton variant="text" width={60} height={20} />
        </Box>
        <Skeleton variant="rectangular" width={80} height={28} sx={{ borderRadius: 14 }} />
      </Box>

      {/* Items from kitchens header */}
      <Skeleton variant="text" width={160} height={20} sx={{ mb: 2 }} />

      {/* Restaurant Items */}
      <Stack spacing={2} mb={3}>
        {/* First Restaurant */}
        <RestaurantItemCard>
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box flex={1}>

              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Skeleton variant="text" width={30} height={16} />
                  <Skeleton variant="text" width={50} height={16} />
                </Box>
                <Skeleton variant="text" width={50} height={16} />
              </Box>
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Box>
        </RestaurantItemCard>

        {/* Second Restaurant */}
        <RestaurantItemCard>
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Skeleton variant="text" width={30} height={16} />
                  <Skeleton variant="text" width={50} height={16} />
                </Box>
                <Skeleton variant="text" width={40} height={16} />
              </Box>
              <Skeleton variant="text" width={120} height={16} />
            </Box>
          </Box>
        </RestaurantItemCard>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Price Breakdown */}
      <Stack spacing={1.5} mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={30} height={20} />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={50} height={20} />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width={40} height={24} />
          <Skeleton variant="text" width={60} height={24} />
        </Box>
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" spacing={1.5}>
        <Skeleton variant="rectangular" height={40} sx={{ flex: 1, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={40} sx={{ flex: 1, borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={80} height={40} sx={{ borderRadius: 1 }} />
      </Stack>
    </Box>
  )
}

export default OrderCardPlaceholder
