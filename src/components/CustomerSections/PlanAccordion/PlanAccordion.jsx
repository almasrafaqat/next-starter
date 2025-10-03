import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlanMeta from "../PlanMeta/PlanMeta";

export default function PlanAccordion({ plan, expanded, handleChange }) {
  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: "50%", flexShrink: 0 }}>{plan.name}</Typography>
        <Typography sx={{ color: "text.secondary" }}>ID: {plan.id}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {plan.metas?.length ? (
          plan.metas.map((meta, idx) => <PlanMeta key={idx} meta={meta} />)
        ) : (
          <Typography variant="body2" color="text.secondary">
            No plan meta data.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}