import { styled } from "@mui/material/styles";
import { List, ListItem, listItemClasses } from "@mui/material";

export const NestedList = styled(List)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(0), // No extra indent for the line
}));

export const BranchListItem = styled(ListItem)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(2),
  //   color: theme.palette.text.secondary,
  //   background: "transparent",
  // background: theme.palette.primary.main,
  transition: "background 0.2s, color 0.2s",

  "&:hover": {
    // background: theme.palette.action.hover,
    // color: theme.palette.text.primary,
  },

  [`&.${listItemClasses.selected}`]: {
    color: theme.palette.primary.main,
    background: theme.palette.action.selected,
    fontWeight: 600,
  },
}));
