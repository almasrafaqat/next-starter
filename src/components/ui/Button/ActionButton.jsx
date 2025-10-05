"use client"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

// Styled ActionButton for outlined red buttons (Cancel, Delete, etc.)
const ActionButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  textTransform: "none",
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  "&:hover": {
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    // backgroundColor: theme.palette.action.hover,
  },
}))

const ActionButton = ({ children, onClick, testId, ...props }) => {
  return (
    <ActionButtonStyled variant="outlined" onClick={onClick} data-testid={testId} {...props}>
      {children}
    </ActionButtonStyled>
  )
}

export default ActionButton
