'use client';

import React from 'react';
import { Skeleton, Box, Card } from '@mui/material';

const DishCardPlaceholder = ({ count = 4 }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', px: 1 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          sx={{ width: 270, minWidth: 270, borderRadius: 2, p: 1 }}
        >
          <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1 }} />
          <Skeleton variant="text" height={30} width="80%" sx={{ mt: 1 }} />
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="text" height={20} width="50%" />
          <Skeleton
            variant="rectangular"
            height={36}
            width="100%"
            sx={{ borderRadius: 1, mt: 2 }}
          />
        </Card>
      ))}
    </Box>
  );
};

export default DishCardPlaceholder;
