import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ReusableAccordion({
  title,
  children,
  defaultExpanded = false,
  sx = {},
  ...props
}) {
  return (
    <Accordion
      sx={{
        ...sx,
        marginTop: 2, // Add bottom margin to create space between accordions
        transition: "margin 0.3s ease", // Smooth transition for margin
      }}
      defaultExpanded={defaultExpanded}
      {...props}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
