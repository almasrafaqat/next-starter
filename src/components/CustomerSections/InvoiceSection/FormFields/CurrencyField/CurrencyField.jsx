import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField, Box, Paper, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { currencies } from "@/utils/currencyUtils"; // adjust path as needed

export default function CurrencyField({ control, setValue, errors }) {
  const [currencySearchTerm, setCurrencySearchTerm] = useState("");
  const [showCurrencyList, setShowCurrencyList] = useState(false);

  const filteredCurrencies = currencies.filter(
    (curr) =>
      curr.currency.toLowerCase().includes(currencySearchTerm.toLowerCase()) ||
      curr.symbol.toLowerCase().includes(currencySearchTerm.toLowerCase()) ||
      curr.locale.toLowerCase().includes(currencySearchTerm.toLowerCase())
  );

  const handleCurrencySearchChange = (event) => {
    setCurrencySearchTerm(event.target.value);
    setShowCurrencyList(true);
  };

  const handleCurrencySelect = (selectedCurrency) => {
    setValue("currency", selectedCurrency);
    setShowCurrencyList(false);
    setCurrencySearchTerm("");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Controller
        name="currency"
        control={control}
        defaultValue="USD"
        render={({ field }) => (
          <TextField
            {...field}
            label="Invoice Currency"
            placeholder="e.g USD"
            fullWidth
            value={currencySearchTerm || field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
              handleCurrencySearchChange(e);
            }}
            onClick={() => setShowCurrencyList(true)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            error={!!errors.currency}
            helperText={errors.currency?.message}
          />
        )}
      />
      {showCurrencyList && (
        <Paper
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            mt: 1,
            zIndex: 10,
          }}
        >
          {filteredCurrencies.map((curr) => (
            <Box
              key={curr.currency}
              onClick={() => handleCurrencySelect(curr.currency)}
              sx={{
                p: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {curr.currency} - {curr.symbol}
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
}