import { Box, Skeleton } from "@mui/material"
import { styled } from "@mui/material/styles"

const SkeletonContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 280,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}))

const MenuItemSkeleton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
}))

const SidebarPlaceholder = () => {
  // Menu items to generate skeletons for
  const menuItems = [
    { width: "60%" }, // Orders
    { width: "65%" }, // Reviews
    { width: "55%" }, // Profile
    { width: "75%" }, // Coupons & offers
    { width: "70%" }, // Credit balance
    { width: "80%" }, // Followed providers
    { width: "70%" }, // Browsing history
    { width: "65%" }, // Addresses
    { width: "75%" }, // Account security
    { width: "70%" }, // Permissions
    { width: "70%" }, // Notifications
    { width: "75%" }, // Switch accounts
  ]

  return (
    <SkeletonContainer>
      {/* Header item with different styling */}
      <MenuItemSkeleton
        sx={{
          backgroundColor: "error.light",
          mb: 1,
        }}
      >
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="text" width="60%" height={24} />
      </MenuItemSkeleton>

      {/* Regular menu items */}
      {menuItems.map((item, index) => (
        <MenuItemSkeleton key={index}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={item.width} height={24} />
        </MenuItemSkeleton>
      ))}

      {/* Divider */}
      <Skeleton variant="rectangular" height={1} sx={{ my: 1 }} />

      {/* Sign out item */}
      <MenuItemSkeleton>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="text" width="50%" height={24} />
      </MenuItemSkeleton>
    </SkeletonContainer>
  )
}

export default SidebarPlaceholder

