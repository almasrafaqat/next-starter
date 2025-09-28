"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  LinearProgress,
  Skeleton,
  Paper,
  Grid,
  CircularProgress,
  keyframes,
  styled,
  Card,
  CardContent,
} from "@mui/material"
import Image from "next/image"
import Logo from "../Logo/Logo"

// Pulse animation keyframes
const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`

// Shimmer animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

// Styled components for animations
const PulseBox = styled(Box)(({ theme }) => ({
  animation: `${pulse} 1.5s ease-in-out infinite`,
}))

const ShimmerBox = styled(Box)(({ theme }) => ({
  backgroundImage: `linear-gradient(90deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.action.hover} 50%, 
    ${theme.palette.background.paper} 100%)`,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 2s infinite`,
  borderRadius: theme.shape.borderRadius,
}))

// Dots loading animation
const dotsAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`

const LoadingDot = styled("span")(({ theme, delay }) => ({
  width: 12,
  height: 12,
  margin: "0 4px",
  borderRadius: "50%",
  display: "inline-block",
  backgroundColor: theme.palette.primary.main,
  animation: `${dotsAnimation} 1.4s infinite ease-in-out both`,
  animationDelay: `${delay}s`,
}))

// Logo pulse animation
const logoPulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`

const AnimatedLogo = styled(Box)(({ theme }) => ({
  animation: `${logoPulse} 2s infinite ease-in-out`,
}))

// Linear progress with percentage
export function LinearProgressWithLabel({ message = "Loading..." }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Slow down as it approaches 100%
        const increment = Math.max(1, 10 - Math.floor(prevProgress / 10))
        const newProgress = prevProgress + increment
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 800)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", textAlign: "center", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          mb: 1,
          "& .MuiLinearProgress-bar": {
            borderRadius: 4,
          },
        }}
      />
      <Typography variant="body2" color="text.secondary">
        {`${Math.round(progress)}%`}
      </Typography>
    </Box>
  )
}

// Skeleton loader for dashboard content
export function DashboardSkeleton() {
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Header skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width="30%" height={40} />
        <Skeleton variant="text" width="20%" height={24} />
      </Box>

      {/* Stats cards skeleton */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Paper sx={{ p: 3 }}>
              <Skeleton variant="text" width="60%" height={28} />
              <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chart skeleton */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Skeleton variant="text" width="20%" height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Paper>

      {/* Table skeleton */}
      <Paper sx={{ p: 3 }}>
        <Skeleton variant="text" width="25%" height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 1 }} />
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} variant="rectangular" width="100%" height={50} sx={{ mb: 1 }} />
        ))}
      </Paper>
    </Box>
  )
}

// Shimmer effect loader
export function ShimmerLoader({ message = "Loading content..." }) {
  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", textAlign: "center", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <ShimmerBox sx={{ width: "100%", height: 8, mb: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        {[1, 2, 3].map((i) => (
          <ShimmerBox key={i} sx={{ width: 12, height: 12, borderRadius: "50%" }} />
        ))}
      </Box>
    </Box>
  )
}

// Dots loader
export function DotsLoader({ message = "Loading", showMsg = true }) {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      {showMsg && <Typography variant="h6" gutterBottom>
        {message}
      </Typography>}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <LoadingDot delay={0} />
        <LoadingDot delay={0.2} />
        <LoadingDot delay={0.4} />
      </Box>
    </Box>
  )
}

export function LoaderDots() {
  return (

    <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
      <LoadingDot delay={0} />
      <LoadingDot delay={0.2} />
      <LoadingDot delay={0.4} />
    </Box>
  )
}

// Branded loader with logo
export function BrandedLoader({ message = "Loading HomeChef Admin" }) {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <AnimatedLogo sx={{ mb: 3 }}>
        <Logo variant="compact" size="large" />
      </AnimatedLogo>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
      <LinearProgress
        sx={{
          maxWidth: 200,
          mx: "auto",
          mt: 2,
          height: 6,
          borderRadius: 3,
          "& .MuiLinearProgress-bar": {
            borderRadius: 3,
          },
        }}
      />
    </Box>
  )
}

// Circular pulse loader
export function PulseLoader({ message = "Loading" }) {
  return (
    <Box sx={{ textAlign: "center", p: 3 }}>
      <PulseBox sx={{ mb: 3 }}>
        <CircularProgress size={60} thickness={4} />
      </PulseBox>
      <Typography variant="h6">{message}</Typography>
    </Box>
  )
}


export function LoadingCard() {
  return (
    <Card
      elevation={1}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <Skeleton variant="rectangular" height={140} />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="40%" />
        <Box sx={{ mt: 1 }}>
          <Skeleton variant="text" width="60%" />
        </Box>
      </CardContent>
    </Card>
  )
}
