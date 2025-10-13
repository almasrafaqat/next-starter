import {
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ArrowDownward, Edit as EditIcon } from "@mui/icons-material";

function MobileView({
  customer,
  handleClearSelection,
  setAddCustomer,
  addCustomer,
  toggleEdit,
}) {
  const [showDetail, setShowDetail] = useState(true);

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" fontWeight={700}>
          Customer Info
        </Typography>
        <Box>
          <IconButton onClick={handleClearSelection}>
            <Tooltip title="Clear Selection">
              <ClearIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            size="small"
            aria-label="Edit customer"
            onClick={toggleEdit}
          >
            <EditIcon color="primary" fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            aria-label="Show customer details"
            onClick={() => setShowDetail((v) => !v)}
          >
            {showDetail ? (
              <InfoOutlinedIcon color="primary" fontSize="small" />
            ) : (
              <ArrowDownward
                color={showDetail ? "primary" : "action"}
                fontSize="small"
              />
            )}
          </IconButton>
        </Box>
      </Box>
      {showDetail && (
        <Box
          sx={{
            mt: 1,
            p: 1,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            bgcolor: "#f5f5f5",
          }}
        >
          <Stack direction="column" spacing={0.5}>
            {customer.name && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <PersonIcon fontSize="small" color="primary" />
                {customer.name}
              </Typography>
            )}
            {customer.email && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <EmailIcon fontSize="small" color="primary" />
                {customer.email}
              </Typography>
            )}
            {customer.company && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <BusinessIcon fontSize="small" color="action" />
                {customer.company}
              </Typography>
            )}
            {customer.address && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <LocationOnIcon fontSize="small" color="action" />
                {customer.address}
              </Typography>
            )}
            {customer.phone && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <WhatsAppIcon fontSize="small" color="success" />
                {customer.phone}
              </Typography>
            )}
            {customer.cc && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <AlternateEmailIcon fontSize="small" color="action" />
                CC: {customer.cc}
              </Typography>
            )}
            {customer.bcc && (
              <Typography
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <AlternateEmailIcon fontSize="small" color="disabled" />
                BCC: {customer.bcc}
              </Typography>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

function DesktopView({
  customer,
  handleClearSelection,
  setAddCustomer,
  addCustomer,
  toggleEdit,
}) {
  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Customer Info
        </Typography>
        <Box>
          <IconButton onClick={handleClearSelection}>
            <Tooltip title="Clear Selection">
              <ClearIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            size="small"
            aria-label="Edit customer"
            onClick={toggleEdit}
          >
            <Tooltip title="Edit Customer">
              <EditIcon />
            </Tooltip>
          </IconButton>
        </Box>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        {customer.name && (
          <Chip icon={<PersonIcon />} label={customer.name} color="primary" />
        )}
        {customer.email && (
          <Chip icon={<EmailIcon />} label={customer.email} color="primary" />
        )}
        {customer.company && (
          <Chip icon={<BusinessIcon />} label={customer.company} />
        )}
        {customer.address && (
          <Chip icon={<LocationOnIcon />} label={customer.address} />
        )}
        {customer.phone && (
          <Chip
            icon={<WhatsAppIcon />}
            label={customer.phone}
            color="success"
          />
        )}
        {customer.cc && (
          <Chip icon={<AlternateEmailIcon />} label={`CC: ${customer.cc}`} />
        )}
        {customer.bcc && (
          <Chip icon={<AlternateEmailIcon />} label={`BCC: ${customer.bcc}`} />
        )}
      </Stack>
    </Box>
  );
}

export default function CustomerDisplay({
  customer,
  handleClearSelection,
  setAddCustomer,
  addCustomer,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleEdit = () => {
    setAddCustomer((prev) => !prev);
    // Additional logic for handling edit mode can be added here
  };

  if (!customer) return null;

  if (isMobile) {
    return (
      <Box>
        <MobileView
          customer={customer}
          handleClearSelection={handleClearSelection}
          setAddCustomer={setAddCustomer}
          addCustomer={addCustomer}
          toggleEdit={toggleEdit}
        />
      </Box>
    );
  }

  return (
    <Box>
      <DesktopView
        customer={customer}
        handleClearSelection={handleClearSelection}
        setAddCustomer={setAddCustomer}
        addCustomer={addCustomer}
        toggleEdit={toggleEdit}
      />
    </Box>
  );
}
