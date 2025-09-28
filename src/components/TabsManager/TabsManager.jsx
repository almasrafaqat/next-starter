"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Switch,
  FormControlLabel,
} from "@mui/material"
import {
  Add as AddIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Analytics as AnalyticsIcon,
  Assessment as ReportsIcon,
  Group as UsersIcon,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Warning,
  Info,
  Restaurant,
  ShoppingCart,
  Star,
} from "@mui/icons-material"
import ReusableTabs from "@/components/ui/ReusableTabs/ReusableTabs"
import { useTabs } from "@/hooks/useTabs"

const TabsManager = () => {
  const basicTabs = useTabs("basicTabs")
  const dashboardTabs = useTabs("dashboardTabs")
  const wizardTabs = useTabs("wizardTabs")
  const navigationTabs = useTabs("navigationTabs")
  const dynamicTabs = useTabs("dynamicTabs")

  const [newTabLabel, setNewTabLabel] = useState("")
  const [tabCounter, setTabCounter] = useState(1)
  const [selectedPreset, setSelectedPreset] = useState("basic")

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

  const initializeDashboardTabs = () => {
    dashboardTabs.presets.dashboard([
      {
        id: "analytics",
        label: "Analytics",
        badge: "12",
        icon: <AnalyticsIcon />,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Platform Analytics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TrendingUp color="success" />
                        <Typography variant="h6">Revenue Growth</Typography>
                      </Stack>
                      <Typography variant="h4" color="success.main">
                        +23.5%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Compared to last month
                      </Typography>
                      <LinearProgress variant="determinate" value={75} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <TrendingDown color="error" />
                        <Typography variant="h6">Cancellation Rate</Typography>
                      </Stack>
                      <Typography variant="h4" color="error.main">
                        -2.1%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Improvement from last month
                      </Typography>
                      <LinearProgress variant="determinate" value={25} color="error" sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Chip label="12 New Reports Available" color="primary" sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        ),
      },
      {
        id: "reports",
        label: "Reports",
        chip: "New",
        icon: <ReportsIcon />,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Financial Reports
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Report Type</TableCell>
                      <TableCell>Period</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Weekly Summary</TableCell>
                      <TableCell>Dec 11-17, 2024</TableCell>
                      <TableCell>
                        <Chip label="Ready" color="success" size="small" />
                      </TableCell>
                      <TableCell>PKR 2,45,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Monthly Report</TableCell>
                      <TableCell>November 2024</TableCell>
                      <TableCell>
                        <Chip label="Processing" color="warning" size="small" />
                      </TableCell>
                      <TableCell>PKR 9,87,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Chef Payouts</TableCell>
                      <TableCell>Dec 1-15, 2024</TableCell>
                      <TableCell>
                        <Chip label="Pending" color="error" size="small" />
                      </TableCell>
                      <TableCell>PKR 7,23,400</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "users",
        label: "Users",
        badge: "5",
        icon: <UsersIcon />,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                User Management
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Alert severity="warning" icon={<Warning />}>
                    5 chef applications pending approval
                  </Alert>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Alert severity="info" icon={<Info />}>
                    23 new customer registrations today
                  </Alert>
                </Grid>
              </Grid>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Recent User Activity
              </Typography>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "success.main" }}>+</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="New Chef Registration"
                    secondary="Fatima Ali - Karachi • Applied 2 hours ago"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>★</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Customer Review" secondary="Ahmed Khan rated Sarah's Biryani 5 stars" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ),
      },
    ])
  }

  const initializeWizardTabs = () => {
    wizardTabs.presets.wizard([
      {
        id: "step1",
        label: "Chef Registration",
        completed: true,
        content: (
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <CheckCircle color="success" />
                <Typography variant="h5">Chef Registration Complete</Typography>
              </Stack>
              <Alert severity="success">Basic information and documents have been verified successfully.</Alert>
              <Typography variant="body1" sx={{ mt: 2 }}>
                ✓ Personal Information
                <br />✓ Identity Verification
                <br />✓ Kitchen Photos
                <br />✓ Food Safety Certificate
              </Typography>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "step2",
        label: "Menu Setup",
        active: true,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Step 2: Create Your Menu
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Add your signature dishes and set pricing.
              </Typography>
              <LinearProgress variant="determinate" value={60} sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Progress: 3 of 5 dishes added
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Chicken Biryani" secondary="PKR 450 • Added" />
                  <CheckCircle color="success" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Beef Karahi" secondary="PKR 650 • Added" />
                  <CheckCircle color="success" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Vegetable Pulao" secondary="PKR 350 • Added" />
                  <CheckCircle color="success" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "step3",
        label: "Payment Setup",
        disabled: true,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom color="text.disabled">
                Step 3: Payment Information
              </Typography>
              <Alert severity="info">Complete your menu setup to proceed with payment configuration.</Alert>
              <Typography variant="body2" color="text.disabled" sx={{ mt: 2 }}>
                • Bank account details
                <br />• Tax information
                <br />• Payout preferences
              </Typography>
            </CardContent>
          </Card>
        ),
      },
    ])
  }

  const initializeNavigationTabs = () => {
    navigationTabs.presets.navigation([
      {
        id: "home",
        label: "Dashboard",
        icon: <HomeIcon />,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Chef Dashboard
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">Today's Orders</Typography>
                      <Typography variant="h3" color="primary">
                        12
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        +3 from yesterday
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">Weekly Earnings</Typography>
                      <Typography variant="h3" color="success.main">
                        PKR 15,400
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This week
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h6">Rating</Typography>
                      <Typography variant="h3" color="warning.main">
                        4.8
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Based on 156 reviews
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "profile",
        label: "Profile",
        icon: <PersonIcon />,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Chef Profile
              </Typography>
              <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>SA</Avatar>
                <Box>
                  <Typography variant="h6">Sarah Ahmed</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specializes in Pakistani & Continental Cuisine
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip label="Verified Chef" color="success" size="small" />
                    <Chip label="Premium" color="primary" size="small" />
                  </Stack>
                </Box>
              </Stack>
              <Typography variant="h6" gutterBottom>
                Specialties
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip label="Biryani" variant="outlined" />
                <Chip label="Karahi" variant="outlined" />
                <Chip label="BBQ" variant="outlined" />
                <Chip label="Desserts" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        ),
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon />,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Chef Settings
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Availability
                  </Typography>
                  <FormControlLabel control={<Switch defaultChecked />} label="Accept new orders" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Weekend availability" />
                </Box>
                <Divider />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Notifications
                  </Typography>
                  <FormControlLabel control={<Switch defaultChecked />} label="Order notifications" />
                  <FormControlLabel control={<Switch />} label="Marketing emails" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ),
      },
    ])
  }

  const initializeDynamicTabs = () => {
    dynamicTabs.initialize([
      {
        id: "tab1",
        label: "Order #1247",
        closable: true,
        content: (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Details #1247
              </Typography>
              <Typography variant="body2">
                Customer: Ahmed Khan
                <br />
                Items: 2x Chicken Biryani, 1x Raita
                <br />
                Total: PKR 950
                <br />
                Status: In Progress
              </Typography>
              <Button variant="contained" size="small" sx={{ mt: 2 }}>
                Mark as Ready
              </Button>
            </CardContent>
          </Card>
        ),
      },
    ])
  }

  const addDynamicTab = () => {
    if (!newTabLabel.trim()) return

    const newId = `dynamic-${tabCounter}`
    dynamicTabs.addNewTab({
      id: newId,
      label: newTabLabel,
      closable: true,
      content: (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {newTabLabel}
            </Typography>
            <Typography variant="body2">
              This is a dynamically added tab. You can close it using the X button.
            </Typography>
          </CardContent>
        </Card>
      ),
    })

    setNewTabLabel("")
    setTabCounter((prev) => prev + 1)
  }

  const simulateLoading = (tabsInstance, tabId) => {
    tabsInstance.setLoading(true)
    setTimeout(() => {
      tabsInstance.setLoading(false)
    }, 2000)
  }

  const initializePreset = (preset) => {
    switch (preset) {
      case "dashboard":
        initializeDashboardTabs()
        break
      case "wizard":
        initializeWizardTabs()
        break
      case "navigation":
        initializeNavigationTabs()
        break
      case "dynamic":
        initializeDynamicTabs()
        break
      default:
        break
    }
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        HomeChef Advanced Tabs System Demo
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Explore different tab configurations and see how they work in real scenarios
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Tabs
              </Typography>
              <ReusableTabs id="basicTabs" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Preset Configurations
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Preset Type</InputLabel>
                  <Select
                    value={selectedPreset}
                    label="Preset Type"
                    onChange={(e) => setSelectedPreset(e.target.value)}
                  >
                    <MenuItem value="basic">Basic</MenuItem>
                    <MenuItem value="dashboard">Dashboard</MenuItem>
                    <MenuItem value="wizard">Wizard</MenuItem>
                    <MenuItem value="navigation">Navigation</MenuItem>
                    <MenuItem value="dynamic">Dynamic</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" onClick={() => initializePreset(selectedPreset)}>
                  Initialize {selectedPreset} Tabs
                </Button>
              </Stack>

              {selectedPreset === "dashboard" && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Dashboard Tabs (with badges & chips)
                  </Typography>
                  <ReusableTabs id="dashboardTabs" variant="scrollable" />
                </Box>
              )}

              {selectedPreset === "wizard" && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Wizard Tabs (stepper style)
                  </Typography>
                  <ReusableTabs id="wizardTabs" />
                </Box>
              )}

              {selectedPreset === "navigation" && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Navigation Tabs (with icons)
                  </Typography>
                  <ReusableTabs id="navigationTabs" />
                </Box>
              )}

              {selectedPreset === "dynamic" && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Dynamic Tabs (closable)
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <TextField
                      size="small"
                      label="New Tab Label"
                      value={newTabLabel}
                      onChange={(e) => setNewTabLabel(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addDynamicTab()}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addDynamicTab}
                      disabled={!newTabLabel.trim()}
                    >
                      Add Tab
                    </Button>
                  </Stack>
                  <ReusableTabs id="dynamicTabs" allowCloseTabs={true} />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Advanced Controls
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button variant="outlined" onClick={() => simulateLoading(basicTabs, "overview")}>
                  Simulate Loading (Overview)
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => basicTabs.setActiveTab(basicTabs.getTabIndexById("settings"))}
                >
                  Switch to Settings
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    const detailsIndex = basicTabs.getTabIndexById("details")
                    if (detailsIndex !== -1) {
                      basicTabs.updateTabByIndex(detailsIndex, {
                        label: "Details (Updated)",
                      })
                    }
                  }}
                >
                  Update Details Tab
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    const analyticsIndex = dashboardTabs.getTabIndexById("analytics")
                    if (analyticsIndex !== -1) {
                      dashboardTabs.updateTabByIndex(analyticsIndex, {
                        badge: String(Math.floor(Math.random() * 20) + 1),
                      })
                    }
                  }}
                >
                  Update Analytics Badge
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tab Variants & Orientations
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Scrollable Variant
                  </Typography>
                  <ReusableTabs id="basicTabs" variant="scrollable" />
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Full Width Variant
                  </Typography>
                  <ReusableTabs id="basicTabs" variant="fullWidth" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TabsManager
