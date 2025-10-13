import { Box, Chip, Stack, Typography, Avatar, AvatarGroup, Tooltip, Divider } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"

const Row = styled(Stack)(({ theme }) => ({
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
  padding: theme.spacing(0.75, 0),
  "@media (min-width:600px)": { gap: theme.spacing(2) },
}))

const Label = styled(Typography)(({ theme }) => ({
  minWidth: 92,
  color: theme.palette.text.secondary,
  fontSize: 13,
}))

const Value = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  color: theme.palette.text.primary,
}))

// Status pill with semantic color mapping
export function StatusField({ label, status, color }) {
  // Map to theme tones when color isn't provided
  const paletteKey =
    color ||
    (status
      ? (["in progress", "active", "ongoing"].includes(String(status).toLowerCase()) && "success") ||
        (["blocked", "error", "failed"].includes(String(status).toLowerCase()) && "error") ||
        (["paused", "pending", "waiting"].includes(String(status).toLowerCase()) && "warning") ||
        "info"
      : "default")

  const chipColor = ["success", "error", "warning", "info", "primary", "secondary"].includes(paletteKey)
    ? paletteKey
    : "default"

  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <Chip size="small" color={chipColor} label={String(status || "")} sx={{ fontWeight: 600 }} />
      </Value>
    </Row>
  )
}

export function DateField({ label, value, format }) {
  const dateStr =
    value instanceof Date
      ? value.toLocaleDateString()
      : typeof value === "string"
        ? new Date(value).toLocaleDateString()
        : ""

  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {typeof format === "function" ? format(value) : dateStr}
        </Typography>
      </Value>
    </Row>
  )
}

export function AssigneesField({ label, people = [] }) {
  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <AvatarGroup max={6} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 12 } }}>
          {people.map((p, idx) => {
            const name = p?.name || p?.label || "User"
            const src = p?.avatar || p?.src
            const initials = name
              .split(" ")
              .map((s) => s[0])
              .join("")
              .slice(0, 2)
            return (
              <Tooltip title={name} key={p?.id || idx}>
                <Avatar alt={name} src={src}>
                  {initials}
                </Avatar>
              </Tooltip>
            )
          })}
        </AvatarGroup>
      </Value>
    </Row>
  )
}

export function LabelsField({ label, items = [] }) {
  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <Stack direction="row" flexWrap="wrap" gap={0.75}>
          {items.map((t, idx) => (
            <Chip key={t?.id || idx} label={t?.name || t?.label || String(t)} size="small" variant="outlined" />
          ))}
        </Stack>
      </Value>
    </Row>
  )
}

export function BooleanField({ label, value }) {
  const isTrue = !!value
  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <Chip
          size="small"
          label={isTrue ? "Yes" : "No"}
          color={isTrue ? "success" : "default"}
          variant={isTrue ? "filled" : "outlined"}
        />
      </Value>
    </Row>
  )
}

export function ImportanceField({ label, level = "normal" }) {
  const toTone = (lvl) => {
    const v = String(lvl || "").toLowerCase()
    if (["critical", "high"].includes(v)) return "error"
    if (["medium"].includes(v)) return "warning"
    if (["low", "normal"].includes(v)) return "info"
    return "default"
  }
  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <Chip size="small" color={toTone(level)} label={String(level)} />
      </Value>
    </Row>
  )
}

export function TextArrayField({ label, items = [] }) {
  return (
    <Row direction="row">
      <Label variant="body2">{label}</Label>
      <Value>
        <Stack gap={0.5}>
          {items.map((it, idx) => (
            <Typography key={idx} variant="body2">
              {String(it)}
            </Typography>
          ))}
        </Stack>
      </Value>
    </Row>
  )
}

export function LineItemsField({ label = "Items", items = [] }) {
  return (
    <Row direction="column" sx={{ gap: 1 }}>
      <Label variant="body2">{label}</Label>
      <Value>
        <Stack divider={<Divider flexItem />} sx={{ borderRadius: 1, overflow: "hidden" }}>
          {items.map((row, idx) => (
            <Stack
              key={row?.id || idx}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ py: 1 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {row?.name || "Item"}
              </Typography>
              <Stack direction="row" gap={2} alignItems="center">
                {row?.quantity != null && (
                  <Typography variant="body2" color="text.secondary">
                    × {row.quantity}
                  </Typography>
                )}
                {row?.price != null && (
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {String(row.price)}
                  </Typography>
                )}
                {row?.total != null && (
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {String(row.total)}
                  </Typography>
                )}
                {row?.discount && <Chip size="small" color="success" variant="outlined" label={`-${row.discount}`} />}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Value>
    </Row>
  )
}

export function MediaField({ label, thumbnail, gallery = [], videos = [] }) {
  return (
    <Row direction="column" sx={{ gap: 1.25 }}>
      {!!label && <Label variant="body2">{label}</Label>}
      <Value>
        <Stack gap={1.25}>
          {thumbnail && (
            <Box
              component="img"
              src={thumbnail}
              alt="thumbnail"
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 2,
                border: (t) => `1px solid ${alpha(t.palette.divider, 0.6)}`,
              }}
            />
          )}
          {gallery?.length > 0 && (
            <Stack direction="row" gap={1} sx={{ overflowX: "auto", pb: 0.5 }}>
              {gallery.map((src, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={src}
                  alt={`gallery-${idx}`}
                  sx={{
                    width: 112,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 1.5,
                    border: (t) => `1px solid ${alpha(t.palette.divider, 0.6)}`,
                    flex: "0 0 auto",
                  }}
                />
              ))}
            </Stack>
          )}
          {videos?.length > 0 && (
            <Stack gap={1}>
              {videos.map((src, idx) => (
                <Box
                  key={idx}
                  component="video"
                  controls
                  src={src}
                  sx={{
                    width: "100%",
                    borderRadius: 1.5,
                    border: (t) => `1px solid ${alpha(t.palette.divider, 0.6)}`,
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Value>
    </Row>
  )
}
