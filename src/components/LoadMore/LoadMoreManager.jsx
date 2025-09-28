import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import LoadMore from './LoadMore'

const LoadMoreManager = () => {
  const [loading, setLoading] = useState(false)
  const [loadCount, setLoadCount] = useState(0)

  const handleLoadMore = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setLoadCount((prev) => prev + 1)
    }, 2000)
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Primary LoadMore Button
        </Typography>
        <LoadMore onClick={handleLoadMore} loading={loading} variant="primary">
          Load More Dishes ({loadCount} loaded)
        </LoadMore>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Secondary LoadMore Button
        </Typography>
        <LoadMore
          onClick={handleLoadMore}
          loading={loading}
          variant="secondary"
          loadingText="Finding more recipes..."
        >
          Discover More Recipes
        </LoadMore>
      </Box>
      {/* Outlined LoadMore */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Outlined LoadMore Button
        </Typography>
        <LoadMore onClick={handleLoadMore} loading={loading} variant="outlined" fullWidth>
          Load More (Full Width)
        </LoadMore>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Disabled State
        </Typography>
        <LoadMore onClick={handleLoadMore} disabled={true} variant="primary">
          No More Items
        </LoadMore>
      </Box>

        <Box sx={{ backgroundColor: "background.paper", borderRadius: 2, p: 3, boxShadow: 1 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Breakpoints Explanation:
            </Typography>
            <Box component="ul" sx={{ pl: 2, "& li": { mb: 1 } }}>
              <li>
                <Typography variant="body2" color="text.secondary">
                  <strong>0px:</strong> Mobile phones - shows 1.2 slides
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  <strong>480px:</strong> Large phones - shows 1.5 slides
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  <strong>640px:</strong> Small tablets - shows 2 slides
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  <strong>960px:</strong> Desktop - shows 2.5 slides
                </Typography>
              </li>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Use{" "}
              <code style={{ backgroundColor: "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>
                enableBreakpoints=false
              </code>{" "}
              to disable responsive behavior and use a fixed layout across all screen sizes.
            </Typography>
          </Box>
    </Box>
  )
}

export default LoadMoreManager