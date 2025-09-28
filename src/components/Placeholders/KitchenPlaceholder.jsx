'use client';

import { Box, Skeleton } from '@mui/material';

const KitchenPlaceholder = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: 'background.paper',
        mb: 2,
      }}
    >
      {/* Kitchen Info Skeleton */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ ml: 2, flex: 1 }}>
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="50%" height={15} />
        </Box>
        <Skeleton variant="rounded" width={50} height={20} />
      </Box>

      {/* Kitchen Meta (location, live badge) */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Skeleton variant="rounded" width={120} height={20} />
      </Box>

      {/* Dish Name */}
      <Skeleton variant="text" width="60%" height={25} />

      {/* Serving Time and Available/Sold badges */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <Skeleton variant="rounded" width={100} height={20} />
        <Skeleton variant="rounded" width={80} height={20} />
        <Skeleton variant="rounded" width={60} height={20} />
      </Box>

      {/* Variants List */}
      <Box sx={{ mt: 2 }}>
        {[1, 2].map((_, i) => (
          <Box
            key={i}
            
          >
            
            <Skeleton variant="text" width="100%" height={25} />
          </Box>
        ))}
      </Box>

      {/* View All Dishes Button */}
      <Skeleton variant="rounded" width="100%" height={36} sx={{ mt: 2 }} />
    </Box>
  );
};

export default KitchenPlaceholder;
