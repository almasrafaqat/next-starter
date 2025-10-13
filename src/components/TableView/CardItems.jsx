"use client"
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Checkbox,
  Collapse,
  IconButton,
  Button,
  ButtonGroup,
  Chip,
  Tooltip,
  Typography,
  Stack,
  Divider,
  useTheme,
} from "@mui/material"
import { styled, alpha } from "@mui/material/styles"

// Icons (swap to your own as needed)
import MoreVertIcon from "@mui/icons-material/MoreVert"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined"

// Helpers
const get = (obj, path, fallback) => {
  try {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback
  } catch {
    return fallback
  }
}

const CardRoot = styled(Card)(({ theme }) => {
  const bg = get(theme, "palette.background.paper", "#fff")
  const hoverShadow = "0 10px 28px rgba(0,0,0,0.10)"
  const baseShadow = "0 4px 14px rgba(0,0,0,0.08)"

  return {
    position: "relative",
    overflow: "hidden",
    background: bg,
    borderRadius: 16,
    boxShadow: baseShadow,
    transition: "transform .18s ease, box-shadow .18s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: hoverShadow,
    },
  }
})

const Cover = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 156,
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
}))

const CoverOverlay = styled("div")(({ theme }) => {
  const gold = get(theme, "palette.gold.main", get(theme, "palette.primary.main", "#E6B800"))
  return {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(180deg, ${alpha(gold, 0.15)} 0%, rgba(0,0,0,0.35) 100%)`,
    pointerEvents: "none",
  }
})

const FloatingCheckbox = styled(Checkbox)(({ theme }) => ({
  position: "absolute",
  top: 12,
  left: 12,
  background: alpha(get(theme, "palette.background.paper", "#fff"), 0.7),
  borderRadius: 24,
  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
  "&:hover": { background: alpha("#fff", 0.9) },
}))

const Kebab = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  background: alpha(get(theme, "palette.background.paper", "#fff"), 0.65),
  backdropFilter: "saturate(120%) blur(8px)",
  "&:hover": { background: alpha("#fff", 0.9) },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: 0.2,
  color: get(theme, "palette.text.primary", "#1E293B"),
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
}))

const FieldRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 8,
  marginTop: 8,
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "minmax(120px, 180px) 1fr",
  },
}))

const FieldKey = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: get(theme, "palette.text.muted", get(theme, "palette.text.secondary", "#475569")),
  opacity: 0.95,
}))

const FieldValue = styled(Box)(({ theme }) => ({
  fontSize: 13,
  color: get(theme, "palette.text.secondary", "#475569"),
  wordBreak: "break-word",
}))

const SectionDivider = styled(Divider)(({ theme }) => ({
  marginTop: 12,
  marginBottom: 12,
  borderColor: get(theme, "palette.divider", "#E0E0E0"),
}))

const ActionBar = styled(CardActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1.5, 2),
  borderTop: `1px solid ${get(theme, "palette.divider", "#E0E0E0")}`,
  background: get(theme, "palette.background.alternate", get(theme, "palette.background.paper", "#fff")),
}))

const GradientPrimary = styled("span")(({ theme }) => {
  const g = get(
    theme,
    "palette.primary.gradientBg",
    `linear-gradient(135deg, ${get(theme, "palette.primary.light", "#FFD700")} 0%, ${get(theme, "palette.primary.dark", "#B38F00")} 100%)`,
  )
  return {
    background: g,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }
})
/**
 * CardItem: Render a single item card.
 * Props mirror your existing function's outer variables for easy drop-in.
 */
export function CardItem({
  row,
  idField = "id",
  columns = [],
  isExpanded = false,
  isSelected = false,
  selectable = true,
  showBulkActions = false,
  bulkActions = [],
  customRowActions = [],
  expandable = true,
  renderExpandedRow,
  onToggleExpand,
  onToggleSelect,
  onActionMenuOpen,
  actions = {},
}) {
  const theme = useTheme()

  const primaryField = columns.find((c) => c.primary) || columns[0] || {}
  const secondaryFields = columns.filter((c) => c.secondary && c.field !== primaryField.field)
  const expandedFields = columns.filter(
    (c) => !c.primary && !c.secondary && c.field !== primaryField.field && c.field !== "actions",
  )

  const gold = get(theme, "palette.gold.main", get(theme, "palette.primary.main", "#E6B800"))
  const secondary = get(theme, "palette.secondary.main", "#059669")
  const textMuted = get(theme, "palette.text.muted", get(theme, "palette.text.secondary", "#475569"))

  // Robust coercion helpers to safely render objects/arrays/booleans
  const toText = (v) => {
    if (v == null) return "-"
    if (typeof v === "string" || typeof v === "number") return String(v)
    if (typeof v === "boolean") return v ? "Yes" : "No"
    if (Array.isArray(v)) {
      // Prefer name/label/title when present
      return v
        .map((i) =>
          typeof i === "object" && i !== null
            ? i.label || i.name || i.title || i.email || i.id || JSON.stringify(i)
            : String(i),
        )
        .join(", ")
    }
    if (typeof v === "object") {
      return v.label || v.name || v.title || v.email || v.id || JSON.stringify(v)
    }
    return String(v)
  }

  const toNode = (v) => {
    // Pass through valid React elements
    if (v && typeof v === "object" && v.$$typeof) return v
    return toText(v)
  }

  const renderCell = (col, data) => {
    if (!col) return null
    if (typeof col.render === "function") {
      const raw = col.render(get(data, col.field), data)
      return toNode(raw)
    }
    if (typeof col.valueGetter === "function") {
      const raw = col.valueGetter(data)
      return toNode(raw)
    }
    const raw = col?.field ? get(data, col.field) : undefined
    return toNode(raw)
  }

  const actionDefs = [
    actions.onView && {
      key: "view",
      label: "View",
      icon: <VisibilityOutlinedIcon fontSize="small" />,
      color: "info",
      onClick: () => actions.onView(row),
    },
    actions.onEdit && {
      key: "edit",
      label: "Edit",
      icon: <EditOutlinedIcon fontSize="small" />,
      color: "primary",
      onClick: () => actions.onEdit(row),
    },
    actions.onDelete && {
      key: "delete",
      label: "Delete",
      icon: <DeleteOutlineIcon fontSize="small" />,
      color: "error",
      onClick: () => actions.onDelete(row),
    },
    // Example extra action
    ...customRowActions.map((a, i) => ({
      key: a.key || `custom-${i}`,
      label: a.label,
      icon: a.icon || <LaunchOutlinedIcon fontSize="small" />,
      color: a.color || "secondary",
      onClick: () => a.onClick(row),
    })),
  ].filter(Boolean)

  const rowId = get(row, idField)

  return (
    <CardRoot key={rowId}>
      {/* Selection */}
      {selectable && (
        <FloatingCheckbox checked={!!isSelected} onChange={() => onToggleSelect && onToggleSelect(rowId)} />
      )}

      {/* Cover */}
      {row?.thumbnail && (
        <Cover>
          <img src={row.thumbnail || "/placeholder.svg"} alt={toText(row?.name || row?.title || rowId)} />
          <CoverOverlay />
          {/* Optional status chip (customize as needed) */}
          {row?.status && (
            <Chip
              label={toText(row.status)}
              size="small"
              sx={{
                position: "absolute",
                left: 12,
                bottom: 12,
                fontWeight: 700,
                bgcolor: alpha(secondary, 0.15),
                color: secondary,
                border: `1px solid ${alpha(secondary, 0.35)}`,
                backdropFilter: "saturate(120%) blur(6px)",
              }}
            />
          )}
        </Cover>
      )}

      {/* Kebab */}
      <Kebab size="small" onClick={(e) => onActionMenuOpen && onActionMenuOpen(e, row)}>
        <MoreVertIcon fontSize="small" />
      </Kebab>

      <CardContent sx={{ pb: 1.25 }}>
        <Stack spacing={0.75}>
          <Title variant="h6">{renderCell(primaryField, row)}</Title>

          {/* Secondary fields: compact on mobile; 2-col on sm+ */}
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            {secondaryFields.map((col) => (
              <FieldRow key={col.field}>
                <FieldKey variant="caption">{col.headerName}</FieldKey>
                <FieldValue>{renderCell(col, row)}</FieldValue>
              </FieldRow>
            ))}
          </Stack>

          {expandable && (
            <>
              <SectionDivider />
              <Collapse in={!!isExpanded} timeout="auto" unmountOnExit>
                <Stack spacing={1}>
                  {renderExpandedRow
                    ? renderExpandedRow(row)
                    : expandedFields.map((col) => (
                        <FieldRow key={col.field}>
                          <FieldKey variant="caption">{col.headerName}</FieldKey>
                          <FieldValue>{renderCell(col, row)}</FieldValue>
                        </FieldRow>
                      ))}
                </Stack>
              </Collapse>
            </>
          )}
        </Stack>
      </CardContent>

      <ActionBar>
        {/* Mobile-first actions: icons only; labels appear on md+ */}
        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{
            "& .MuiButton-root": {
              borderRadius: 999,
              px: { xs: 1, md: 1.5 },
              gap: 0.75,
              borderColor: alpha(textMuted, 0.25),
            },
            "& .MuiButton-root:hover": {
              borderColor: alpha(gold, 0.5),
              background: alpha(gold, 0.08),
            },
          }}
        >
          {actionDefs.map((a) => (
            <Tooltip key={a.key} title={a.label}>
              <Button color={a.color} onClick={a.onClick}>
                {a.icon}
                <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
                  {a.label}
                </Box>
              </Button>
            </Tooltip>
          ))}
        </ButtonGroup>

        {expandable && (
          <Button
            size="small"
            onClick={() => onToggleExpand && onToggleExpand(rowId)}
            endIcon={isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              color: gold,
              "&:hover": { background: alpha(gold, 0.08) },
            }}
          >
            <GradientPrimary>{isExpanded ? "Less" : "More"}</GradientPrimary>
          </Button>
        )}
      </ActionBar>
    </CardRoot>
  )
}
