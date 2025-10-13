import React, { useState } from "react";
import {
  TextField,
  Box,
  IconButton,
  Typography,
  Divider,
  InputAdornment,
  Tooltip,
  Paper,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Autocomplete } from "@mui/material";
import { useSearchCustomers } from "@/hooks/customer/useInvoice";
import CustomerFields from "./CustomerFields";
import CustomerDisplay from "../../CustomerDisplay/CustomerDisplay";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ReusableAccordion from "@/components/ui/ReusableAccordion/ReusableAccordion";

const CustomerSelection = ({
  control = {},
  setValue,
  errors,
  companyId,
  userId,
  fields = {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [addCustomer, setAddCustomer] = useState(false);
  const [options, setOptions] = useState([]); // For storing customer options

  const { data: customers, isLoading } = useSearchCustomers(
    searchTerm,
    companyId,
    userId
  );

  const handleSelectCustomer = (customer) => {
    console.log(customer, "selected customer");
    setSelectedCustomer(customer);
    setValue("customers.0.id", customer.id);
    setValue("customers.0.name", customer.name);
    setValue("customers.0.email", customer.email);
    setValue("customers.0.company", customer.company);
    setValue("customers.0.phone", customer.phone);
    setValue("customers.0.address", customer.address);
    // Set other fields as necessary
    setValue("customers.0.credit_balance", customer.credit_balance);
    setValue("customers.0.cc", customer.cc);
    setValue("customers.0.bcc", customer.bcc);
    setSearchTerm(""); // Clear search term
  };

  const handleClearSelection = () => {
    setSelectedCustomer(null);
    setValue("customers.0.name", "");
    setValue("customers.0.email", "");
    setValue("customers.0.company", "");
    setValue("customers.0.phone", "");
    setValue("customers.0.address", "");
    setValue("customers.0.id", "");
    setValue("customers.0.credit_balance", "");
    setValue("customers.0.cc", "");
    setValue("customers.0.bcc", "");
  };

  const hasCustomerData =
    fields?.name ||
    fields?.email ||
    fields?.company ||
    fields?.phone ||
    fields?.address;
  //   const hasCustomerData = false;
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Autocomplete
          sx={{ flexGrow: 1 }}
          freeSolo
          options={options}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            if (newValue) {
              handleSelectCustomer(newValue);
            }
          }}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
            setOptions(customers || []);
            // Fetch customers based on the input value
            // You can replace this with your actual fetch logic
            // Example: setOptions(fetchCustomers(newInputValue));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Customer"
              size="small"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "4px",
                },
              }}
            />
          )}
        />
        <Box sx={{ ml: 1, width: "50px" }}>
          <Tooltip title="Add Customer" arrow>
            <IconButton
              size="large"
              color="primary"
              onClick={() => setAddCustomer(!addCustomer)}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              {addCustomer ? (
                <FaMinus fontSize="large" />
              ) : (
                <FaPlus fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box>
        {!selectedCustomer  && (
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 2,
                borderRadius: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography
                sx={{ fontStyle: "italic" }}
                variant="body2"
                color="textSecondary"
              >
                You can search for a customer
                or add a new one.
              </Typography>
              <Tooltip title="Add Customer" arrow>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => setAddCustomer(!addCustomer)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  {addCustomer ? (
                    <FaMinus fontSize="small" />
                  ) : (
                    <FaPlus fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Paper>
          )}
      </Box>

      {hasCustomerData && (
        <Box>
          <CustomerDisplay
            customer={fields}
            handleClearSelection={handleClearSelection}
            setAddCustomer={setAddCustomer}
            addCustomer={addCustomer}
          />
        </Box>
      )}

      {addCustomer && (
        <ReusableAccordion title="Add or Edit Customer">
          <Box>
            <CustomerFields
              control={control}
              errors={errors}
              setAddCustomer={setAddCustomer}
              setValue={setValue}
            />
          </Box>
        </ReusableAccordion>
      )}
    </Box>
  );
};

export default CustomerSelection;
