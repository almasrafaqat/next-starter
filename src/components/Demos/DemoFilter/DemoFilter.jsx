import React, { useState, useMemo } from "react";
import Filters from "@/components/Filters/Filters";
import { demoCustomers } from "@/data/demoCustomers";
import { demoCustomerFilterConfigs } from "@/data/demoCustomerFilters";
import { Box, Paper, Typography } from "@mui/material";

const DemoFilters = () => {
  const [filters, setFilters] = useState({});

  // Filtering logic
  const filteredData = useMemo(() => {
    let result = demoCustomers;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(search) ||
          row.email.toLowerCase().includes(search)
      );
    }
    if (filters.status) {
      result = result.filter((row) => row.status === filters.status);
    }
    if (filters.favorite !== undefined && filters.favorite !== "") {
      result = result.filter((row) => String(row.favorite) === String(filters.favorite));
    }
    if (filters.city) {
      result = result.filter((row) => row.city === filters.city);
    }
    if (filters.createdAt) {
      // Assuming createdAt is a string in YYYY-MM-DD
      result = result.filter((row) => row.createdAt === filters.createdAt.format("YYYY-MM-DD"));
    }
    return result;
  }, [filters]);

  const handleReset = () => setFilters({});

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>Demo Manager with Filters</Typography>
      <Filters
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        filterConfigs={demoCustomerFilterConfigs}
      />
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="subtitle1" mb={1}>Filtered Results:</Typography>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </Paper>
    </Box>
  );
};

export default DemoFilters;