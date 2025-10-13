"use client"

// Mobile-first, uses theme.js colors via MUI theme, and tabs for Comments/Details/Attachments.

import React from "react"
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Tooltip,
  Stack,
  Typography,
  Tabs,
  Tab,
  Chip,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import {
  StatusField,
  DateField,
  AssigneesField,
  LabelsField,
  BooleanField,
  ImportanceField,
  TextArrayField,
  LineItemsField,
  MediaField,
} from "./field-renderers"

const Shell = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.06)}`,
}))

const HeaderRow = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: 0,
  lineHeight: 1.25,
}))

const SubtleButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 999,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
}))

const ActionBar = styled(Stack)(({ theme }) => ({
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(0.5),
  "& .MuiIconButton-root": {
    border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
  },
}))

function TabPanel({ value, index, children }) {
  if (value !== index) return null
  return <Box sx={{ pt: 2 }}>{children}</Box>
}

// Helper: choose which fields to render from schema and record
function Metadata({ schema = [], record = {} }) {
  return (
    <Stack sx={{ mt: 1 }} gap={0.5}>
      {schema.map((f, idx) => {
        const type = f.type
        const label = f.label || f.field
        const val = f.get ? f.get(record) : f.field ? record?.[f.field] : undefined

        if (type === "status") return <StatusField key={idx} label={label} status={val} color={f.color} />
        if (type === "date" || type === "datetime")
          return <DateField key={idx} label={label} value={val} format={f.format} />
        if (type === "assignees") return <AssigneesField key={idx} label={label} people={val || []} />
        if (type === "labels" || type === "string-array")
          return <LabelsField key={idx} label={label} items={val || []} />
        if (type === "boolean") return <BooleanField key={idx} label={label} value={!!val} />
        if (type === "importance") return <ImportanceField key={idx} label={label} level={val} />
        if (type === "line-items") return <LineItemsField key={idx} label={label} items={val || []} />
        if (type === "media")
          return (
            <MediaField
              key={idx}
              label={label}
              thumbnail={val?.thumbnail}
              gallery={val?.gallery}
              videos={val?.videos}
            />
          )
        if (type === "text-array") return <TextArrayField key={idx} label={label} items={val || []} />
        // Fallback: simple value
        return (
          <Box key={idx} sx={{ py: 0.75 }}>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {typeof val === "object" ? JSON.stringify(val) : String(val ?? "")}
            </Typography>
          </Box>
        )
      })}
    </Stack>
  )
}

export default function CardDetailView({
  record = {},
  title,
  subtitle,
  status, // string like "Active"
  headerChipColor = "success",
  onPrimary,
  onOpen,
  actions = [], // [{ icon, label, onClick }]
  overflowActions = [], // [{ label, onClick }]
  schema = [], // typed sections
  tabs = {}, // { comments:[], details: ReactNode, attachments:[] }
  primaryLabel = "Mark Complete",
}) {
  const [tabIdx, setTabIdx] = React.useState(0)
  const [menuEl, setMenuEl] = React.useState(null)
  const openMenu = Boolean(menuEl)

  const hasComments = Array.isArray(tabs.comments) && tabs.comments.length > 0
  const hasDetails = !!tabs.details
  const hasAttachments = Array.isArray(tabs.attachments) && tabs.attachments.length > 0
  const showTabs = hasComments || hasDetails || hasAttachments

  const tabLabels = [hasComments && "Comments", hasDetails && "Details", hasAttachments && "Attachments"].filter(
    Boolean,
  )

  const renderComments = () => (
    <Stack gap={1.5}>
      {tabs.comments.map((c, idx) => (
        <Stack key={idx} gap={0.75}>
          <Stack direction="row" gap={1} alignItems="center">
            <Box
              component="img"
              alt={c.author?.name || "avatar"}
              src={c.author?.avatar}
              sx={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
            />
            <Stack sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {c.author?.name || "User"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {c.meta || ""}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="body2" sx={{ pl: 5 }}>
            {c.message}
          </Typography>
          {idx < tabs.comments.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  )

  return (
    <Shell>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <HeaderRow direction="row">
          <Stack gap={0.5} sx={{ minWidth: 0, flex: 1 }}>
            {subtitle && (
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 0.4 }}>
                {subtitle}
              </Typography>
            )}
            <Title variant="h6" className="text-pretty">
              {title || record?.title || record?.name}
            </Title>
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            {status && <Chip size="small" label={status} color={headerChipColor} sx={{ fontWeight: 700 }} />}
          </Stack>
        </HeaderRow>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          gap={{ xs: 1.5, sm: 2 }}
          sx={{ mt: 2, alignItems: { sm: "center" }, justifyContent: "space-between" }}
        >
          <SubtleButton variant="contained" color="primary" onClick={onPrimary} startIcon={<KeyboardArrowRightIcon />}>
            {primaryLabel}
          </SubtleButton>

          <ActionBar direction="row">
            {(actions || []).map((a, i) => (
              <Tooltip key={i} title={a.label}>
                <IconButton size="small" onClick={a.onClick}>
                  {a.icon || <ShareOutlinedIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            ))}
            <Tooltip title="Copy link">
              <IconButton size="small">
                <ContentCopyOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open">
              <IconButton size="small" onClick={onOpen}>
                <ArrowOutwardIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <IconButton size="small" onClick={(e) => setMenuEl(e.currentTarget)}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
            <Menu
              open={openMenu}
              anchorEl={menuEl}
              onClose={() => setMenuEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {(overflowActions || []).map((m, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    setMenuEl(null)
                    m.onClick?.()
                  }}
                >
                  {m.label}
                </MenuItem>
              ))}
            </Menu>
          </ActionBar>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Metadata schema={schema} record={record} />
        </Box>

        {showTabs && (
          <Box sx={{ mt: 2 }}>
            <Tabs value={tabIdx} onChange={(_, v) => setTabIdx(v)} variant="scrollable" allowScrollButtonsMobile>
              {tabLabels.map((t, i) => (
                <Tab key={t} label={t} value={i} />
              ))}
            </Tabs>

            {/* Comments */}
            {hasComments && (
              <TabPanel value={tabIdx} index={tabLabels.indexOf("Comments")}>
                {renderComments()}
              </TabPanel>
            )}
            {/* Details */}
            {hasDetails && (
              <TabPanel value={tabIdx} index={tabLabels.indexOf("Details")}>
                {tabs.details}
              </TabPanel>
            )}
            {/* Attachments */}
            {hasAttachments && (
              <TabPanel value={tabIdx} index={tabLabels.indexOf("Attachments")}>
                <Stack direction="row" gap={1} sx={{ overflowX: "auto", pb: 0.5 }}>
                  {tabs.attachments.map((src, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={src}
                      alt={`attachment-${idx}`}
                      sx={{
                        width: 140,
                        height: 100,
                        borderRadius: 1.5,
                        objectFit: "cover",
                        border: (t) => `1px solid ${alpha(t.palette.divider, 0.6)}`,
                        flex: "0 0 auto",
                      }}
                    />
                  ))}
                </Stack>
              </TabPanel>
            )}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ px: { xs: 2, sm: 3 }, py: 2, mt: -1 }}>
        <Stack direction="row" width="100%" justifyContent="flex-end">
          <Button variant="outlined" color="secondary" onClick={onOpen} endIcon={<ArrowOutwardIcon />}>
            Open
          </Button>
        </Stack>
      </CardActions>
    </Shell>
  )
}
