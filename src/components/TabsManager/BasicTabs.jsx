'use client'
import useTabs from '@/hooks/useTabs'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material"
import {
  Restaurant,
  ShoppingCart,
  Star,
} from "@mui/icons-material"
import React, { useEffect } from 'react'
import ReusableTabs from '../ui/ReusableTabs/ReusableTabs'

const BasicTabs = () => {
  const basicTabs = useTabs("basicTabs")
  useEffect(() => {
    basicTabs.presets.basic([
      {
        id: "overview",
        label: "Platform Overview",
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">
                HomeChef Platform Overview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center" }}>
                      <Restaurant color="primary" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Active Chefs</Typography>
                      <Typography variant="h4" color="primary">
                        1,247
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center" }}>
                      <ShoppingCart color="success.main" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Daily Orders</Typography>
                      <Typography variant="h4" color="success.main">
                        3,892
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center" }}>
                      <Star color="warning.main" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">Avg Rating</Typography>
                      <Typography variant="h4" color="warning.main">
                        4.8
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Alert severity="info" sx={{ mt: 2 }}>
                Welcome to HomeChef - connecting home cooks with food lovers across the community!
              </Alert>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "details",
        label: "Chef Details",
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Top Performing Chefs
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>SA</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Sarah Ahmed" secondary="Pakistani Cuisine • 4.9★ • 156 orders this week" />
                  <Chip label="Top Chef" color="primary" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "success.main" }}>MK</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Maria Khan"
                    secondary="Italian & Mediterranean • 4.8★ • 142 orders this week"
                  />
                  <Chip label="Rising Star" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "warning.main" }}>AH</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Ali Hassan" secondary="Traditional Desi • 4.7★ • 128 orders this week" />
                  <Chip label="Consistent" color="warning" size="small" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "settings",
        label: "Platform Settings",
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Platform Configuration
              </Typography>
              <Stack spacing={2}>
                <FormControlLabel control={<Switch defaultChecked />} label="Enable new chef registrations" />
                <FormControlLabel control={<Switch defaultChecked />} label="Allow same-day orders" />
                <FormControlLabel control={<Switch />} label="Maintenance mode" />
                <Divider />
                <Typography variant="h6">Order Settings</Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Auto-assign delivery partners" />
                <FormControlLabel control={<Switch defaultChecked />} label="Send order confirmations via SMS" />
              </Stack>
            </CardContent>
          </Card>
        ),
      },
    ])
  }, [])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Basic Tabs
      </Typography>
      <ReusableTabs id="basicTabs" />
    </>
  )
}

export default BasicTabs